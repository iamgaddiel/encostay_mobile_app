import { IonButton, IonContent, IonIcon, IonImg, IonInput, IonLabel, IonLoading, IonPage, IonProgressBar, IonSelect, IonSelectOption, IonToast, useIonLoading } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle'
import SpaceBetween from '../../components/style/SpaceBetween'

//images
import CardImg from "../../assets/images/woman_card.svg"
import { useQuery } from '@tanstack/react-query'
import { useRecoilValue } from 'recoil'
import { WalletItem, WalletList } from '../../@types/wallet'
import { userAtom } from '../../atoms/appAtom'
import { createApiCollection, listApiCollection, updatePatchApiCollectionItem } from '../../helpers/apiHelpers'
import { APP_CONFIG, BANKS_COLLECTION, TRANSACTIONS_COLLECTION, WALLETS_COLLECTION } from '../../helpers/keys'
import { useHistory } from 'react-router'
import { TransactionCreateFields } from '../../@types/transactions'
import { Toast } from '../../@types/toast'
import { authenticate } from '../../helpers/authSDK'
import { BankItem, BankList } from '../../@types/bank'
import { warning } from 'ionicons/icons'
import { v4 as uuid4 } from 'uuid'
import { getSaveData } from '../../helpers/storageSDKs'
import { AppConfig } from '../../@types/appConfig'
import Settings from '../../helpers/settings'
import { _post } from '../../helpers/api'




const { serverBaseUrl } = Settings()

const Withdraw = () => {
    const history = useHistory()

    const { token: authToken, record: user } = useRecoilValue(userAtom)

    const [amount, setAmount] = useState(0)

    const [password, setPassword] = useState('')

    const [bankId, setBankId] = useState('')

    const [walletBalance, setWalletBalance] = useState(0)

    const [isLoading, setIsLoading] = useState(false)

    const [showToast, setShowToast] = useState<Toast>({
        enabled: false,
        message: "",
        type: 'warning'
    });

    const [showLoading, setShowLoading] = useState({
        enabled: false,
        message: ''
    })


    const { data: wallet, isLoading: isLoadingWalletBalance } = useQuery({
        queryKey: ['getHostWallet'],
        queryFn: getHostWallet
    })

    const { data: bankAccountsFound } = useQuery({
        queryKey: ['getHostBankDetails'],
        queryFn: getUserBankDetails
    })

    const [presentLoading, dismissLoading] = useIonLoading()






    useEffect(() => {
        if (!isLoadingWalletBalance) {
            setWalletBalance(wallet?.balance!)
        }
    }, [wallet?.balance!])






    async function getHostWallet(): Promise<WalletItem> {
        try {
            const params = {
                filter: `host='${user.id}'`
            }

            const { data } = await listApiCollection(WALLETS_COLLECTION, authToken, params) as { data: WalletList }

            const hostWallet = data?.items[0]

            return hostWallet
        }
        catch (error: any) {
            throw new Error(error)
        }
    }


    async function decreaseWalletBalance(amount: number) {
        const data = { balance: amount }
        updatePatchApiCollectionItem(WALLETS_COLLECTION, wallet?.id!, data, authToken)
        setWalletBalance(amount)
    }


    async function createWithdrawTransaction(reference: string): Promise<void> {
        const transactionData: TransactionCreateFields = {
            amount,
            is_out: true,
            host: user.id,
            reference
        }

        const { isCreated } = await createApiCollection(TRANSACTIONS_COLLECTION, transactionData, authToken)

        if (!isCreated) {
            setShowToast({
                enabled: true,
                message: 'Error: Unable create transactions',
                type: 'danger'
            })
            return
        }
    }


    async function verifyUserPassword(): Promise<boolean> {
        const { is_authenticated } = await authenticate(user?.email, password)
        if (!is_authenticated) return false;
        return true
    }


    async function getUserBankDetails(): Promise<BankItem[]> {
        const params = { filter: `user='${user.id}'` }
        const { data } = await listApiCollection(BANKS_COLLECTION, authToken, params) as { data: BankList }
        console.log("🚀 ~ getUserBankDetails ~ data:", data, '<------')
        return data?.items!
    }


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        setIsLoading(true)

        if (amount < 2000) {
            setIsLoading(false)
            setShowToast({
                enabled: true,
                message: 'Minimum amount to withdraw is 2000',
                type: 'warning'
            })
            return
        }

        if (amount > wallet?.balance!) {
            setIsLoading(false)
            setShowToast({
                enabled: true,
                message: 'Insufficient funds',
                type: 'warning'
            })
            return
        }

        // Verify user
        const passwordIsVerified = await verifyUserPassword()

        if (!passwordIsVerified) {
            setIsLoading(false)
            setShowToast({
                enabled: true,
                message: 'Incorrect password',
                type: 'danger'
            })
            return
        }

        //  if false: direct user to add bank account screen
        if (bankAccountsFound?.length! < 1) {
            setIsLoading(false)
            setShowToast({
                enabled: true,
                message: "You have not added any bank account. Go to Profile > Bank Account > Add a bank account",
                type: 'warning'
            })
            return
        }



        // Get Bank Details
        const userBankAccount = bankAccountsFound![0]
        const { service_charge } = await getSaveData(APP_CONFIG) as AppConfig

        // Calculate withdrawal money including service charge
        const withdrawWithChargesAmount = amount + (amount * service_charge) // withdraw amount + service charge
        const newBalance = wallet!.balance - withdrawWithChargesAmount
        const uniqueReferenceString = uuid4()

        try {
            // filling bank names
            let account_bank = userBankAccount?.bank_id
            if (account_bank.length < 2) account_bank = `00${account_bank}`;
            if (account_bank.length < 3) account_bank = `0${account_bank}`;

            const nairaPaymentPayload = {
                account_number: userBankAccount?.account_number,
                account_bank,
                amount,
                currency: user?.preferred_currency,
                reference: String(uniqueReferenceString),
                narration: 'Wallet withdrawal',
                debit_currency: user?.preferred_currency,
            };


            const usdPaymentPayload = {
                amount,
                narration: 'Wallet withdrawal',
                currency: "USD",
                beneficiary_name: user?.name,
                meta: {
                    account_number: userBankAccount?.account_number,
                    routing_number: userBankAccount?.routing_number,
                    swift_code: userBankAccount?.swift_code,
                    bank_name: userBankAccount?.bank_name,
                    beneficiary_name: user?.name,
                    beneficiary_address: userBankAccount?.address,
                    beneficiary_country: "US"
                }
            }

            const paymentPayload = user?.preferred_currency === 'USD' ? usdPaymentPayload : nairaPaymentPayload

            const url = `${serverBaseUrl}/flw/bank_payment`
            const header = { 'Content-Type': 'application/json' }

            const { data } = await _post(url, paymentPayload, header)

            console.log(data, '<---- Payment Data')

            // decreaseWalletBalance(newBalance)
            // createWithdrawTransaction(uniqueReferenceString)
        }

        catch (e) {
            setIsLoading(false)
            console.log(e, '<----')
        }




        // TODO: send money to users account using strip or flutter wave depending on preference




        // Reset State Values
        setBankId('')
        setPassword('')
        setAmount(0)

        setIsLoading(false)
        // history.push('/withdraw_receiving')
    }


    return (
        <IonPage>
            <HeaderTitle title='Withdraw' />
            <IonContent className='ion-padding' fullscreen>
                {/* =========================== Loading Start ======================== */}
                {isLoading && <IonProgressBar type='indeterminate' color={warning} />}
                {/* =========================== Loading ends ======================== */}

                {/* =========================== Toast Start ======================== */}
                <IonToast
                    isOpen={showToast.enabled}
                    color={showToast.type}
                    message={showToast.message}
                    duration={4000}
                    position="top"
                    onDidDismiss={() =>
                        setShowToast({
                            enabled: false,
                            message: ""
                        })
                    }
                />
                {/* =========================== Toast Ends ======================== */}
                <section className="my-3 rounded-3 p-3 shadow-sm">
                    <SpaceBetween>
                        <div>
                            <small>Available Balance</small>
                            <p className="fs-3">₦{walletBalance.toFixed(2)}</p>
                        </div>
                        <IonImg src={CardImg} />
                    </SpaceBetween>
                </section>

                <form action="" onSubmit={handleSubmit}>
                    <section className="mt-5">
                        <IonInput
                            type="text"
                            inputMode='numeric'
                            placeholder='Enter amount to withdraw'
                            label='Amount'
                            labelPlacement='floating'
                            className='rounded-5 px-4'
                            style={{ background: "var(--primary-3)" }}
                            required
                            // onIonChange={(e) => setAmount(() => parseInt(e.detail.value as string))}
                            onKeyUp={(e) => setAmount(parseInt(e.currentTarget.value as string))}
                        />
                        {/* 
                        {
                            bankAccountsFound?.length! >= 1 ? (
                                <IonSelect
                                    className='mt-4 py-2 rounded-5 px-4'
                                    style={{ background: "var(--primary-3)" }}
                                    color={warning}
                                    placeholder='Select account'
                                    onIonChange={(e) => setBankId(e.detail.value)}
                                    mode='ios'
                                >
                                    {
                                        bankAccountsFound!.map(account => (
                                            <IonSelectOption value={account.id} color='warning'>{account.bank_name}</IonSelectOption>
                                        ))
                                    }
                                </IonSelect>
                            ) : null
                        } */}
                        <IonInput
                            type="password"
                            placeholder='Enter password'
                            label='Password'
                            labelPlacement='floating'
                            className='rounded-5 px-4 mt-4'
                            style={{ background: "var(--primary-3)" }}
                            required
                            // onIonChange={(e) => setPassword(e.detail.value as string)}
                            onKeyUp={(e) => setPassword(e.currentTarget.value as string)}
                        />

                        <div className="mt-5 ion-text-center">
                            <IonButton
                                className='yellow_fill w-75'
                                shape='round'
                                mode="ios"
                                type='submit'
                                disabled={isLoading}
                            >
                                Confirm Withdraw
                            </IonButton>
                        </div>
                    </section>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default Withdraw