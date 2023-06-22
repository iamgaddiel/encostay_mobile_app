import FailedSign from "../../assets/images/failure.svg"
import { IonToolbar, IonTitle, IonButton, IonImg } from '@ionic/react'
import { forgetPasswordAtom } from '../../atoms/passwordResetAtom'
import { useRecoilState } from 'recoil'

const PasswordResetFailed = () => {
    const [_, setForgetPassword] = useRecoilState(forgetPasswordAtom)

    const handleReset = () =>  setForgetPassword("none")

    return (
        <>
            <section className="reset_form_logo my-5">
                <IonImg src={FailedSign} className='forget_password_sign' />
            </section>
            
            <IonToolbar className='ion-padding-0 ion-text-center'>
                <IonTitle className='fw-500'>Reset Password</IonTitle>
            </IonToolbar>

            <div className="ion-padding ion-text-center">
                <p className='my-3 text-muted'>
                    Check your internet connection and try again to reset your password. Good luck!
                </p>
            </div>

            <section className="px-4 mt-3">
                <IonButton
                    expand='block'
                    shape='round'
                    className='nm_btn yellow_fill w-100'
                    mode='ios'
                    onClick={handleReset}
                >
                    Reset Password
                </IonButton>
            </section>

        </>
    )
}

export default PasswordResetFailed