import React, { useRef, useState } from 'react'

import "./Register.css"
import { IonButton, IonButtons, IonContent, IonDatetime, IonInput, IonLabel, IonModal, IonPage, IonRouterLink, IonSelect, IonSelectOption } from '@ionic/react'
import SpaceBetween from '../../components/style/SpaceBetween'
import { useHistory } from 'react-router'



const Register = () => {
  // TODO: handle accessing datetime value
  // TODO: change ion-select modal btn color and dropdown color
  // TODO: store form data in registrationSignal
  // TODO: 

  //hooks
  const history = useHistory()

  // states
  const [selectedBirthday, setSelectedBirthday] = useState("")
  const [openModal, setOpenModal] = useState(false)

  // refs
  const birthdayModal = useRef<null | HTMLIonModalElement>(null)
  const datepicker = useRef<null | HTMLIonDatetimeElement>(null)

  return (
    <IonPage>
      <IonContent>



        <section className="login_nav_btns w-50 mx-auto  ion-margin-top mt-5 mb-3">
          <SpaceBetween>
            <IonRouterLink routerDirection='forward' routerLink='/login'>
              Log in
            </IonRouterLink>
            <IonButton className="sm_btn brown_fill" shape='round'>
              Sign Up
            </IonButton>
          </SpaceBetween>
        </section>


        <section className='px-3'>


          {/* First Name */}
          <div className='form_inputs my-4  mt-4'>
            <IonLabel>First Name</IonLabel>
            <IonInput type='text' placeholder='Enter your first name' className='mt-2 p-2 mx-0' />
          </div>

          {/* Last Name */}
          <div className='form_inputs my-4  mt-4'>
            <IonLabel>Last Name</IonLabel>
            <IonInput type='text' placeholder='Enter your last name' className='mt-2 p-2 mx-0' />
          </div>

          <div className='ion-text-center  mt-4'>
            <small className='text-muted'>Make sure it matches your name on your government ID</small>
            <span className="border w-100 mt-2 border-warning fw-100 mt-3" style={{ display: "block" }}></span>
          </div>

          {/* Email */}
          <div className='form_inputs my-4  mt-4'>
            <IonLabel>Email</IonLabel>
            <IonInput type='email' placeholder='Enter your first name' className='mt-2 p-2 mx-0' />
          </div>

          {/* Birthday */}
          <div className='form_inputs my-4  mt-4'>
            <IonLabel>Birthday</IonLabel>
            <IonInput
              type='date'
              placeholder='Enter your first name'
              className='mt-2 p-2 mx-0'
              onClick={() => setOpenModal(true)}
              value={selectedBirthday as string}
            />

            {/* Birthday Modal */}
            <IonModal
              ref={birthdayModal}
              className='birthday_modal'
              trigger='birthday_modal'
              isOpen={openModal}
              onDidDismiss={() => setOpenModal(false)}
            >
              <IonContent>
                <IonDatetime
                  // showDefaultTimeLabel={false}
                  // onIonChange={e => setSelectedBirthday(e.detail?.value as string)}
                  onIonChange={e => console.log(e.detail?.value as string)}
                  color={"warning"}
                  presentation='date'
                >
                  <IonButtons slot="buttons" className='d-flex justify-content-between'>
                    {/* Cancel Btn */}
                    <IonButton
                      className='modal_btn modal_outline_btn border-light'
                      expand='block'
                      shape='round'
                      fill='outline'
                      onClick={() => birthdayModal.current?.dismiss()}
                    >
                      Cancel All
                    </IonButton>

                    {/* Save Btn */}
                    <IonButton
                      className='yellow_fill  modal_btn'
                      expand='block'
                      fill='default'
                      shape='round'
                      onClick={() => datepicker.current?.confirm()}
                    >
                      Save
                    </IonButton>
                  </IonButtons>
                </IonDatetime>
              </IonContent>
            </IonModal>

          </div>


          {/* Type */}
          <div className='form_inputs my-4 mt-4  mx-0'>
            <IonLabel className="ion-margin-bottom">How do you want to use Encostay</IonLabel>
            <IonSelect placeholder='I want to book an apartment' className='ion-margin-top'>
              <IonSelectOption value={"guest"}>Book an apartment</IonSelectOption>
              <IonSelectOption value={"owner"}>Offer an apartment</IonSelectOption>
            </IonSelect>
          </div>


          <section className="mt-5 ion-text-center text-muted" style={{ padding: ".5rem" }}>
            <small>To use sign up, you need be at least 18. Other people who use Encostay won't see your birthday.</small>
          </section>

          <section className="mt-4 ion-text-center text-muted" style={{ padding: ".5rem" }}>
            <small>
              By selecting Agree and continue below, I agree to Encostay's
              Terms of Service, Payments Terms of Service, Privacy Policy,
              and Nondiscrimination Policy.
            </small>
          </section>


          <IonButton
            expand='block'
            shape='round'
            className='nm_btn yellow_fill mt-5 w-100 fw-700 p-2 my-5'
            mode='ios'
            routerDirection='forward'
            routerLink='/passwords'
          >
            Agree and Continue
          </IonButton>

        </section>

      </IonContent>
    </IonPage>
  )
}

export default Register