import { IonButton, IonContent, IonInput, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react'
import React, { useState } from 'react'
import BackHeader from '../../components/BackHeader'
import { BookingPaymentCardDetails } from '../../@types/bookings'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { bookingPaymentCardDetailsAtom, bookingPaymentOtpAtom } from '../../atoms/bookingPaymentAtom'
import { _post } from '../../helpers/api'
import { getRandomString } from '../../helpers/utils'
import { userAtom } from '../../atoms/appAtom'
import { bookingAtom } from '../../atoms/bookingAtom'
import { useHistory } from 'react-router'
import Settings from '../../helpers/settings'

const GetCardPin = () => {

    const history = useHistory()

    const { serverBaseUrl } = Settings()

    const { record: user } = useRecoilValue(userAtom)

    const bookingDetail = useRecoilValue(bookingAtom)

    const setOtp = useSetRecoilState(bookingPaymentOtpAtom)

    const [bookingCardDetails, setBookingCaredDetails] = useRecoilState(bookingPaymentCardDetailsAtom)

    const [pins, setPins] = useState({
        d1: '',
        d2: '',
        d3: '',
        d4: ''
    })

    const [showToast, setShowToast] = useState({
        message: '',
        enabled: false
    })

    const [isLoading, setIsLoading] = useState(false)





    async function handleCardProcessing() {
        setIsLoading(() => true)
        const { d1, d2, d3, d4 } = pins

        if ((d1 || d2 || d3 || d4) === '') {
            setIsLoading(() => false)
            setShowToast({
                message: 'Incomplete fields',
                enabled: true
            })
            return
        }

        const cardPin = `${d1}${d2}${d3}${d4}`

        setBookingCaredDetails({ ...bookingCardDetails, pin: cardPin })

        try {
            const otp = getRandomString(5)
            console.log("🚀 ~ file: GetCardPin.tsx:65 ~ handleCardProcessing ~ otp:", otp)
            const payload = {
                apartment_title: bookingDetail.apartment,
                otp: parseInt(otp),
                contact_email: "encostay@thisrupt.com",
                amount: bookingDetail.price,
                name: user.name!,
                currency_type: "NGN",
                email: user.email
            }

            // Send OTP to user's email
            const url = `${serverBaseUrl}/send_otp`
            const headers = { 'Content-Type': 'application/json' }
            const { data } = await _post(url, payload, headers)

            const { otp: responseOtp, data: responseData } = data as { otp: string, data: { messageId: string }}

            if (responseData.messageId) setOtp(responseOtp);

            setIsLoading(() => false)

            history.push('/verify_booking_transaction_otp')
        }
        catch (err: any) {
            setIsLoading(() => false)
            setShowToast({
                message: 'Server Down',
                enabled: true
            })
            throw new Error('Could not process card')
        }


        setIsLoading(() => false)
    }

    return (
        <IonPage>
            <BackHeader backLink='/get_card_details' title='Card Pin' />
            <IonContent className='ion-padding'>

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
                        Enter the 4 digits card pin.
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
                </div>


                <section className="px-4 mt-5">
                    <IonButton
                        className='yellow_fill mt-4'
                        size='large'
                        shape="round"
                        onClick={() => handleCardProcessing()}
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

export default GetCardPin