import { IonButton, IonButtons, IonContent, IonIcon, IonImg, IonInput, IonLabel, IonModal, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react'
import React, { useRef, useState } from 'react'
import OrSeperator from '../../components/OrSeperator/OrSeperator'
import { effect, useSignal } from '@preact/signals-react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { eyeOffOutline, eyeOutline, logoFacebook, logoGoogle } from 'ionicons/icons'



// styles
import "./Login.css"


// images
import Logo from "../../assets/images/login_logo.svg"
import GoogleLogo from "../../assets/images/search.png"
import facebookLogo from "../../assets/images/facebook.png"

// components
import SpaceBetween from '../../components/style/SpaceBetween'
import RenderPasswordResetModal from '../../components/RenderPasswordResetModal/RenderPasswordResetModal';
import { swiper } from '../../signals/passwordResetSignal';




const Login = () => {
  // TODO: fix social media buttons
  // TODO: disable continue button for forget password modal until email is inputed
  // TODO: set onChange event for email input so as to disable continue restriction


  // 3rd party hooks


  // signals
  const slides = useSignal<string[]>([
    "forget password",
    "otp",
    "reset",
    "success",
    "failure"
  ])
  const slideCount = useSignal(0)
  const swiper = useSignal<any>(null)



  // states
  const [showPassword, setShowPassword] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState("")


  // refs


  // effects


  // functions


  function dismissModal() {
    slideCount.value = 0
    setShowModal(false)
  }




  return (
    <IonPage>
      <IonContent className="ion-padding">

        <section className="login_logo mx-auto mt-5">
          <IonImg src={Logo} />
        </section>


        <section className="login_nav_btns w-50 mx-auto  ion-margin-top mt-4">
          <SpaceBetween>
            <IonButton className="sm_btn brown_fill" shape='round'>
              Login
            </IonButton>
            <IonRouterLink routerDirection='forward' routerLink='/register'>
              Sign Up
            </IonRouterLink>
          </SpaceBetween>
        </section>


        <section className='mt-5 ion-padding'>

          <form action="">

            {/* Email */}
            <div className='form_inputs ion-margin-vertical'>
              <IonLabel>Email</IonLabel>
              <IonInput type='email' placeholder='Enter your Email' className='mt-2 p-2' />
            </div>

            {/* Password */}
            <div className='form_inputs ion-margin-vertical'>
              <IonLabel>Password</IonLabel>
              <IonInput
                type={showPassword ? "text" : "password"}
                placeholder='Enter your Email'
                className='mt-2 p-2'
              />

              {/* Toggle Password Visibility */}
              <IonIcon
                icon={showPassword ? eyeOutline : eyeOffOutline}
                className='input_icon'
                size='large'
                slot='end'
                onClick={() => setShowPassword(!showPassword)}
              />

              {/* Forget Password  */}
              <div className="ion-text-end login_nav_btns">
                <small
                  className='ion-text-end pt-3'
                  onClick={() => setShowModal(true)}
                >
                  Forget Password?
                </small>
              </div>
            </div>

            <IonButton
              expand='block'
              shape='round'
              className='nm_btn yellow_fill mt-5 w-100'
              mode='ios'
              type='submit'
            >
              Login
            </IonButton>

          </form>
        </section>

        {/* Modal */}
        <IonModal
          isOpen={showModal}
          initialBreakpoint={0.5}
          breakpoints={[0, 0.5, 0.75]}
          onDidDismiss={dismissModal}
        >
          <IonContent className='ion-padding'>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              // onSlideChange={handleSlideChange}
              allowSlidePrev={false}
              onSwiper={(swp) => swiper.value = swp}
            >
              {
                slides.value.map((_, indx) => (
                  <SwiperSlide key={indx}>
                    <RenderPasswordResetModal  index={indx} />
                  </SwiperSlide>
                ))
              }
            </Swiper>

          </IonContent>
        </IonModal>


        <section className='mt-5'>
          <OrSeperator speratorText='Or login with' className='mx-auto w-75' />


          <SpaceBetween className='mt-2 mx-auto ion-padding-horizontal w-75'>
            {/* Google Btn */}
            <IonButton shape='round' className='social_btns' color={'light'} >
              <IonImg src={GoogleLogo} className='w-25 ion-margin-end' />
              Google
            </IonButton>

            {/* Facebook */}
            <IonButton shape='round' className='social_btns fb_btn' color={"primary"}>
              <IonIcon icon={logoFacebook} slot='start' size='large' />
              Facebook
            </IonButton>
          </SpaceBetween>
        </section>

      </IonContent>
    </IonPage>
  )
}

export default Login