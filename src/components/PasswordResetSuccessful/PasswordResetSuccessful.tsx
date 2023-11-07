import React from 'react'
import SuccessSign from "../../assets/images/success.svg"
import { IonImg, IonToolbar, IonTitle, IonButton } from '@ionic/react'


const PasswordResetSuccessful = () => {

  return (
    <>
      <section className="reset_form_logo my-5">
        <IonImg src={SuccessSign} className='forget_password_sign' />
      </section>

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
        >
          Okay
        </IonButton>
      </section>

    </>
  )
}

export default PasswordResetSuccessful