import { IonButton, IonContent, IonIcon, IonImg, IonInput, IonLabel, IonModal, IonPage, IonRouterLink } from '@ionic/react'
import { useState } from 'react'
import OrSeperator from '../../components/OrSeperator/OrSeperator'
import { useSignal } from '@preact/signals-react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { eyeOffOutline, eyeOutline, logoFacebook } from 'ionicons/icons'



// styles
import "./Login.css"


// images
import Logo from "../../assets/images/login_logo.svg"
import GoogleLogo from "../../assets/images/search.png"

// components
import SpaceBetween from '../../components/style/SpaceBetween'
import RenderPasswordResetModal from '../../components/RenderPasswordResetModal/RenderPasswordResetModal';
import { passwordResetSwipeSignal } from '../../signals/swiperAtom';
import { slides } from '../../signals/passwordResetAtom';
import { useHistory } from 'react-router';




const Login = () => {
  // TODO: fix social media buttons
  // TODO: disable continue button for forget password modal until email is inputed
  // TODO: set onChange event for email input so as to disable continue restriction

  // todo: remove this
  const history = useHistory()


  // 3rd party hooks


  // signal
  const slideCount = useSignal(0)


  // states
  const [showPassword, setShowPassword] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState("")


  // refs


  // effects


  // functions

  function dismissModal(): void {
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
                placeholder='Enter your password'
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
              // type='submit' // todo: uncomment this
              onClick={() => history.push("/home")} // todo: remove this
            >
              Login
            </IonButton>

          </form>
        </section>

        {/* 
        ===================================================
        =====================[ Reset Modal Password========
        ===================================================
        */}
        <IonModal
          isOpen={showModal}
          initialBreakpoint={0.70}
          breakpoints={[0, 0.75, 0.90]}
          onDidDismiss={dismissModal}
        >
          <IonContent className='ion-padding'>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSwiper={swp => passwordResetSwipeSignal.value = swp}
              allowSlidePrev={false}
            >
              {
                slides.value.map((_, indx) => (
                  <SwiperSlide key={indx}>
                    <RenderPasswordResetModal index={indx} />
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