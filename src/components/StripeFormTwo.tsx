import { IonButton, useIonRouter, useIonToast } from '@ionic/react'
import { CardElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { warning } from 'ionicons/icons'
import React, { useState } from 'react'

const StripeFormTwo = () => {

    const elements = useElements()
    const stripe = useStripe()

    const [presentToast, _] = useIonToast()
    const router = useIonRouter()


    const [loading, setLoading] = useState(false)



    async function handleStripePayment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setLoading(() => true)

        try {
            if (!stripe || !elements) {
                handleError('Something went wrong')
                return
            }

            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                redirect: 'if_required'
            })

            if (error){
                handleError(error.message!)
                return
            }

            if (paymentIntent && paymentIntent.status === 'succeeded'){
                console.log(paymentIntent, '<---')

                //TODO: store payment transaction to database
                // TODO: payment_processing
            }

            setLoading(false)
        }
        catch (error: any) {
            handleError('Server Error: could not process payment')
        }
        setLoading(() => false)
    }



    function handleError(message: string) {
        presentToast({
            message,
            color: 'danger',
            icon: warning,
            position: 'top',
            duration: 4000,
        })
        return
    }



    return (
        <form onSubmit={handleStripePayment}>
            <PaymentElement/>
            <IonButton
                className='mt-4 yellow_fill'
                type={'submit'}
                shape={'round'}
                expand='block'
                size='large'
                disabled={loading}
                mode='ios'
            >
                {
                    loading ? 'Processing payment...' : 'Confirm Payment'
                }
            </IonButton>
        </form >
    )
}

export default StripeFormTwo