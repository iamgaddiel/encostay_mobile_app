import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { options } from 'ionicons/icons';
import { stripeKeys } from '../../stripeConfig';
import StripeForm from '../StripeForm';
import { IonModal, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';
import { useRecoilValue } from 'recoil';
import { bookingAtom } from '../../atoms/bookingAtom';
import { getHumanReadableDate } from '../../helpers/utils';
import { useEffect, useState } from 'react';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const { stripePublishableKey, stripeSecretKey } = stripeKeys

const stripePromise = loadStripe(stripePublishableKey!);




type Props = {
    isOpen: boolean
    setCloseModal: React.Dispatch<React.SetStateAction<boolean>>
}


const StripeWrapper = ({ isOpen, setCloseModal }: Props) => {
    const { price, checkin_datetime, checkout_datetime } = useRecoilValue(bookingAtom)
    const options = {
        // passing the client secret obtained from the server
        // clientSecret: stripeSec∏retKey!
        // clientSecret: `${id}_secret_${secstripeSecretKeyret}`
    };

    const [date, setDate] = useState({
        checkin: '',
        checkout: ''
    })


    useEffect(() => {
        const { day: chkDay, monthAbbreviation: chkMnth } = getHumanReadableDate(new Date(checkin_datetime))
        const { day: chkOutDay, monthAbbreviation: chkOutDayMonth } = getHumanReadableDate(new Date(checkout_datetime))
        setDate({ checkin: `${chkDay} ${chkMnth}`, checkout: `${chkOutDay} ${chkOutDayMonth}` })
    }, [isOpen])

    return (
        <Elements stripe={stripePromise}>

            <IonModal
                initialBreakpoint={.3}
                breakpoints={[.3, .5, .7]}
                onDidDismiss={() => setCloseModal(false)}
                isOpen={isOpen}
            >
                <IonContent className='ion-padding'>
                    <IonList lines='none'>
                        <IonItem>
                            <IonLabel className='text-muted'>Price: </IonLabel>
                            <IonLabel className='text-muted' slot='end'>{price}</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel className='text-muted'>Check In: </IonLabel>
                            <IonLabel className='text-muted' slot='end'>{date.checkin}</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel className='text-muted'>Check Out: </IonLabel>
                            <IonLabel className='text-muted' slot='end'>{date.checkout}</IonLabel>
                        </IonItem>
                    </IonList>
                    <StripeForm />
                </IonContent>
            </IonModal>
        </Elements>
    )
}

export default StripeWrapper
