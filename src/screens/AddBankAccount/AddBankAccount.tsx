import { IonButton, IonContent, IonIcon, IonImg, IonInput, IonLabel, IonPage, IonProgressBar, IonToast } from '@ionic/react'
import BackHeader from '../../components/BackHeader/BackHeader'
import SpaceBetween from '../../components/style/SpaceBetween'


import MC from "../../assets/images/label.svg"
import { warning, warningOutline } from 'ionicons/icons'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AddBankFields } from '../../@types/bank'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../../atoms/appAtom'
import { createApiCollection } from '../../helpers/apiHelpers'
import { BANKS_COLLECTION } from '../../helpers/keys'
import { Toast } from '../../@types/toast'
import { useHistory } from 'react-router'



const AddBankAccount = () => {
    // TODO: show bvn field only if user is Nigerian
    // TODO: add bank listing API

    const history = useHistory()

    const { token: authToken, record: user } = useRecoilValue(userAtom)

    const { register, handleSubmit, formState: { errors } } = useForm<AddBankFields>()

    const [isLoading, setIsLoading] = useState(false)

    const [showToast, setShowToast] = useState<Toast>({
        enabled: false,
        message: "",
        type: 'warning'
    });




    const handleAddBankAccount: SubmitHandler<AddBankFields> = async (data) => {
        setIsLoading(true)
        console.log(data, '<---- Data')

        const formData = {
            ...data,
            host: user.id
        }

        const { isCreated, response } = await createApiCollection(BANKS_COLLECTION, formData, authToken)

        if (!isCreated) {
            setIsLoading(false)
            setShowToast({
                enabled: true,
                message: 'An error occurred while adding your banking account',
                type: 'danger'
            })
            return
        }

        setIsLoading(false)
        history.goBack()
    }


    return (
        <IonPage>
            <BackHeader title='Add Bank Account' backLink='/bank_account' />
            <IonContent className='ion-padding' fullscreen>
                {/* =========================== Loading Start ======================== */}
                { isLoading && <IonProgressBar type='indeterminate' color={warning}/> }
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
                    <div className='ion-margin-vertical ion-padding-horizontal mt-5'>
                        <IonLabel>Account Name</IonLabel>
                        <div className="rounded-5 ion-padding-horizontal mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                            <IonInput type="text" placeholder='John Doe Kendy' {...register('account_name', {
                                required: {
                                    value: true,
                                    message: 'Account Name is required'
                                }
                            })} />
                        </div>
                        {errors.account_name && <small className='text-danger'>{errors.account_name.message}</small>}
                    </div>

                    {/* Bank Name */}
                    <div className='ion-margin-vertical ion-padding-horizontal mt-4' >
                        <IonLabel>Bank</IonLabel>
                        <div className="rounded-5 ion-padding-horizontal mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                            <IonInput type="text" placeholder='Bank Name' {...register('bank_name', {
                                required: {
                                    value: true,
                                    message: 'Bank name is required'
                                }
                            })} />
                        </div>
                        {errors.bank_name && <small className='text-danger'>{errors.bank_name.message}</small>}
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
                    <div className='ion-margin-vertical ion-padding-horizontal mt-4' >
                        <IonLabel>BVN (optional) </IonLabel>
                        <div className="rounded-5 ion-padding-horizontal mt-2" style={{ backgroundColor: "var(--white-4)" }}>
                            <SpaceBetween>
                                <IonInput type="text" placeholder='1234567890' />
                                <IonImg src={MC} />
                            </SpaceBetween>
                        </div>
                        {errors.bvn && <small className='text-danger'>{errors.bvn.message}</small>}
                    </div>

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

                    <small className="block mt-1 text-muted ion-padding-horizontal">
                        <IonIcon icon={warningOutline} />  Your account name should match your registered name.
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
                        Confirm
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default AddBankAccount