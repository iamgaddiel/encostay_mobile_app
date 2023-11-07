import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonPage, IonRow, useIonRouter, useIonToast, useIonViewDidEnter } from '@ionic/react'
import { useRef, useState } from 'react'
import BackHeader from '../../components/BackHeader'

import './ResetPasswordOtp.css'
import { backspaceOutline, chevronForward, warningOutline } from 'ionicons/icons'
import { useRecoilValue } from 'recoil'
import { forgetPasswordAtom } from '../../atoms/passwordResetAtom'




const ForgetPasswordOtp = () => {
  const [presentToast, _] = useIonToast()
  const router = useIonRouter()

  const resetPasswordAtomValue = useRecoilValue(forgetPasswordAtom)

  const inputOne = useRef<HTMLIonInputElement | null>(null)
  const inputTwo = useRef<HTMLIonInputElement | null>(null)
  const inputThree = useRef<HTMLIonInputElement | null>(null)
  const inputFour = useRef<HTMLIonInputElement | null>(null)

  const [timer, setTimer] = useState(59)



  useIonViewDidEnter(() => {
    inputOne.current?.setFocus();
  }, [])


  function displayKeypadDigits(digit: number) {
    if (inputOne.current?.value === '') {
      inputOne.current!.value = digit
    }
    else if (inputTwo.current?.value === '') {
      inputTwo.current!.value = digit
    }
    else if (inputThree.current?.value === '') {
      inputThree.current!.value = digit
    }
    else if (inputFour.current?.value === '') {
      inputFour.current!.value = digit
    }
  }

  function clearAllInput() {
    inputOne.current!.value = ''
    inputTwo.current!.value = ''
    inputThree.current!.value = ''
    inputFour.current!.value = ''
  }


  function handleSubmit() {
    if ((inputOne.current!.value || inputTwo.current!.value || inputThree.current!.value || inputFour.current!.value) === '') {
      presentToast({
        message: 'Incomplete OTP code',
        color: 'danger',
        position: 'top',
        duration: 3000,
        icon: warningOutline,
        mode: 'ios'
      })
      return
    }

    const inputtedOtp = `${inputOne.current!.value }${inputTwo.current!.value}${inputThree.current!.value}${inputFour.current!.value}`

    //TODO: check if otp is valid
    // if (resetPasswordAtomValue.otp !== inputtedOtp){
    //   presentToast({
    //     message: 'Invalid OTP code',
    //     color: 'danger',
    //     position: 'top',
    //     duration: 3000,
    //     icon: warningOutline,
    //     mode: 'ios'
    //   })
    //   return
    // }

    router.push('/reset_password')

  }

  return (
    <IonPage>
      <BackHeader title='OTP' backLink='/reset_password' />
      <IonContent className='ion-padding'>
        <div className='ion-padding-0 ion-padding-top ion-text-center'>
          <p className='fw-500 fs-2'>Enter 4 Digit Code</p>
          <p
            className='my-3 text-muted'>
            Enter the 4 digits code that you received on your email.
          </p>
        </div>


        {/* Rest Email */}
        <div className='otp_inputs mt-3'>
          <IonGrid fixed>
            <IonRow className='ion-justify-content-center'>
              <IonCol size='3' sizeMd='2'>
                <IonInput
                  type='text'
                  inputMode='numeric'
                  className="otp_input w-75 mx-auto"
                  maxlength={1}
                  readonly
                  ref={inputOne}
                  onIonInput={() => inputTwo.current?.setFocus()}
                />
              </IonCol>
              <IonCol size='3' sizeMd='2'>
                <IonInput
                  type='text'
                  inputMode='numeric'
                  className="otp_input w-75 mx-auto"
                  maxlength={1}
                  readonly
                  ref={inputTwo}
                  onIonInput={() => inputThree.current?.setFocus()}
                />
              </IonCol>
              <IonCol size='3' sizeMd='2'>
                <IonInput
                  type='text'
                  inputMode='numeric'
                  className="otp_input w-75 mx-auto"
                  maxlength={1}
                  readonly
                  ref={inputThree}
                  onIonInput={() => inputFour.current?.setFocus()}
                />
              </IonCol>
              <IonCol size='3' sizeMd='2'>
                <IonInput
                  type='text'
                  inputMode='numeric'
                  className="otp_input w-75 mx-auto"
                  maxlength={1}
                  readonly
                  ref={inputFour}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        <section className='ion-text-center mt-4'>
          <span className='text-muted fs-large'>{timer}s</span>
          <button type='button' className='text-muted ms-1' disabled={timer >= 1}>Resend</button>
        </section>

        <section className="mt-3">
          <IonGrid>
            <IonRow className='ion-justify-content-center ion-align-items-center ion-text-center mt-2'>
              <IonCol size='4' sizeMd='3'>
                <button type='button' className='otp_btn' onClick={() => displayKeypadDigits(1)}>1</button>
              </IonCol>
              <IonCol size='4' sizeMd='3'>
                <button type='button' className='otp_btn' onClick={() => displayKeypadDigits(2)}>2</button>
              </IonCol>
              <IonCol size='4' sizeMd='3'>
                <button type='button' className='otp_btn' onClick={() => displayKeypadDigits(3)}>3</button>
              </IonCol>
            </IonRow>
            <IonRow className='ion-justify-content-center ion-align-items-center ion-text-center mt-2'>
              <IonCol size='4' sizeMd='3'>
                <button type='button' className='otp_btn' onClick={() => displayKeypadDigits(4)}>4</button>
              </IonCol>
              <IonCol size='4' sizeMd='3'>
                <button type='button' className='otp_btn' onClick={() => displayKeypadDigits(5)}>5</button>
              </IonCol>
              <IonCol size='4' sizeMd='3'>
                <button type='button' className='otp_btn' onClick={() => displayKeypadDigits(6)}>6</button>
              </IonCol>
            </IonRow>
            <IonRow className='ion-justify-content-center ion-align-items-center ion-text-center mt-2'>
              <IonCol size='4' sizeMd='3'>
                <button type='button' className='otp_btn' onClick={() => displayKeypadDigits(7)}>7</button>
              </IonCol>
              <IonCol size='4' sizeMd='3'>
                <button type='button' className='otp_btn' onClick={() => displayKeypadDigits(8)}>8</button>
              </IonCol>
              <IonCol size='4' sizeMd='3'>
                <button type='button' className='otp_btn' onClick={() => displayKeypadDigits(9)}>9</button>
              </IonCol>
            </IonRow>
            <IonRow className='ion-justify-content-center ion-align-items-center ion-text-center mt-2'>
              <IonCol size='4' sizeMd='3'>
                <button type='button' className='otp_btn'></button>
              </IonCol>
              <IonCol size='4' sizeMd='3'>
                <button type='button' className='otp_btn' onClick={() => displayKeypadDigits(0)}>0</button>
              </IonCol>
              <IonCol size='4' sizeMd='3'>
                <button type='button' className='otp_btn' onClick={() => clearAllInput()}><IonIcon icon={backspaceOutline} size='large' /></button>
              </IonCol>
            </IonRow>
          </IonGrid>
        </section>


        <section className="px-4 mt-5">
          <IonButton
            expand='block'
            shape='round'
            className='nm_btn yellow_fill w-100'
            mode='ios'
            type='submit'
            onClick={handleSubmit}
          >
            Continue
            <IonIcon icon={chevronForward} slot='end' />
          </IonButton>
        </section>
      </IonContent>
    </IonPage>
  )
}

export default ForgetPasswordOtp