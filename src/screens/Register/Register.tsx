import { useEffect, useRef, useState } from 'react'

import "./Register.css"
import { IonButton, IonCol, IonContent, IonDatetime, IonGrid, IonInput, IonInputPasswordToggle, IonItem, IonModal, IonRow, IonSelect, IonSelectOption, useIonAlert, useIonRouter, useIonToast } from '@ionic/react'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { RegistrationInputs } from '../../@types/auth'
import { PRIVACY_POLICY, TERMS_AND_CONDITIONS } from '../../legal_bindings'
import { createApiCollection } from '../../helpers/apiHelpers'
import { USERS_COLLECTION, WALLETS_COLLECTION } from '../../helpers/keys';
import Loader from '../../components/Loader';





type Props = {
  switchScreen:  React.Dispatch<React.SetStateAction<"login" | "register">>
}


const Register: React.FC<Props> = ({ switchScreen }) => {

  const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm<RegistrationInputs>(
    {
      defaultValues: {
        birthday: ""
      }
    }
  );
  const birthdayValue = watch("birthday");

  //hooks
  const router = useIonRouter()
  const [presentAlert, dismissAlert] = useIonAlert()
  const [presentToast] = useIonToast()


  // states
  const [openModal, setOpenModal] = useState(false)
  const [showLegalBinding, setShowLegalBinding] = useState({
    enabled: false,
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)


  // refs
  const birthdayModalRef = useRef<null | HTMLIonModalElement>(null)
  const datepickerRef = useRef<null | HTMLIonDatetimeElement>(null)







  const onSubmitForm: SubmitHandler<RegistrationInputs> = async (data) => {
    setLoading(true)

    const formData: RegistrationInputs = {
      ...data,
      preferred_currency: "NGN",
      emailVisibility: true,
      name: `${data.first_name} ${data.last_name}`
    }


    const { isCreated, response, error } = await createApiCollection(USERS_COLLECTION, formData)

    // Check if any field is has errors.
    if (error?.email) {
      displayMessage(error?.email?.message)
      return;
    }
    if (error?.first_name) {
      displayMessage(error?.first_name?.message)
      return;
    }
    if (error?.last_name) {
      displayMessage(error?.last_name?.message)
      return;
    }
    if (error?.phone) {
      displayMessage(error?.phone?.message)
      return;
    }
    if (error?.birthday) {
      displayMessage(error?.birthday?.message)
      return;
    }
    if (error?.account_type) {
      displayMessage(error?.account_type?.message)
      return;
    }
    if (error?.password) {
      displayMessage(error?.password?.message)
      return;
    }
    if (!isCreated && error?.passwordConfirm) {
      displayMessage(error?.passwordConfirm?.message)
      return;
    }
    console.log("🚀 ~ constonSubmitForm:SubmitHandler<RegistrationInputs>= ~ response?.id!:", response?.id!)

    // Create Wallet For Host Users
    if (data.account_type === 'host') {
      const walletCreationPayload = { host: response?.id! }
      const { isCreated: walletIsCreated, response: walletCreateResponse, error: walletCreatedError } = await createApiCollection(WALLETS_COLLECTION, walletCreationPayload)
      if (!walletIsCreated) {
        // TODO: check if wallet is not created
        console.log(error)
        return
      }
    }

    setLoading(false)
    presentAlert(
      "Account created successfully",
      [
        {
          text: 'Okay',
          role: 'Continue',
          cssClass: 'ion-text-lowercase',
          handler: () => switchScreen("login")
        }
      ]
    )
  }



  function displayMessage(errorMessage: string) {
    displayToast(errorMessage, "danger")
    setLoading(false)
    return
  }



  const processDate = (dateTime: string) => {
    const selectedDate = dateTime.split('T')[0] // date
    setValue("birthday", selectedDate);
    setOpenModal(false);
  };


  function displayToast(message: string, type: "danger" | "error") {
    presentToast({
      color: type,
      message,
      position: "top",
      duration: 4000,
    })
  }


  return (
    <>
      <Loader isOpen={loading} />
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <IonGrid>
          {/* First Name */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="6" sizeLg="6">
              <IonItem lines='none' className='ion-no-padding'>
                <IonInput
                  type='text'
                  placeholder='Enter your first name'
                  label='First Name'
                  labelPlacement='floating'
                  {...register("first_name", {
                    required: {
                      value: true,
                      message: "This field is required"
                    }
                  })}
                />
              </IonItem>
              {errors.first_name && <small className='text-danger'>{errors.first_name.message}</small>}
            </IonCol>
          </IonRow>
          {/* Last Name */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="6" sizeLg="6">
              <IonItem lines='none' className='ion-no-padding'>
                <IonInput
                  type='text'
                  placeholder='Enter your last name'
                  className='mt-2 p-2 mx-0'
                  label='Last Name'
                  labelPlacement='floating'
                  {...register("last_name", {
                    required: {
                      value: true,
                      message: "This field is required"
                    }
                  })}
                />
              </IonItem>
              {errors.last_name && <small className='text-danger'>{errors.last_name.message}</small>}
              <div className='ion-text-start  mt-4'>
                <small className='text-muted'>Make sure your name matches your name on bank account</small>
                <span className="border w-100 mt-2 border-warning fw-100 mt-3" style={{ display: "block" }}></span>
              </div>
            </IonCol>
          </IonRow>
          {/* Email */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="6" sizeLg="6">
              <IonItem lines='none' className="ion-no-padding">
                <IonInput
                  type='email'
                  placeholder='Enter your email'
                  label='Email'
                  labelPlacement='floating'
                  inputMode='email'
                  {...register("email", {
                    required: {
                      value: true,
                      message: "This field is required"
                    }
                  })}
                />
              </IonItem>
              {errors.email && <small className='text-danger'>{errors.email.message}</small>}
            </IonCol>
            {/* Phone */}
          </IonRow>
          {/* Phone */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="6" sizeLg="6">
              <IonItem lines='none' className='ion-no-padding'>
                <IonInput
                  type='tel'
                  placeholder='+2345 656 5678'
                  label='Phone'
                  labelPlacement='floating'
                  inputMode='tel'
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "This field is required"
                    }
                  })}
                />
              </IonItem>
              {errors.phone && <small className='text-danger'>{errors.phone.message}</small>}
            </IonCol>
          </IonRow>
          {/* Birthday */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="6" sizeLg="6">
              <IonItem lines='none' className='ion-no-padding'>
                <Controller
                  name="birthday"
                  control={control}
                  rules={{
                    required: { value: true, message: "This field is required" },
                  }}
                  render={({ field }) => (
                    <>
                      <IonInput
                        {...field}
                        readonly
                        type="text"
                        placeholder="Select your birthday"
                        label="Birthday"
                        labelPlacement="floating"
                        onClick={() => setOpenModal(true)}
                        value={birthdayValue || ""}
                      />
                      <IonModal
                        ref={birthdayModalRef}
                        isOpen={openModal}
                        onDidDismiss={() => setOpenModal(false)}
                        className="birthday_modal"
                      >
                        <IonContent>
                          <IonDatetime
                            ref={datepickerRef}
                            presentation="date"
                            onIonChange={(e) => processDate(e.detail.value as string)}
                            showDefaultButtons
                            color={"warning"}
                          />
                        </IonContent>
                      </IonModal>
                    </>
                  )}
                />
              </IonItem>
              {errors.birthday && <small className='text-danger'>{errors.birthday?.message}</small>}

              <section className="ion-text-start text-muted">
                <small>To use sign up, you need be at least 18. Other people who use Encostay won't see your birthday.</small>
                <span className="border w-100 mt-2 border-warning fw-100 mt-3" style={{ display: "block" }}></span>
              </section>
            </IonCol>
          </IonRow>
          {/* Account Type */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="6" sizeLg="6">
              <IonItem lines='none' className='ion-no-padding'>
                {/* Type */}
                <IonSelect
                  placeholder='I am guest'
                  label='Account Type'
                  labelPlacement='floating'
                  color={"warning"}
                  {...register("account_type", {
                    required: {
                      value: true,
                      message: "This field is required"
                    }
                  })}
                >
                  <IonSelectOption value={"guest"} className='ion-text-lowercase'>Guest</IonSelectOption>
                  <IonSelectOption value={"host"} className='ion-text-lowercase'>Host</IonSelectOption>
                </IonSelect>
              </IonItem>
              {errors.account_type && <small className='text-danger'>{errors.account_type?.message}</small>}
            </IonCol>
          </IonRow>
          {/* password */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="6" sizeLg="6">
              <IonItem lines='none' className='ion-no-padding'>
                <IonInput
                  type="password"
                  placeholder='..............'
                  label='Password'
                  labelPlacement='floating'
                  {...register("password", {
                    required: {
                      value: true,
                      message: "This field is required"
                    },
                    minLength: {
                      value: 8,
                      message: "password must be at least 8 characters"
                    },
                    maxLength: {
                      value: 15,
                      message: "password must be at most 15 characters"
                    }
                  })}
                >
                  <IonInputPasswordToggle slot='end' color={"warning"} />
                </IonInput>
              </IonItem>
              {errors.password && <small className='text-danger'>{errors.password.message}</small>}
            </IonCol>
          </IonRow>
          {/* Confirm  password */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="6" sizeLg="6">
              <IonItem lines='none' className='ion-no-padding'>
                <IonInput
                  type="password"
                  label='Confirm Password'
                  labelPlacement='floating'
                  placeholder='..............'
                  {...register("passwordConfirm", {
                    required: {
                      value: true,
                      message: "This field is required"
                    },
                    minLength: {
                      value: 8,
                      message: "password must be at least 8 characters"
                    },
                    maxLength: {
                      value: 15,
                      message: "password must be at most 15 characters"
                    }
                  })}
                >
                  <IonInputPasswordToggle slot='end' color={"warning"} />
                </IonInput>
              </IonItem>
              {errors.passwordConfirm && <small className='text-danger '>{errors.passwordConfirm.message}</small>}
            </IonCol>
          </IonRow>
          {/* T & C */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="6" sizeLg="6">
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
            </IonCol>
          </IonRow>
          {/* Submit button */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="2" sizeLg="3">
              <IonItem lines='none' className='ion-no-padding'>
                <IonButton
                  expand='block'
                  shape='round'
                  className='nm_btn yellow_fill mt-3 w-100 fw-700'
                  mode='ios'
                  type='submit'
                >
                  Continue
                </IonButton>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </form >
    </>
  )
}

export default Register