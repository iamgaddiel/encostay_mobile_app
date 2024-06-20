import { useRef, useState } from 'react'

import "./Register.css"
import { IonButton, IonContent, IonDatetime, IonInput, IonLabel, IonModal, IonPage, IonRouterLink, IonSelect, IonSelectOption, useIonRouter } from '@ionic/react'
import SpaceBetween from '../../components/style/SpaceBetween'
import { useHistory } from 'react-router'
import { useForm, SubmitHandler } from "react-hook-form";
import { RegistrationInputs } from '../../@types/auth'
import { useRecoilState } from 'recoil'
import { registrationAtom } from '../../atoms/authAtom'
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS } from '../../legal_bindings'





const Register = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegistrationInputs>();

  //hooks
  const router = useIonRouter()
  const [regFormData, setRegFormData] = useRecoilState(registrationAtom)

  // states
  const [selectedBirthday, setSelectedBirthday] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [showLegalBinding, setShowLegalBinding] = useState({
    enabled: false,
    message: ''
  })


  // refs
  const birthdayModal = useRef<null | HTMLIonModalElement>(null)
  const datepicker = useRef<null | HTMLIonDatetimeElement>(null)




  const onSubmitForm: SubmitHandler<RegistrationInputs> = async (data) => {
    const formData: RegistrationInputs = {
      ...regFormData,
      ...data,
      preferred_currency: "USD",
      name: `${data.first_name} ${data.last_name}`
    }
    setRegFormData(formData)
    router.push('/passwords')
  }


  function processDate(dataTime: string) {
    // const time = dataTime.split('T')[1]
    const date = dataTime.split('T')[0]
    setSelectedBirthday(date)
  }



  return (

    <IonPage>
      <IonContent>

        {/* ======================== T&C Modal Start ========================  */}
        <IonModal isOpen={showLegalBinding.enabled} onDidDismiss={() => setShowLegalBinding({
          enabled: false,
          message: ''
        })} initialBreakpoint={.5} breakpoints={[.5, 7, .9]}>
          <IonContent className='ion-padding'>
            <h4 className="text-muted fw-bold mt-4">Terms and Conditions</h4>
            <div className="text-muted mt-3 text-justify text-wrap" style={{ overflowY: 'auto' }}>
              {showLegalBinding.message}
            </div>
          </IonContent>
        </IonModal>
        {/* ======================== T&C Modal Ends ========================  */}



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

          <form onSubmit={handleSubmit(onSubmitForm)}>

            {/* First Name */}
            <div className='form_inputs my-4  mt-4'>
              <IonLabel>First Name</IonLabel>
              <IonInput
                type='text'
                placeholder='Enter your first name'
                className='mt-2 p-2 mx-0'
                {...register("first_name", { required: true })}
              />
              {errors.first_name && <small className='text-danger'>This field is required</small>}
            </div>

            {/* Last Name */}
            <div className='form_inputs my-4  mt-4'>
              <IonLabel>Last Name</IonLabel>
              <IonInput
                type='text'
                placeholder='Enter your last name'
                className='mt-2 p-2 mx-0'
                {...register("last_name", { required: true })}
              />
              {errors.last_name && <small className='text-danger'>This field is required</small>}
            </div>

            <div className='ion-text-center  mt-4'>
              <small className='text-muted'>Make sure your name matches your name on bank account</small>
              <span className="border w-100 mt-2 border-warning fw-100 mt-3" style={{ display: "block" }}></span>
            </div>

            {/* Email */}
            <div className='form_inputs my-4  mt-4'>
              <IonLabel>Email</IonLabel>
              <IonInput
                type='email'
                placeholder='Enter your email'
                className='mt-2 p-2 mx-0'
                {...register("email", { required: true })}
              />
              {errors.email && <small className='text-danger'>This field is required</small>}
            </div>

            {/* Phone */}
            <div className='form_inputs my-4  mt-4'>
              <IonLabel>Phone</IonLabel>
              <IonInput
                type='tel'
                placeholder='+2345 656 5678'
                className='mt-2 p-2 mx-0'
                {...register("phone", { required: true })}
              />
              {errors.phone && <small className='text-danger'>This field is required</small>}
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
                {...register("birthday", { required: true })}
                readonly
              />
              {errors.email && <small className='text-danger'>This field is required</small>}

              {/* Birthday Modal */}
              <IonModal
                ref={birthdayModal}
                className='birthday_modal'
                isOpen={openModal}
                onDidDismiss={() => setOpenModal(false)}
              >
                <IonContent>
                  <IonDatetime
                    // onIonChange={e => setSelectedBirthday(e.detail?.value as string)}
                    onIonChange={e => processDate(e.detail?.value as string)}
                    color={"warning"}
                    presentation='date'
                    ref={datepicker}
                    showDefaultButtons
                  >
                  </IonDatetime>
                </IonContent>
              </IonModal>
            </div>


            {/* Type */}
            <div className='form_inputs my-4 mt-4  mx-0'>
              <IonLabel className="ion-margin-bottom">Account type</IonLabel>
              <IonSelect placeholder='I am guest' className='ion-margin-top' {...register("account_type", { required: true })}>
                <IonSelectOption value={"guest"}>Guest</IonSelectOption>
                <IonSelectOption value={"host"}>Host</IonSelectOption>
              </IonSelect>
              {errors.account_type && <small className='text-danger'>This field is required</small>}
            </div>


            {/* Currency */}
            {/* <div className='form_inputs my-4 mt-4  mx-0'>
              <IonLabel className="ion-margin-bottom">Preferred Payment</IonLabel>
              <IonSelect placeholder='Select Currency' className='ion-margin-top' {...register('preferred_currency', { required: true })}>
                <IonSelectOption value={"NGN"}>Naira (NGN)</IonSelectOption>
                <IonSelectOption value={"USD"}>Dollar (USD)</IonSelectOption>
              </IonSelect>
              {errors.preferred_currency && <small className='text-danger'>This field is required</small>}
            </div>
            <div className='ion-text-center  mt-4'>
              <small className='text-muted'>Notice! your chosen currency will be used for payments, this can only be updated by contacting customer service.</small>
              <span className="border w-100 mt-2 border-warning fw-100 mt-3" style={{ display: "block" }}></span>
            </div> */}


            <section className="mt-5 ion-text-center text-muted" style={{ padding: ".5rem" }}>
              <small>To use sign up, you need be at least 18. Other people who use Encostay won't see your birthday.</small>
            </section>

            <section className="mt-4 ion-text-center text-muted" style={{ padding: ".5rem" }}>
              <small>
                By selecting Agree and continue below, I agree to Encostay's
                <span className='text-warning ms-2' onClick={() => setShowLegalBinding({
                  enabled: true,
                  message: TERMS_AND_CONDITIONS
                })}>Terms of Service</span>, Payments Terms of Service, <span className="text-warning ms-2" onClick={() => setShowLegalBinding({
                  enabled: true,
                  message: PRIVACY_POLICY
                })}>Privacy Policy</span>,
                and Non discrimination Policy.
              </small>
            </section>
            {/* 
            {
              loading ?
                <IonButton expand='block' className='fill mt-5' shape='round' size="large" type='submit'>
                  <div className='spinner-border'>
                  </div>
                </IonButton>
                :
                <IonButton expand='block' className='fill mt-5' shape='round' size="large" type='submit'>
                  Sign Up
                </IonButton>
            } */}

            <IonButton
              expand='block'
              shape='round'
              className='nm_btn yellow_fill mt-5 w-100 fw-700 p-2 my-5'
              mode='ios'
              type='submit'
            >
              Agree and Continue
            </IonButton>

          </form>

        </section>

      </IonContent>
    </IonPage>
  )
}

export default Register