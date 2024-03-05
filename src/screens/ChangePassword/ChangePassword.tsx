import { IonButton, IonContent, IonIcon, IonInput, IonLabel, IonPage } from '@ionic/react'
import BackHeader from '../../components/BackHeader/BackHeader'
import { useState } from 'react'
import { eyeOffOutline, eyeOutline } from 'ionicons/icons'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCustomCheckout } from '@stripe/react-stripe-js'
import useCustomToast from '../../hooks/useCustomToast'
import Settings from '../../helpers/settings'
import { USERS_COLLECTION } from '../../helpers/keys'
import { updatePatchApiCollectionItem } from '../../helpers/apiHelpers'
import { userAtom } from '../../atoms/appAtom'
import { useRecoilValue } from 'recoil'



interface PasswordToggle {
    showNewPassword?: boolean,
    showConfirmPassword?: boolean
    showCurrentPassword?: boolean
}

interface PasswordResetField {
    oldPassword: string
    newPassword: string
    passwordConfirm: string
}

const ChangePassword = () => {
    const { presentToastDanger, presentToastSuccess } = useCustomToast()

    const { record: user, token: authToken } = useRecoilValue(userAtom)

    const [passwordTooggle, setPasswordToggle] = useState<PasswordToggle>({
        showNewPassword: false,
        showConfirmPassword: false,
        showCurrentPassword: false
    })


    const { register, handleSubmit, formState: { errors } } = useForm<PasswordResetField>()


    const onSubmit: SubmitHandler<PasswordResetField> = async ({ oldPassword, newPassword, passwordConfirm }) => {
        if (newPassword !== passwordConfirm) {
            presentToastDanger('password mismatch')
            return
        }

        const payload = {
            oldPassword,
            password: newPassword,
            passwordConfirm
        }
        const { isUpdated } = await updatePatchApiCollectionItem(USERS_COLLECTION, user.id, payload, authToken)

        if (!isUpdated) {
            presentToastDanger('Unable to update password: invalid current password or no internet connection')
            return
        }

        presentToastSuccess('Password updated successfully')
    }


    return (
        <IonPage>
            <BackHeader backLink='/me' title='Chnage Password' />

            <IonContent className='ion-padding' fullscreen>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Current Password */}
                    <div className='ion-margin-vertical ion-padding-horizontal'>
                        <IonLabel>Enter Current Password</IonLabel>
                        <div className="rounded-5 mt-2 d-flex px-2 align-items-center justify-content-between overflow-x-hidden" style={{ backgroundColor: "var(--white-4)" }}>
                            <IonInput
                                type={passwordTooggle.showCurrentPassword ? 'text' : 'password'}
                                {...register(
                                    'oldPassword',
                                    {
                                        required: {
                                            value: true,
                                            message: 'This field is required'
                                        },
                                        minLength: {
                                            value: 8,
                                            message: 'password must be at least 8 character'
                                        }
                                    }) 
                                }
                            />
                            <IonIcon icon={passwordTooggle.showCurrentPassword ? eyeOutline : eyeOffOutline} size='large' onClick={() => setPasswordToggle({
                                showCurrentPassword: !passwordTooggle.showCurrentPassword
                            })} className='block' />
                        </div>
                        {errors.oldPassword && <small className='text-danger'>{errors.oldPassword.message}</small>}
                    </div>

                    {/* New Password */}
                    <div className='ion-margin-vertical ion-padding-horizontal' >
                        <IonLabel>Enter New Password</IonLabel>
                        <div className="rounded-5 mt-2 d-flex px-2 align-items-center justify-content-between overflow-x-hidden" style={{ backgroundColor: "var(--white-4)" }}>
                            <IonInput type={passwordTooggle.showNewPassword ? 'text' : 'password'}  {...register('newPassword', { required: { value: true, message: 'This field is required' } })} />
                            <IonIcon icon={passwordTooggle.showNewPassword ? eyeOutline : eyeOffOutline} size='large' onClick={() => setPasswordToggle({
                                showNewPassword: !passwordTooggle.showNewPassword
                            })} className='block' />
                        </div>
                        {errors.newPassword && <small className='text-danger'>{errors.newPassword.message}</small>}
                    </div>

                    {/* Confirm Password */}
                    <div className='ion-margin-vertical ion-padding-horizontal'>
                        <IonLabel>Confirm Password</IonLabel>
                        <div className="rounded-5 mt-2 d-flex px-2 align-items-center justify-content-between overflow-x-hidden" style={{ backgroundColor: "var(--white-4)" }}>
                            <IonInput type={passwordTooggle.showConfirmPassword ? 'text' : 'password'} {...register('passwordConfirm', { required: { value: true, message: 'This field is required' } })} />
                            <IonIcon icon={passwordTooggle.showConfirmPassword ? eyeOutline : eyeOffOutline} size='large' onClick={() => setPasswordToggle({
                                showConfirmPassword: !passwordTooggle.showConfirmPassword
                            })} className='block' />
                        </div>
                        {errors.passwordConfirm && <small className='text-danger'>{errors.passwordConfirm.message}</small>}
                    </div>
                    <small className="block mt-1 text-muted ion-padding-horizontal">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, cumque?
                    </small>

                    <IonButton
                        className="yellow_fill mt-5"
                        shape="round"
                        mode="ios"
                        size="large"
                        expand='block'
                        type='submit'
                    >
                        Confirm
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default ChangePassword