import { IonButton, IonContent, IonIcon, IonPage, IonSearchbar, IonSkeletonText, IonText } from '@ionic/react'
import { useState } from 'react'
import BackHeaderWithAvater from '../../components/BackHeaderWithAvater/BackHeaderWithAvater'


// images
import Man from "../../assets/images/man.png"
import { chevronDown, filter } from 'ionicons/icons'
import EarningModal from '../../components/EarningMoal/EarningModal'
import WithdrawModal from '../../components/WithdrawModal/WithdrawModal'
import { useQuery } from '@tanstack/react-query'
import { listApiCollection } from '../../helpers/apiHelpers'
import { TRANSACTIONS_COLLECTION } from '../../helpers/keys'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../../atoms/appAtom'
import { EarningModalType, TransactionList, WithdrawModalType } from '../../@types/transactions'
import NotFound from '../../components/NotFound/NotFound'
import TransactionCard from '../../components/TransactionCard/TransactionCard'
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle'







const Transactions = () => {
    //TODO: Create monthly sorting

    const { token, record: user } = useRecoilValue(userAtom)

    const { data: transactions, isLoading, isError, error } = useQuery({
        queryKey: ['hostTransactions'],
        queryFn: getHostTransactions
    })

    const [earningModal, setEarningModal] = useState<EarningModalType>({
        is_enabled: false,
        imageUrl: '',
        location: '',
        title: '',
        amount: '',
        numberOfGuests: 0,
        rating: '',
        apartmentPrice: 0
    })

    const [withdrawModal, setWithdrawModal] = useState<WithdrawModalType>({
        amountWithdrew: 1,
        is_enabled: false,
        amount: 123243,
        bank: {
            account_name: 'John Doe',
            account_number: '1234567890',
            bank_name: 'First Bank',
            bvn: '1232939kd9o230do'
        }
    })



    // [Function]-------------------------------------------------------------------------
    async function getHostTransactions(): Promise<TransactionList> {
        try {
            const params = {
                filter: `host="${user.id}"`,
                expand: 'apartment,booking',
                sort: '-created'
            }
            const { data } = await listApiCollection(TRANSACTIONS_COLLECTION, token, params) as { data: TransactionList }
            console.log("🚀 ~ file: Transactions.tsx:69 ~ getHostTransactions ~ data:", data)
            return data
        }
        catch (error: any) {
            throw new Error(error)
        }
    }


    if (isError) return <NotFound heading='Transaction Error' subheading='An error occurred getting your transactions' />

    return (
        <IonPage>
            <BackHeaderWithAvater
                backHref='/home'
                title='Transactions'
                image={Man}
            />

            <IonContent fullscreen className='ion-padding'>


                {
                    earningModal.is_enabled ? <EarningModal modal={earningModal} isOpen={earningModal.is_enabled} setModal={setEarningModal} /> : null
                }
                {
                    withdrawModal ? <WithdrawModal modal={withdrawModal} isOpen={withdrawModal.is_enabled} setModal={setWithdrawModal} /> : null
                }

                <section className="mt-3 d-flex align-items-center">
                    <IonSearchbar mode='ios' showCancelButton='focus' className='rounded-5 ion-no-border shadow-0' />
                    <IonButton
                        className='brown_fill'
                        style={{ width: "45px", height: "45px" }}
                        mode='ios'
                    >
                        <IonIcon icon={filter} size='large' />
                    </IonButton>
                </section>

                {
                    !isLoading ? (
                        <>
                            {/* Transaction History Summation */}
                            <section className='ion-padding'>
                                <div>
                                    <IonText>Sep <IonIcon icon={chevronDown} /> </IonText>
                                </div>
                                {
                                    transactions.totalItems >= 1 ? (
                                        <div className='mt-2 text-sm'>
                                            <IonText><span className="text-muted">In: </span>1232434,34</IonText>
                                            <IonText className='ms-4'><span className="text-muted">Out: </span>1232434,34</IonText>
                                        </div>
                                    ) : (
                                        <div className='mt-2 text-sm'>
                                            <IonText><span className="text-muted">In: </span>-------</IonText>
                                            <IonText className='ms-4'><span className="text-muted">Out: </span>-------</IonText>
                                        </div>
                                    )
                                }
                            </section>

                            {/* Transaction List */}
                            <section >
                                {
                                    transactions.totalItems >= 1 ? transactions.items.map(transaction => (
                                        <TransactionCard
                                            amount={transaction.amount}
                                            isEarning={transaction.is_in}
                                            isWithdraw={transaction.is_out}
                                            setEarningOpenModal={setEarningModal}
                                            setWithdrawOpenModal={setWithdrawModal}
                                            timestamp={transaction.created}
                                            transactionObject={transaction}
                                        />
                                    )) : <NotFound heading='No transactions' subheading='You have no available transactions' />
                                }
                            </section>
                        </>
                    ) : (
                        <>
                            <IonSkeletonText animated style={{ width: '50px' }} />
                            <IonSkeletonText animated style={{ width: '150px', marginTop: '5px' }} />
                            <IonSkeletonText animated style={{ width: '100%', height: '50px', marginTop: '5px', borderRadius: '15px' }} />
                            <IonSkeletonText animated style={{ width: '100%', height: '50px', marginTop: '5px', borderRadius: '15px' }} />
                            <IonSkeletonText animated style={{ width: '100%', height: '50px', marginTop: '5px', borderRadius: '15px' }} />
                            <IonSkeletonText animated style={{ width: '100%', height: '50px', marginTop: '5px', borderRadius: '15px' }} />
                        </>
                    )
                }
            </IonContent>
        </IonPage>
    )
}

export default Transactions


