import React from 'react'
import { useStripe, useElements, PaymentElement, CardElement } from '@stripe/react-stripe-js';
import { IonButton } from '@ionic/react';
import { _post } from '../../helpers/api';
import Settings from '../../helpers/settings';


const StripeCheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { serverBaseUrl } = Settings()



    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        const { error, paymentMethod } = await stripe?.createPaymentMethod({
            type: 'card',
            card: elements?.getElement(CardElement)!
        })!

        if (!error) {
            try {
                const { id } = paymentMethod
                const payload = {
                    id,
                    amount: 123456,
                    currency: 'usd'
                }
                const URL = `${serverBaseUrl}/stripe_payment`
                const { data } = await _post(URL, payload)
            } catch (serverError) {
                console.log('There was an error with the payment method', serverError)
            }
        } else {
            console.log(error.message)
        }
    };


    // async function handleSubmit (event: React.FormEvent<HTMLFormElement>){
    //     // We don't want to let default form submission happen here,
    //     // which would refresh the page.
    //     event.preventDefault();

    //     if (!stripe || !elements) {
    //         // Stripe.js hasn't yet loaded.
    //         // Make sure to disable form submission until Stripe.js has loaded.
    //         return;
    //     }

    //     const result = await stripe.confirmPayment({
    //         //`Elements` instance that was used to create the Payment Element
    //         elements,
    //         confirmParams: {
    //             return_url: "https://example.com/order/123/complete",
    //         },
    //     });

    //     if (result.error) {
    //         // Show error to your customer (for example, payment details incomplete)
    //         console.log(result.error.message);
    //     } else {
    //         // Your customer will be redirected to your `return_url`. For some payment
    //         // methods like iDEAL, your customer will be redirected to an intermediate
    //         // site first to authorize the payment, then redirected to the `return_url`.
    //     }
    // };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <IonButton expand='block' disabled={!stripe}>Submit</IonButton>
        </form>
    )
}

export default StripeCheckoutForm
