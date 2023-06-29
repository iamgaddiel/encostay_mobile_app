import { IonButton, IonContent, IonIcon, IonImg, IonInput, IonLabel, IonModal, IonPage, IonRouterLink, IonToast } from '@ionic/react'
import { useState } from 'react'
import OrSeperator from '../../components/OrSeperator/OrSeperator'
import { Swiper, SwiperSlide } from 'swiper/react';
import { eyeOffOutline, eyeOutline, logoFacebook, warning } from 'ionicons/icons'



// styles
import "./Login.css"


// images
import Logo from "../../assets/images/login_logo.svg"
import GoogleLogo from "../../assets/images/search.png"

// components
import SpaceBetween from '../../components/style/SpaceBetween'
import RenderPasswordResetModal from '../../components/RenderPasswordResetModal/RenderPasswordResetModal';
import { useHistory } from 'react-router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { passwordResetSwipeAtom, slidesAtom } from '../../atoms/passwordResetAtom';
import { LoginInputs } from '../../@types/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createApiCollection } from '../../helpers/apiHelpers';
import { authenticate } from '../../helpers/authSDK';
import { saveData } from '../../helpers/storageSDKs';
import { USER } from '../../helpers/keys';
import { userAtom } from '../../atoms/appAtom';
import Home from '../Home/Home';



const Login = () => {
  // TODO: fix social media buttons
  // TODO: disable continue button for forget password modal until email is inputed
  // TODO: set onChange event for email input so as to disable continue restriction
  // TODO: change logo to Background not IonImage

  // todo: remove this
  const history = useHistory()


  // 3rd party hooks
  const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginInputs>();



  // states
  const [showPassword, setShowPassword] = useState(false)

  const [toast, setToast] = useState({ isOpen: false, message: "" })

  const [loading, setLoading] = useState(false)

  // ForgetPassword Modal
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [slideCount, setSlideCount] = useState(0)

  const slides = useRecoilValue(slidesAtom)
  const setPasswordResetSwipe = useSetRecoilState(passwordResetSwipeAtom)
  const { record } = useRecoilValue(userAtom)


  // 




  // refs


  // effects


  // functions

  if (record?.id) return <Home />;

  function dismissModal(): void {
    setSlideCount(0)
    setShowModal(false)
  }


  const onSubmitForm: SubmitHandler<LoginInputs> = async ({ email, password }) => {

    setLoading(true)

    const { is_authenticated, record, token, message: responseMessage } = await authenticate(email, password)

    if (is_authenticated) {
      saveData(USER, { token, record })
      history.push('/home')
    }

    setToast({ message: responseMessage!, isOpen: true, })
    setLoading(false)
  }



  return (
    <IonPage>
      <IonContent className="ion-padding">

        <IonToast
          icon={warning}
          position='bottom'
          message={toast.message}
          isOpen={toast.isOpen}
          onDidDismiss={() => setToast({ isOpen: false, message: "" })}
          color={"danger"}
          duration={4000}
        />

        <section className="login_logo mx-auto mt-5">
          <IonImg src={Logo} />
        </section>


        {/* 
        ===================================================
        =====================[ Login/Signup Toggle ] ======
        ===================================================
        */}
        <section className="login_nav_btns w-50 mx-auto  ion-margin-top mt-4">
          <SpaceBetween>
            <IonButton className="sm_btn brown_fill" shape='round'>
              Login
            </IonButton>
            <IonRouterLink routerDirection='forward' routerLink='/register' className="">
              <small>
                Sign Up
              </small>
            </IonRouterLink>
          </SpaceBetween>
        </section>




        {/* 
        ===================================================
        =====================[ Authentication Form ] ======
        ===================================================
        */}

        <section className='mt-5 ion-padding'>

          <form onSubmit={handleSubmit(onSubmitForm)}>

            {/* Email */}
            <div className='form_inputs ion-margin-vertical'>
              <IonLabel>Email</IonLabel>
              <IonInput
                type='email'
                placeholder='Enter your Email'
                className='mt-2 p-2'
                {...register("email", { required: true })}
              />
              {errors.email && <small className='text-danger'>This field is required</small>}
            </div>

            {/* Password */}
            <div className='form_inputs ion-margin-vertical'>
              <IonLabel>Password</IonLabel>
              <IonInput
                type={showPassword ? "text" : "password"}
                placeholder='Enter your password'
                className='mt-2 p-2'
                {...register("password", { required: true })}
              />
              {errors.password && <small className='text-danger'>This field is required</small>}

              {/* Toggle Password Visibility */}
              <IonIcon
                icon={showPassword ? eyeOutline : eyeOffOutline}
                className='input_icon'
                size='large'
                slot='end'
                onClick={() => setShowPassword(!showPassword)}
              />

              {/* Forget Password  */}
              {
                loading ? (
                  <div className="ion-text-end login_nav_btns">
                    <small
                      className='ion-text-end pt-3'
                    >
                      Forget Password?
                    </small>
                  </div>
                ) : (
                  <div className="ion-text-end login_nav_btns">
                    <small
                      className='ion-text-end pt-3'
                      onClick={() => setShowModal(true)}
                    >
                      Forget Password?
                    </small>
                  </div>
                )
              }
            </div>

            {
              loading ? (
                <IonButton
                  expand='block'
                  shape='round'
                  className='nm_btn yellow_fill mt-5 w-100'
                  mode='ios'
                  type='submit'
                  disabled
                >
                  Processing...
                </IonButton>
              ) : (
                <IonButton
                  expand='block'
                  shape='round'
                  className='nm_btn yellow_fill mt-5 w-100'
                  mode='ios'
                  type='submit'
                >
                  Login
                </IonButton>

              )
            }

          </form>
        </section>

        {/* 
        ===================================================
        =====================[ Reset Modal Password] ======
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
              onSwiper={swp => setPasswordResetSwipe(swp)}
              allowSlidePrev={false}
            >
              {
                slides?.map((screen, indx) => (
                  <SwiperSlide>
                    <RenderPasswordResetModal />
                  </SwiperSlide>
                ))
              }
            </Swiper>

          </IonContent>
        </IonModal>

        {/* 
        ===================================================
        =====================[ Social Media Links] ========
        ===================================================
        */}
        <section className='mt-4'>
          <OrSeperator speratorText='Or login with' className='mx-auto w-75' />


          <SpaceBetween className='mt-4 mx-auto  w-75'>
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