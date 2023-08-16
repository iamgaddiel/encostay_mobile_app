import { IonAlert, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonLabel, IonLoading, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RegistrationInputs } from '../../@types/auth'
import { createApiCollection } from '../../helpers/apiHelpers'
import { useHistory } from 'react-router'
import { useRecoilState, useRecoilValue } from 'recoil'
import { registrationAtom } from '../../atoms/authAtom'
import { USRS_COLLECTION } from '../../helpers/keys'



const Passwords = () => {
    // TODO: change button font to Nunito Sans

    const history = useHistory()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegistrationInputs>();
    const regFormData = useRecoilValue(registrationAtom)

    const [loading, setLoading] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [toastIsOpen, setToastIsOpen] = useState(false)
    const [showAlert, setShowAleart] = useState(false)


    const onSubmitForm: SubmitHandler<RegistrationInputs> = async (data) => {
        setLoading(true)

        const formData = { ...regFormData, ...data }
        const { isCreated, response, error } = await createApiCollection(USRS_COLLECTION, formData)


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
        if (error?.email) {
            displayMessage(error?.email?.message)
            return;
        }
        if (error?.birthday) {
            displayMessage(error?.birthday?.message)
            return;
        }
        if (error?.account_type) {
            displayMessage(error?.email?.message)
            return;
        }
        if (error?.password) {
            displayMessage(error?.password?.message)
            return;
        }
        if (!isCreated && error?.passwordConfirm) {
            displayMessage(error?.password?.message)
            return;
        }


        setLoading(false)
        setShowAleart(true)
    }


    function displayMessage(errorMessage: string) {
        setToastMessage(errorMessage)
        setLoading(false)
        setToastIsOpen(true)
    }


    return (
        <IonPage>
            <IonHeader className='ion-no-border'>
                <IonToolbar className=''>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/register" />
                    </IonButtons>
                    <IonTitle className=''>Set Password</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className='ion-padding'>
                <IonAlert
                    message={"Account created successfully"}
                    header='Success'
                    isOpen={showAlert}
                    buttons={[
                        {
                            text: 'Okay',
                            role: 'confirm',
                            handler: () => history.push('/login')
                        }
                    ]}
                />
                <IonToast
                    message={toastMessage}
                    isOpen={toastIsOpen}
                    onDidDismiss={() => setToastIsOpen(false)}
                    color={"danger"}
                    position='bottom'
                    duration={4000}
                />

                <IonLoading
                    message={"Processing your request"}
                    isOpen={loading}
                    onDidDismiss={() => setLoading(false)}
                    spinner={"circular"}
                />


                <form action="" onSubmit={handleSubmit(onSubmitForm)}>
                    <section className='mt-3 ion-padding'>
                        {/* password */}
                        <div className='form_inputs my-4  mt-4'>
                            <IonLabel>Password</IonLabel>
                            <IonInput
                                type='password'
                                placeholder='..............' className='mt-2 p-2 mx-0'
                                {...register("password", { required: true })}
                            />
                            {errors.password && <small className='text-danger'>This field is required</small>}
                        </div>
                        {/* confirm password */}
                        <div className='form_inputs my-4  mt-4'>
                            <IonLabel>Confirm Password</IonLabel>
                            <IonInput
                                type='password'
                                placeholder='..............' className='mt-2 p-2 mx-0'
                                {...register("passwordConfirm", { required: true })}
                            />
                            {errors.passwordConfirm && <small className='text-danger'>This field is required</small>}
                        </div>
                        <div className='text-muted'>
                            <small>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae quam nostrum blanditiis aliquid!</small>
                        </div>
                    </section>

                    <section className="mt-4 ion-padding">
                        <IonButton
                            expand='block'
                            shape='round'
                            className='nm_btn yellow_fill mt-5 w-100 fw-700'
                            mode='ios'
                            type='submit'
                        >
                            Continue
                        </IonButton>
                    </section>
                </form>
            </IonContent>
        </IonPage>
    )
}

export default Passwords