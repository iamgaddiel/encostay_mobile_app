import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import StripeCheckoutForm from '../StripeCheckoutForm';
import { getSaveData } from '../../helpers/storageSDKs';
import { APP_CONFIG } from '../../helpers/keys';
import { AppConfig } from '../../@types/appConfig';
import Settings from '../../helpers/settings';




const { DEBUG } = Settings()


let stripePromise: Promise<Stripe | null>;

getSaveData(APP_CONFIG).then((config) => {
    const { strp_test_pk, strp_live_pk } = config as AppConfig
    const publicKey = DEBUG ? strp_test_pk : strp_live_pk


    // Make sure to call `loadStripe` outside of a component’s render to avoid
    // recreating the `Stripe` object on every render.
    stripePromise = loadStripe(publicKey);
})
    .catch(err => {
        console.log(err)
    })



export const StripeWrapper = () => {
    // passing the client secret obtained from the server
    const options = {
        clientSecret: '{{CLIENT_SECRET}}',
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <StripeCheckoutForm />
        </Elements>
    )
}
