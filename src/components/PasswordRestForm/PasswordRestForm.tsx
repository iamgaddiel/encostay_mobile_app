import { IonToolbar, IonTitle, IonLabel, IonInput, IonIcon, IonButton } from '@ionic/react'
import { eyeOutline, eyeOffOutline } from 'ionicons/icons'
import { useState } from 'react'
import { forgetPasswordState } from '../../signals/passwordResetAtom'

const PasswordRestForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    

    async function handlePasswordReset(){
        // todo: reset pass for user
        
        //todo: if failed
        // forgetPasswordState.value = "failed"

        //todo: if success
        forgetPasswordState.value = "success"
    }

    return (
        <>
            <IonToolbar className='ion-padding-0'>
                <IonTitle className='fw-500'>Reset Password</IonTitle>
            </IonToolbar>

            <div className="ion-padding mt-1">
                <p className='my-3 text-muted'>
                    Set the new password for your account so you can login and access all the features.
                </p>
            </div>


            {/* Rest Email */}
            <section className='ion-padding-horizontal mt-2'>
                <div className='form_inputs mt-4'>
                    <IonLabel>Password</IonLabel>
                    <IonInput type={showPassword ? "text" : "password"} className='mt-2 p-2' />
                    <IonIcon
                        icon={showPassword ? eyeOutline : eyeOffOutline}
                        className='input_icon text-muted'
                        size='large'
                        slot='end'
                        onClick={() => setShowPassword(!showPassword)}
                    />
                </div>
                <div className='form_inputs mt-4'>
                    <IonLabel>Confirm Password</IonLabel>
                    <IonInput type={showConfirmPassword ? "text" : "password"} className='mt-2 p-2' />
                    <IonIcon
                        icon={showConfirmPassword ? eyeOutline : eyeOffOutline}
                        className='input_icon text-muted'
                        size='large'
                        slot='end'
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                </div>
                <section className="px-4 mt-5">
                    <IonButton
                        expand='block'
                        shape='round'
                        className='nm_btn yellow_fill w-100'
                        mode='ios'
                        // type='submit'
                        onClick={handlePasswordReset}
                    >
                        Reset Password
                    </IonButton>
                </section>
            </section>
        </>
    )
}

export default PasswordRestForm