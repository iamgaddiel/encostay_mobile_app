import { IonButton, IonContent, IonImg, IonInput, IonLabel, IonPage, IonText, IonToast, useIonRouter } from '@ionic/react'
import { useEffect, useState } from 'react'

import "../Booking1/Booking1.css"
import BackHeaderNoTitle from '../../components/BackHeaderNoTitle'
import Image from "../../assets/images/twemoji_flag-for-flag-nigeria.svg"

import "./Booking3.css"


import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { bookingAtom } from '../../atoms/bookingAtom'
import { useHistory } from 'react-router'

import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { getSaveData } from '../../helpers/storageSDKs'
import { APP_CONFIG, FLUTTERWAVE_COLLECTION } from '../../helpers/keys'
import { AppConfig } from '../../@types/appConfig'
import { flutterwaveNGNConfig, flutterwaveUSDConfig } from '../../flutterwave'
import Settings from '../../helpers/settings'
import { userAtom } from '../../atoms/appAtom'
import { _post } from '../../helpers/api'
import { createApiCollection } from '../../helpers/apiHelpers';
import { FlutterwaveTransactionItem } from '../../@types/flutterwave_transactions';
import { flutterwaveTransactionIDAtom } from '../../atoms/transactionAtoms';
import StripeWrapper from '../../components/StripeWrapper'









const Booking1 = () => {

    const { DEBUG } = Settings()

    const router = useIonRouter()

    const { record: user, token: authToken } = useRecoilValue(userAtom)

    const [flutterwavePaymentConfig, setFlutterwavePaymentConfig] = useState<typeof flutterwaveNGNConfig>({
        public_key: '',
        tx_ref: '0',
        amount: 0,
        currency: '',
        payment_options: '',
        customer: {
            email: '',
            phone_number: '',
            name: '',
        },
        customizations: {
            title: '',
            description: '',
            logo: '',
        },
    })

    // let handleFlutterwavePayment = useFlutterwave(flutterwavePaymentConfig)

    const [bookingDetail, setBookingDetail] = useRecoilState(bookingAtom)

    const setFlutterwaveTransactionId = useSetRecoilState(flutterwaveTransactionIDAtom)

    const [phone, setPhone] = useState('')

    const [isLoading, setLoading] = useState(false)

    const [showToast, setShowToast] = useState({
        enabled: false,
        message: ''
    })





    useEffect(() => {
        handlePhoneNumberUpdate()
        // loadFlutterwaveConfig()
    }, [phone])



    function handleError(message: string) {
        setLoading(() => false)
        setShowToast({
            enabled: true,
            message
        })
        return
    }


    /**
     * 
     Get Flutterwave Configs
     */
    async function loadFlutterwaveConfig() {
        const { flw_live_pk, flw_live_sk, flw_test_pk, flw_test_sk } = await getSaveData(APP_CONFIG) as AppConfig

        // const FLW_SK = DEBUG ? flw_test_sk : flw_live_sk
        const FLW_PK = DEBUG ? flw_test_pk : flw_live_pk


        const config = {
            public_key: FLW_PK,
            tx_ref: Date.now().toString(),
            amount: bookingDetail.price,
            currency: user.preferred_currency,
            payment_options: 'card',
            customer: {
                email: user.email,
                phone_number: phone,
                name: user.name,
            },
            customizations: {
                title: `Payment for booking an apartment`,
                description: 'N/A',
                logo: 'https://ik.imagekit.io/encostayapp/logo.png?updatedAt=1695141855051',
            },
        };
        console.log("🚀 ~ file: Boking3.tsx:95 ~ loadFlutterwaveConfig ~ config:", config)
        setFlutterwavePaymentConfig(config)
    }


    function handlePhoneNumberUpdate() {
        setBookingDetail({
            ...bookingDetail,
            is_pending: true,
            guest_phone: phone,
            is_paid: true
        })
    }


    async function finishBookingProcess() {
        setLoading(() => true)

        if (phone === '') {
            setLoading(() => false)
            setShowToast({
                enabled: true,
                message: 'Your phone number is required'
            })
            return
        }

        // Flutter is currently suspend as payment method for this app
        // handleFlutterwavePayment({
        //     callback: async (response: any) => {
        //         console.log("🚀 ~ callback: ~ response:", response)
        //         closePaymentModal() // this will close the modal programmatically
        //         setLoading(() => false)


        //         const transactionPayload: FlutterwaveTransactionItem = {
        //             account_type: 'guest',
        //             user: user.id,
        //             transaction_id: response.transaction_id,
        //             ref_id: response.tx_ref,
        //             transaction_type: 'payment',
        //         }

        //         const { isCreated, response: flwTrx } = await createApiCollection(
        //             FLUTTERWAVE_COLLECTION,
        //             transactionPayload,
        //             authToken
        //         )

        //         if (isCreated) {
        //             // FIXME: collectionId not gotten from creating Flutterwave_transaction Collections
        //             setFlutterwaveTransactionId({
        //                 transactionId: response.transaction_id,
        //                 collectionId: flwTrx?.id!
        //             })
        //             setLoading(() => false)
        //             router.push('/payment_processing')
        //         }
        //     },
        //     onClose: () => {
        //         setLoading(() => false)
        //     },
        // });
        setLoading(() => false)
        router.push('/stripe_payment')
    }



    return (
        <IonPage>
            <BackHeaderNoTitle defaultHref='/booking_step_2' />
            <IonContent className='ion-padding' fullscreen>

                <IonToast
                    message={showToast.message}
                    isOpen={showToast.enabled}
                    onDidDismiss={() => setShowToast({
                        enabled: false,
                        message: ''
                    })}
                    duration={4000}
                    position='top'
                    color={'danger'}
                />

                {/* <StripeWrapper
                    isOpen={showStripeCardPayment}
                    setCloseModal={setShowStripeCardPayment}
                /> */}

                <section className="mt-3 booking_process ion-padding-horizontal">
                    <div className="booking_process_stage">1</div>
                    <div className="booking_process_stage">2</div>
                    <div className="booking_process_stage_currnet">Step 3</div>
                    {/* <div className="booking_process_stage">4</div> */}
                </section>

                <section className="mt-5 ion-padding">
                    <IonText className="fs-1">Confirm your phone number</IonText>
                </section>

                <div className="mt-4 shadow-sm rounded-4 p-4">
                    <IonLabel>Phone Number</IonLabel>
                    <div className="d-flex align-items-center">
                        <div className='number_verification_image_wrapper'>
                            <IonImg src={Image} />
                        </div>
                        <IonInput
                            placeholder="070x xxxx xxx"
                            className='border-bottom ml-2'
                            inputMode='numeric'
                            onIonChange={(e) => setPhone(() => e.detail.value as string)}
                        />
                    </div>
                </div>

                <IonButton
                    className='yellow_fill mt-4'
                    size='large'
                    shape="round"
                    onClick={finishBookingProcess}
                    expand='block'
                    mode='ios'
                    disabled={isLoading}
                >
                    {isLoading ? 'Processing...' : 'Confirm'}
                </IonButton>

            </IonContent>
        </IonPage>
    )
}

export default Booking1