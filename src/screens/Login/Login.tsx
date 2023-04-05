import { IonButton, IonButtons, IonContent, IonIcon, IonImg, IonInput, IonLabel, IonPage, IonRouterLink } from '@ionic/react'
import React, { useRef, useState } from 'react'


// styles
import "./Login.css"


// images
import Logo from "../../assets/images/login_logo.svg"
import SpaceBetween from '../../components/style/SpaceBetween'
import { eyeOffOutline, eyeOutline, logoFacebook, logoGoogle } from 'ionicons/icons'
import OrSeperator from '../../components/OrSeperator/OrSeperator'
import { effect, useSignal } from '@preact/signals-react'



const Login = () => {
  console.log("rendered")
  // states
  const [showPassword, setShowPassword] = useState(false)


  // refs


  // effects


  // functions





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
            <IonRouterLink routerDirection='forward' routerLink='/singup'>
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
                <IonRouterLink
                  className='ion-text-end pt-3'
                  routerLink="/forget_password"
                  routerDirection='forward'
                >
                  Forget Password?
                </IonRouterLink>
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


        <section className='mt-4'>
          <OrSeperator speratorText='Or login with' className='mx-auto w-75' />


          <SpaceBetween className='mt-3 mx-auto ion-padding-horizontal'>
            <IonButton shape='round' className='nm_btn' color={'light'} >
              <IonIcon icon={logoGoogle} slot='start' size='large' />
              Google
            </IonButton>
            <IonButton shape='round' className='nm_btn' color={"primary"}>
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