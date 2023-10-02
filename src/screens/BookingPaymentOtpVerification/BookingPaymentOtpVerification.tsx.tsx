import { IonAlert, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonText, IonToast, IonToolbar } from '@ionic/react'
import { closeOutline } from 'ionicons/icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useRecoilValue } from 'recoil'
import { bookingPaymentCardDetailsAtom, bookingPaymentOtpAtom } from '../../atoms/bookingPaymentAtom'
import { userAtom } from '../../atoms/appAtom'
import Settings from '../../helpers/settings'
import { _post } from '../../helpers/api'
import { BookingPaymentCardDetails } from '../../@types/bookings'


const BookingPaymentOtp = () => {
    const history = useHistory()

    const sentOtp = useRecoilValue(bookingPaymentOtpAtom)

    const bookingCardDetails = useRecoilValue(bookingPaymentCardDetailsAtom)

    const { record: user } = useRecoilValue(userAtom)

    const { serverBaseUrl } = Settings()

    const [showAlert, setShowAlert] = useState(false)

    const [pins, setPins] = useState({
        d1: '',
        d2: '',
        d3: '',
        d4: '',
        d5: '',
    })

    const [isLoading, setIsLoading] = useState(false)

    const [showToast, setShowToast] = useState({
        message: '',
        enabled: false
    })





    async function processPaymentConfirmation() {
        setIsLoading(() => true)

        const { d1, d2, d3, d4, d5 } = pins

        if ((d1 || d2 || d3 || d4 || d5) === '') {
            setIsLoading(() => false)
            setShowToast({
                message: 'Incomplete fields',
                enabled: true
            })
            return
        }

        const otpEntered = `${d1}${d2}${d3}${d4}${d5}`

        if (otpEntered !== sentOtp) {
            setIsLoading(() => false)
            setShowToast({
                message: 'Invalid OTP',
                enabled: true
            })
            return
        }

        const payload = {
            card_number: bookingCardDetails.card_number,
            cvv: bookingCardDetails.cvv,
            expiry_month: bookingCardDetails.expiry_month,
            expiry_year: bookingCardDetails.expiry_year,
            fullname: user.name,
            amount: bookingCardDetails.amount,
            phone_number: bookingCardDetails.phone_number,
            email: bookingCardDetails.email,
            tx_ref: bookingCardDetails.tx_ref,
            pin: bookingCardDetails.pin,
            otp: otpEntered
        }
        console.log("🚀 ~ file: BookingPaymentOtpVerification.tsx.tsx:83 ~ processPaymentConfirmation ~ payload:", payload)

        const url = `${serverBaseUrl}/flw/payment`

        const header = { 'Content-Type': 'application/json' }

        try {
            setIsLoading(() => false)
            const { data } = await _post(url, payload, header)

            // Error loading flutterwave transaction
            if (data.name) {
                setIsLoading(() => false)
                setShowToast({
                    message: 'Transaction Error: Server Error. Try again',
                    enabled: true
                })
                console.log("🚀 ~ file: BookingPaymentOtpVerification.tsx.tsx:92 ~ processPaymentConfirmation ~ data:", data)
                return
            }
        }
        catch (error: any) {
            console.log("🚀 ~ file: BookingPaymentOtpVerification.tsx.tsx:96 ~ processPaymentConfirmation ~ error:", error)
            setIsLoading(() => false)
            setShowToast({
                message: 'Invalid OTP',
                enabled: true
            })
        }


        setIsLoading(() => false)
    }

    return (
        <IonPage>
            <IonHeader className='ion-no-border'>
                <IonToolbar>
                    <IonIcon
                        icon={closeOutline}
                        slot='end'
                        size='large'
                        className='ion-margin-horizontal'
                        onClick={() => setShowAlert(() => true)}
                    />
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>

                <IonAlert
                    isOpen={showAlert}
                    message={'Are you sure'}
                    header='Cancel Transaction'
                    subHeader='You are about to cancel your transaction'
                    buttons={
                        [
                            {
                                text: 'Cancel',
                                cssClass: 'ion-text-danger',
                                handler: () => setShowAlert(() => false)
                            },
                            {
                                text: 'Confirm',
                                handler: () => history.push('/apartment_search')
                            }
                        ]
                    }
                    onDidDismiss={() => setShowAlert(() => false)}
                />

                {/* Toast */}
                <IonToast
                    isOpen={showToast.enabled}
                    position='top'
                    duration={3000}
                    onDidDismiss={() => setShowToast({ message: '', enabled: false })}
                    color={'danger'}
                    message={showToast.message}
                />


                <div className="ion-padding mt-1">
                    <p
                        className='my-3 text-muted'>
                        Enter the 6 digits code that you received in your email.
                    </p>
                </div>


                {/* Rest Email */}
                <div className='otp_inputs mt-2'>
                    <IonInput
                        type='text'
                        inputMode='numeric'
                        className="otp_input w-25"
                        maxlength={1}
                        onIonChange={e => setPins({ ...pins, d1: e.detail.value as string })}

                    />
                    <IonInput
                        type='text'
                        inputMode='numeric'
                        className="otp_input w-25"
                        maxlength={1}
                        onIonChange={e => setPins({ ...pins, d2: e.detail.value as string })}

                    />
                    <IonInput
                        type='text'
                        inputMode='numeric'
                        className="otp_input w-25"
                        maxlength={1}
                        onIonChange={e => setPins({ ...pins, d3: e.detail.value as string })}

                    />
                    <IonInput
                        type='text'
                        inputMode='numeric'
                        className="otp_input w-25"
                        maxlength={1}
                        onIonChange={e => setPins({ ...pins, d4: e.detail.value as string })}

                    />
                    <IonInput
                        type='text'
                        inputMode='numeric'
                        className="otp_input w-25"
                        maxlength={1}
                        onIonChange={e => setPins({ ...pins, d5: e.detail.value as string })}

                    />
                </div>

                <div className="ion-text-center text-muted my-5">
                    <small className=''>Send OTP Again</small>
                </div>

                <section className="px-4">
                    <IonButton
                        className='yellow_fill mt-4'
                        size='large'
                        shape="round"
                        onClick={() => processPaymentConfirmation()}
                        expand='block'
                        mode='ios'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Confirm'}
                    </IonButton>
                </section>
            </IonContent>
        </IonPage>
    )
}

export default BookingPaymentOtp