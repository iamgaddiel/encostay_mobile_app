import { IonBackButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonItem, IonLabel, IonPage, IonSkeletonText, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import Settings from '../../helpers/settings';
import { _get, _post } from '../../helpers/api';
import { Stripe, loadStripe } from '@stripe/stripe-js'
import { bookingAtom } from '../../atoms/bookingAtom';
import { useRecoilValue } from 'recoil';
import StirpeFormTwo from '../../components/StripeFormTwo';
import { Elements } from '@stripe/react-stripe-js';
import StripeFormTwo from '../../components/StripeFormTwo';


const { serverBaseUrl } = Settings()




const StripePayment: React.FC = () => {

    // TODO: check if user is connected to a network

    const bookingDetail = useRecoilValue(bookingAtom)

    const [stripePromise, setStripePromise] = useState(null)

    const [clientSecret, setClientSecret] = useState<string>('')

    const [showToast, setShowToast] = useState({
        enabled: false,
        message: ''
    })




    useEffect(() => {
        getStripeConfig()
    }, [])

    useEffect(() => {
        getClientSecret()
    }, [])





    async function getStripeConfig() {
        const url = `${serverBaseUrl}/stripe/config`
        const { data } = await _get(url)
        const { publishableKey } = data
        console.log("🚀 ~ getStripeConfig ~ publishableKey:", publishableKey)

        setStripePromise(loadStripe(publishableKey))
    }


    async function getClientSecret() {
        try {
            const amount = parseInt('' + bookingDetail.price) * 100
            const serverUrl = `${serverBaseUrl}/stripe/payments_two`
            const payload = {
                amount,
                description: `payment for rent ${bookingDetail.apartment}`,
            }
            const headers = {
                'Content-Type': 'application/json'
            }

            const { data } = await _post(serverUrl, payload, headers)

            // Unsuccessful payment
            if (!data.message.success) handleError('Server Error: could not process payment');

            setClientSecret(data.message.clientSecret)

            console.log('Payment successful', data.message.clientSecret)
        }
        catch (error: any) {
            handleError('Server Error: could not process payment')
        }
    }


    function handleError(message: string) {
        setShowToast({
            enabled: true,
            message
        })
        return
    }

    220000


    return (
        <IonPage>
            <IonHeader className='ion-no-border'>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref='/booking_step_3' />
                    </IonButtons>
                    <IonTitle>Checkout</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {
                    stripePromise && clientSecret ? (
                        <>
                            <b className='text-muted'>Checkout Summary</b>
                            <div className="card mb-4 p-2 mt-3 border-0">
                                <small>Apartment</small>
                                <p>{bookingDetail.apartment}</p>
                                <hr />
                                <small>Price</small>
                                <p>{bookingDetail.price}</p>
                            </div>

                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <StripeFormTwo />
                            </Elements>
                        </>
                    ) : (
                        <>
                            <IonSkeletonText style={{ width: '100%', height: '50px' }} animated className='rounded' />
                            <IonSkeletonText style={{ width: '100%', height: '20px', marginTop: '5px' }} animated className='rounded' />
                        </>
                    )
                }
            </IonContent>
        </IonPage>
    );
};

export default StripePayment;