import React, { useEffect, useState } from 'react'

// Stripe
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementOptions, loadStripe, } from '@stripe/stripe-js';
import { _post } from '../../helpers/api';
import Settings from '../../helpers/settings';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../atoms/appAtom';
import { bookingAtom } from '../../atoms/bookingAtom';
import { AppConfig } from '../../@types/appConfig';
import { APP_CONFIG } from '../../helpers/keys';
import { getSaveData } from '../../helpers/storageSDKs';
import { IonButton, IonContent, IonModal, IonPage } from '@ionic/react';


import './Stripe.css'



const STRIPE_CARD_OPTIONS: StripeCardElementOptions = {
    iconStyle: 'solid',
    style: {
        base: {
            // iconColor: "#c4f0ff",
            iconColor: "#333",
            color: "#333",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#bbb" },
            "::placeholder": { color: "#bbb" }
            // ":-webkit-autofill": { color: "#fce883" },
            // "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#b01030",
            color: "#b01030"
            // iconColor: "#ffc7ee",
            // color: "#ffc7ee"
        }
    }
}


const StripeForm = () => {
    // Stripe
    const stripe = useStripe();

    const elements = useElements();

    const [stripePublishableKey, setStripePublishableKey] = useState('')

    const [isLoading, setLoading] = useState(false)

    const [showToast, setShowToast] = useState({
        enabled: false,
        message: ''
    })

    const { DEBUG, serverBaseUrl } = Settings()

    const { record: user, token: authToken } = useRecoilValue(userAtom)

    const bookingDetail = useRecoilValue(bookingAtom)



    useEffect(() => {
        loadStripeConfig()
    }, [])



    /**
 * Get Stripe Configs
 */
    async function loadStripeConfig() {
        const { strp_live_pk, strp_test_pk } = await getSaveData(APP_CONFIG) as AppConfig
        const stripePublicKey = DEBUG ? strp_test_pk : strp_live_pk
        setStripePublishableKey(() => stripePublicKey)
    }



    function handleError(message: string) {
        setLoading(() => false)
        setShowToast({
            enabled: true,
            message
        })
        return
    }


    async function handleStripePayment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setLoading(() => true)

        const { error, paymentMethod } = await stripe?.createPaymentMethod({
            type: 'card',
            card: elements?.getElement(CardElement)!
        })!

        if (error) handleError('Unable to load stripe card form. Try again');

        try {
            const { id } = paymentMethod!
            const serverUrl = `${serverBaseUrl}/stripe/payment`
            // const serverUrl = `${serverBaseUrl}/stripe_payment`
            const payload = {
                amount: bookingDetail.price,
                id,
            }
            const headers = {
                'Content-Type': 'application/json'
            }

            const { data } = await _post(serverUrl, payload, headers)

            if (!data.success) handleError('Server Error: could not process payment');

            console.log('Payment successful')
        }
        catch (error: any) {
            handleError('Server Error: could not process payment')
        }
        setLoading(() => false)
    }





    return (
        <form onSubmit={handleStripePayment}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={STRIPE_CARD_OPTIONS!} />
                </div>
            </fieldset>
            <IonButton
                className='mt-4 yellow_fill'
                type={'submit'}
                shape={'round'}
                expand='block'
                size='large'
            >
                pay
            </IonButton>
        </form >
    )
}

export default StripeForm