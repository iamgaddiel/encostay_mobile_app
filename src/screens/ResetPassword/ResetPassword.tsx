import { IonButton, IonContent, IonIcon, IonInput, IonLabel, IonPage, IonTitle, IonToolbar, useIonRouter, useIonToast } from '@ionic/react'
import React, { useState } from 'react'
import BackHeader from '../../components/BackHeader'
import { eyeOutline, eyeOffOutline, warningOutline } from 'ionicons/icons'
import { SubmitHandler, useForm } from 'react-hook-form'
import { listApiCollection, listApiCollectionNoAuth, updatePatchApiCollectionItem, updatePatchApiCollectionItemNoAuth } from '../../helpers/apiHelpers'
import { USERS_COLLECTION } from '../../helpers/keys'
import { useRecoilValue } from 'recoil'
import { forgetPasswordAtom } from '../../atoms/passwordResetAtom'
import { UserCollectionType, UsersList } from '../../@types/users'
import useCustomToast from '../../hooks/useCustomToast'


interface PasswordReset {
    password: string
    confirmPassword: string
}

const ResetPassword = () => {
    const { presentToastDanger } = useCustomToast()
    const resetPasswordAtomValue = useRecoilValue(forgetPasswordAtom)

    const router = useIonRouter()
    const [presentToast, _] = useIonToast()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<PasswordReset>();




    const onSubmitForm: SubmitHandler<PasswordReset> = async ({ password, confirmPassword }) => {
        if (password !== confirmPassword) {
            presentToastDanger('Password mismatch')
            return
        }
        
        // Update user details
        // const userId = resetPasswordAtomValue.user?.id!

        // const dataToUpdate = { password }

        // const { isUpdated } = await updatePatchApiCollectionItemNoAuth(USERS_COLLECTION, userId, dataToUpdate,)

        // if (!isUpdated) {
        //     presentToastDanger('Failed to update user password')
        //     return
        // }

        presentToastDanger('Password Changed Successfully')
    }

    async function handlePasswordReset() {
        // todo: reset pass for user

        //todo: if failed
        // forgetPasswordState.value = "failed"
        // setForgetPassword("failed")

        //todo: if success
    }
    return (
        <IonPage>
            <BackHeader title='Reset Password' backLink='/reset_password_otp' />
            <IonContent className='ion-padding'>
                <IonToolbar className='ion-padding-0'>
                    <IonTitle className='fw-500'>Reset Password</IonTitle>
                </IonToolbar>

                <div className="ion-padding mt-1">
                    <p className='my-3 text-muted'>
                        Set the new password for your account so you can login and access all the features.
                    </p>
                </div>


                {/* Rest Email */}
                <form className='ion-padding-horizontal mt-2' onSubmit={handleSubmit(onSubmitForm)}>
                    <div className='form_inputs mt-4'>
                        <IonLabel>Password</IonLabel>
                        <IonInput
                            type={showPassword ? "text" : "password"}
                            className='mt-2 p-2'
                            {...register('password', {
                                required: {
                                    value: true,
                                    message: 'This field is required'
                                },
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters long'
                                }
                            })}
                        />
                        <IonIcon
                            icon={showPassword ? eyeOutline : eyeOffOutline}
                            className='input_icon text-muted'
                            size='large'
                            slot='end'
                            onClick={() => setShowPassword(!showPassword)}
                        />
                        {errors.password && <small className='text-danger'>{errors.password.message}</small>}
                    </div>
                    <div className='form_inputs mt-4'>
                        <IonLabel>Confirm Password</IonLabel>
                        <IonInput
                            type={showConfirmPassword ? "text" : "password"}
                            className='mt-2 p-2'
                            {...register('confirmPassword', {
                                required: {
                                    value: true,
                                    message: 'This field is required'
                                },
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters long'
                                }
                            })}
                        />
                        <IonIcon
                            icon={showConfirmPassword ? eyeOutline : eyeOffOutline}
                            className='input_icon text-muted'
                            size='large'
                            slot='end'
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                        {errors.confirmPassword && <small className='text-danger'>{errors.confirmPassword.message}</small>}
                    </div>
                    <section className="px-4 mt-5">
                        <IonButton
                            expand='block'
                            shape='round'
                            className='nm_btn yellow_fill w-100'
                            mode='ios'
                            type='submit'
                        >
                            Reset Password
                            {/* <IonIcon icon={} slot='end' /> */}
                        </IonButton>
                    </section>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default ResetPassword