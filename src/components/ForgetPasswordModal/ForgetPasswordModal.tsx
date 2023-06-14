import { IonContent, IonToolbar, IonTitle, IonLabel, IonInput, IonButton } from "@ionic/react"
import { passwordResetSwipeSignal } from "../../signals/swiperAtom";




function ForgetPasswordModal() {

    const handleNext = () => {
        // TODO: send otp to email
        passwordResetSwipeSignal.value?.slideNext()
    };


    return (
        <>
            <IonToolbar className='ion-padding-0'>
                <IonTitle className='fw-500'>Forgot password</IonTitle>
            </IonToolbar>

            <div className="ion-padding mt-1">
                <small className='my-3 text-muted'>Enter your email for the verification proccess, we will send 4 digits code to your email.</small>
            </div>


            {/* Rest Email */}
            <div className='form_inputs mt-4'>
                <IonLabel>E-mail</IonLabel>
                <IonInput type='email' placeholder='example@example.com' className='mt-2 p-2' />
            </div>


            <section className="px-4 mt-3">
                <IonButton
                    expand='block'
                    shape='round'
                    className='nm_btn yellow_fill w-100'
                    mode='ios'
                    type='submit'
                    onClick={handleNext}
                >
                    Continue
                </IonButton>
            </section>
        </>

    )
}


export default ForgetPasswordModal