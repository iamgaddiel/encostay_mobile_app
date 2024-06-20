import { IonPage, IonContent, IonProgressBar, IonToast, IonLabel, IonInput, IonIcon, IonButton, useIonRouter, IonText } from '@ionic/react'
import { chevronForward, warning, warningOutline } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useHistory } from 'react-router'
import { useRecoilValue } from 'recoil'
import { NairaAccountFields } from '../../@types/bank'
import { Toast } from '../../@types/toast'
import { userAtom } from '../../atoms/appAtom'
import { createApiCollection } from '../../helpers/apiHelpers'
import { BANKS_COLLECTION } from '../../helpers/keys'
import BackHeader from '../BackHeader'
import SpaceBetween from '../style/SpaceBetween'
import { serverLog } from '../../helpers/utils'
import { BankSelectAtom } from '../../atoms/bankAtoms'

const NairaBankForm = () => {

    // TODO: add bank listing API

    const { token: authToken, record: user } = useRecoilValue(userAtom)

    const selectedBank = useRecoilValue(BankSelectAtom)

    const router = useIonRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<NairaAccountFields>()

    const [isLoading, setIsLoading] = useState(false)

    const [showToast, setShowToast] = useState<Toast>({
        enabled: false,
        message: "",
        type: 'warning'
    });



    const handleAddBankAccount: SubmitHandler<NairaAccountFields> = async (data) => {
        setIsLoading(true)


        let bank_id = selectedBank?.id
        if (bank_id.length < 2) bank_id = `00${bank_id}`;
        if (bank_id.length < 3) bank_id = `0${bank_id}`;


        const formData = { ...data, user: user.id, bank_name: selectedBank?.name, bank_id }

        const { isCreated, response } = await createApiCollection(BANKS_COLLECTION, formData, authToken)

        if (!isCreated) {
            setIsLoading(false)
            serverLog({
                errorMessage: response,
                file: 'NairaBankForm.tsx',
                lineNumber: '44'
            })
            setShowToast({
                enabled: true,
                message: 'An error occurred while adding your banking account',
                type: 'danger'
            })
            return
        }

        setIsLoading(false)
        router.push('/bank_account')
    }


    return (
        <IonPage>
            <BackHeader title='Add Bank Account' backLink='/bank_account' />
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

                <form onSubmit={handleSubmit(handleAddBankAccount)}>
                    {/* Account Name */}
                    <div className='ion-margin-vertical ion-padding-horizontal'>
                        <IonLabel>Account Holder's Name</IonLabel>
                        <div className="rounded-5 ion-padding-horizontal mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                            <IonInput type="text" placeholder='John Doe Kendy' {...register('account_name', {
                                required: {
                                    value: true,
                                    message: "Account holder's name is required"
                                }
                            })} />
                        </div>
                        {errors.account_name && <small className='text-danger'>{errors.account_name.message}</small>}
                        <small className="block mt-1 text-muted mt-3">
                            <IonIcon icon={warningOutline} />  Your account name should match your registered name.
                        </small>
                    </div>

                    {/* Bank Name */}
                    <div className='ion-margin-vertical ion-padding-horizontal mt-4' >
                        <div className="d-flex justify-content-between align-items-center" onClick={() => router.push('/select_bank')}>
                            <IonLabel>Bank</IonLabel>

                            <IonText className='d-flex align-items-center'>
                                view all
                                <IonIcon icon={chevronForward} />
                            </IonText>
                        </div>
                        <div className=" mt-2">
                            <IonLabel>{selectedBank?.name === "" ? 'Bank Name' : selectedBank?.name}</IonLabel>
                        </div>
                        {/* {errors.bank_name && <small className='text-danger'>{errors.bank_name.message}</small>} */}
                    </div>

                    {/* Account Number */}
                    <div className='ion-margin-vertical ion-padding-horizontal mt-4' >
                        <IonLabel>Account Number</IonLabel>
                        <div className="rounded-5 ion-padding-horizontal mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                            <IonInput type="text" placeholder='1234567890' {...register('account_number', {
                                required: {
                                    value: true,
                                    message: 'Account number is required'
                                }
                            })} />
                        </div>
                        {errors.account_name && <small className='text-danger'>{errors.account_name.message}</small>}
                    </div>

                    {/* BVN */}
                    {
                        user.preferred_currency === 'NGN' && (
                            <div className='ion-margin-vertical ion-padding-horizontal mt-4' >
                                <IonLabel>BVN</IonLabel>
                                <div className="rounded-5 ion-padding-horizontal mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                                    <SpaceBetween>
                                        <IonInput type="text" placeholder='223473209569' {...register('bvn', {
                                            required: {
                                                value: true,
                                                message: 'Bvn is required'
                                            }
                                        })} />
                                        {/* <IonImg src={MC} /> */}
                                    </SpaceBetween>
                                </div>
                                {errors.bvn && <small className='text-danger'>{errors.bvn.message}</small>}
                            </div>
                        )
                    }

                    {/* <SpaceBetween className='mt-3'>
                       <div className='ion-margin-vertical ion-padding-horizontal w-50 mx-3'>
                           <IonLabel>Expiry Date</IonLabel>
                           <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                               <IonInput type="date" />
                           </div>
                       </div>
                       <div className='ion-margin-vertical ion-padding-horizontal w-50 mx-3'>
                           <IonLabel>CVV</IonLabel>
                           <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                               <IonInput type="password" />
                           </div>
                       </div>
                   </SpaceBetween> */}

                    <small className="block mt-1 text-muted ion-padding-horizontal mt-3">
                        <IonIcon icon={warningOutline} />  Your details are only used for verification purposes and this will <strong>not</strong> be use for anything other than this.
                        The security of your identity is very important to us.
                    </small>

                    <small className="block mt-1 text-muted ion-padding-horizontal mt-3">
                        <IonIcon icon={warningOutline} /> A successfully added bank detail can only be removed by contacting the customer support team.
                    </small>

                    <IonButton
                        className="yellow_fill mt-3"
                        shape="round"
                        mode="ios"
                        size="large"
                        expand='block'
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Confirm'}
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default NairaBankForm