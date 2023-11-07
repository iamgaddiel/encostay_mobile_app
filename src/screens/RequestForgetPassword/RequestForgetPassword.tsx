import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonPage, useIonLoading, useIonRouter, useIonToast } from '@ionic/react'
import React from 'react'
import BackHeader from '../../components/BackHeader'
import { chevronForward, warningOutline } from 'ionicons/icons'
import { useForm, SubmitHandler } from 'react-hook-form'
import { PasswordResetEmailField, PasswordResetFields, forgetPasswordAtom } from '../../atoms/passwordResetAtom'
import { useSetRecoilState } from 'recoil'
import { getApiCollectionItem, listApiCollection, listApiCollectionNoAuth, sendPasswordResetToken } from '../../helpers/apiHelpers'
import { USERS_COLLECTION } from '../../helpers/keys'
import Settings from '../../helpers/settings'
import { _post } from '../../helpers/api'
import { generateRandomNumbers, getRandomString } from '../../helpers/utils'
import { UsersList } from '../../@types/users'
import useCustomToast from '../../hooks/useCustomToast'



const { serverBaseUrl, pb } = Settings()
const sendOtpUrl = `${serverBaseUrl}/api/core/send_otp`
// const sendOtpUrl = `${serverBaseUrl}/test`


const RequestForgetPassword = () => {
    const router = useIonRouter()

    const [presentLoading, dismissLoading] = useIonLoading()

    const { presentToastDanger } = useCustomToast()

    const setPasswordResetAtom = useSetRecoilState(forgetPasswordAtom)

    const { register, handleSubmit, formState: { errors } } = useForm<PasswordResetEmailField>();



    const onSubmitForm: SubmitHandler<PasswordResetEmailField> = async (data) => {
        await presentLoading('Verifying user...')

        // Check if user exists
        const params = { filter: `email='${data.email}'` }
        const { data: response } = await listApiCollectionNoAuth(USERS_COLLECTION, params) as { data: UsersList }

        // User Not Found
        if (response.totalItems === 0) {
            await dismissLoading()
            presentToastDanger('No user with this email found')
            return
        }

        sendPasswordResetToken(data.email) // Send Password Reset Token to users email

        setPasswordResetAtom({...data})
        await dismissLoading()
        router.push('/reset_password_sent_confirm', 'root')
    };

    return (
        <IonPage>
            <BackHeader title='Forget Password' backLink='/login' />
            <IonContent className='ion-padding'>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    {/* Rest Email */}
                    <div className='form_inputs mt-4'>
                        <IonLabel>E-mail</IonLabel>
                        <IonInput
                            type='email'
                            placeholder='example@example.com'
                            className='mt-2 p-2'
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: 'This field is required'
                                }
                            })}
                        />
                        {errors.email && <small className='text-danger mt-2'>{errors.email.message}</small>}
                    </div>

                    <div className="ion-padding mt-1">
                        <small className='my-3 text-muted'>Enter your email for the verification process, we will send 4 digits code to your email.</small>
                    </div>


                    <section className="px-4 mt-3">
                        <IonButton
                            expand='block'
                            shape='round'
                            className='nm_btn yellow_fill w-100'
                            mode='ios'
                            type='submit'
                        >
                            Continue
                            <IonIcon icon={chevronForward} slot='end' />
                        </IonButton>
                    </section>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default RequestForgetPassword