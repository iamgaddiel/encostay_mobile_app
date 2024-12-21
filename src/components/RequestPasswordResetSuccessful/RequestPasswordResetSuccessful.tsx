import React, { useRef } from 'react'
import SuccessSign from "../../assets/images/success.svg"
import { IonImg, IonToolbar, IonTitle, IonButton, IonGrid, IonRow, IonCol, CreateAnimation, useIonViewDidEnter, useIonRouter } from '@ionic/react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { forgetPasswordAtom } from '../../atoms/passwordResetAtom'


interface Props {
  email: string
}
const RequestPasswordResetSuccessful: React.FC<Props> = ({ email }) => {
  const router = useIonRouter()

  const setRequestPasswordAtom = useSetRecoilState(forgetPasswordAtom)

  const animationRef = useRef<CreateAnimation | null>(null)


  useIonViewDidEnter(() => {
    animationRef.current?.animation.play()
  }, [])


  function goBackToLogin(){
    setRequestPasswordAtom({ email: ''})
    router.push('/auth', 'root')
  }


  return (
    <IonGrid>
      <IonRow className='ion-justify-content-center'>
        <IonCol size='6' sizeMd='4'>
          <CreateAnimation
            ref={animationRef}
            duration={2000}
            iterations={Infinity}
            keyframes={[
              { offset: 0, transform: 'scale(1)' },
              { offset: 1, transform: 'scale(1.5)' },
            ]}
          >
            <IonImg src={SuccessSign} className='forget_password_sign' />
          </CreateAnimation>
        </IonCol>
      </IonRow>
      <IonRow className='ion-justify-content-center'>
        <IonCol size='12'>
          <p className='ion-text-center my-3 text-muted'>
            Successfully sent password reset email to {email}
          </p>
        </IonCol>
      </IonRow>
      <IonRow className='ion-justify-content-center'>
        <IonCol size='12'>
          <IonButton
            expand='block'
            shape='round'
            className='nm_btn yellow_fill w-100'
            mode='ios'
            onClick={goBackToLogin}
          >
            Okay
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  )
}

export default RequestPasswordResetSuccessful