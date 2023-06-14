import React from 'react'
import SuccessSign from "../../assets/images/success.svg"
import { IonImg, IonToolbar, IonTitle, IonButton } from '@ionic/react'
import { forgetPasswordState } from '../../signals/passwordResetAtom'

const PasswordResetSuccessful = () => {

  const handleReset = () => forgetPasswordState.value = "none"

  return (
    <>
      <section className="reset_form_logo my-5">
        <IonImg src={SuccessSign} className='forget_password_sign' />
      </section>

      <IonToolbar className='ion-padding-0 ion-text-center'>
        <IonTitle className='fw-500'>Reset Password</IonTitle>
      </IonToolbar>

      <div className="ion-padding ion-text-center">
        <p className='my-3 text-muted'>
          Set the new password for your account so you can login and access all the features.
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
          Okay
        </IonButton>
      </section>

    </>
  )
}

export default PasswordResetSuccessful