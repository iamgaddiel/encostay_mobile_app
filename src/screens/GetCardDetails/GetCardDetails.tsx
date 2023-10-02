import { IonButton, IonContent, IonImg, IonInput, IonPage, IonText, IonToast } from '@ionic/react'
import React, { useReducer, useState } from 'react'
import SpaceBetween from '../../components/style/SpaceBetween'
import Card from '../../assets/images/credit-card.png'
import BackHeader from '../../components/BackHeader'
import { BookingPaymentCardDetails } from '../../@types/bookings'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { bookingPaymentCardDetailsAtom } from '../../atoms/bookingPaymentAtom'
import { useHistory } from 'react-router'
import { userAtom } from '../../atoms/appAtom'
import { bookingAtom } from '../../atoms/bookingAtom'
import { getRandomString } from '../../helpers/utils'
import { Action } from '../../@types/action'

const GetCardDetails = () => {
    const history = useHistory()

    const { record: user } = useRecoilValue(userAtom)

    const { guest_phone, price } = useRecoilValue(bookingAtom)

    const [cardDetails, setCardDetails] = useReducer(cardDetailReducer, {
        fullname: '',
        amount: 0,
        card_number: '',
        currency: '',
        cvv: '',
        email: '',
        expiry_month: '',
        expiry_year: '',
        phone_number: '',
        tx_ref: '',
        pin: ''
    })

    const setPaymentCardDetails = useSetRecoilState(bookingPaymentCardDetailsAtom)

    const [showToast, setShowToast] = useState({
        message: '',
        enabled: false
    })


    function getCardDetails() {
        const { card_number, cvv, expiry_month, expiry_year, fullname } = cardDetails
        
        
        // if (card_number || cvv || expiry_month  || expiry_year || fullname === '') {
        //     console.log("🚀 ~ file: GetCardDetails.tsx:49 ~ getCardDetails ~ fullname:", fullname)
        //     console.log("🚀 ~ file: GetCardDetails.tsx:49 ~ getCardDetails ~ expiry_year:", expiry_year)
        //     console.log("🚀 ~ file: GetCardDetails.tsx:49 ~ getCardDetails ~ expiry_month:", expiry_month)
        //     console.log("🚀 ~ file: GetCardDetails.tsx:49 ~ getCardDetails ~ cvv:", cvv)
        //     console.log("🚀 ~ file: GetCardDetails.tsx:49 ~ getCardDetails ~ card_number:", card_number)
        //     setShowToast({
        //         message: 'There are missing fields',
        //         enabled: true
        //     })
        //     return
        // }
        
        if (card_number === '') {
            setShowToast({
                message: 'Card number is missing',
                enabled: true
            })
            return
        }
        
        if (cvv === '') {
            setShowToast({
                message: 'CVV is missing',
                enabled: true
            })
            return
        }
        
        if (expiry_month === '') {
            setShowToast({
                message: 'Expiration Month is missing',
                enabled: true
            })
            return
        }
        
        if (expiry_year === '') {
            setShowToast({
                message: 'Expiration year is missing',
                enabled: true
            })
            return
        }
        
        if (fullname  === '') {
            setShowToast({
                message: 'Full name is missing',
                enabled: true
            })
            return
        }
        
        console.log("🚀 ~ file: GetCardDetails.tsx:45 ~ getCardDetails ~ cardDetails:", cardDetails)
        setPaymentCardDetails({
            amount: price,
            card_number,
            currency: user.account_type,
            cvv,
            email: user.email,
            expiry_month,
            expiry_year,
            fullname,
            phone_number: user.phone,
            tx_ref: `encst-${getRandomString(8)}`,
            pin: ''
        })

        history.push('/get_card_pin')
    }

    return (
        <IonPage>
            <BackHeader backLink='/booking_step_3' title='Card Details' />
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

                {/* card image */}
                <div className="card_image_wrapper">
                    <IonImg src={Card} alt='debit card' />
                </div>

                <section>
                    {/* Card Holder Name */}
                    <IonInput
                        type='text'
                        placeholder='Peter Groove'
                        labelPlacement='stacked'
                        label='Card Holder'
                        className='border p-2 rounded-2'
                        onIonChange={e => setCardDetails({ type: FULLNAME, payload: e.detail.value as string  })}
                    />

                    {/* Cared Number */}
                    <IonInput
                        type='text'
                        placeholder='1234567890'
                        labelPlacement='stacked'
                        label='Card Number'
                        className='border p-2 rounded-2 mt-3'
                        onIonChange={e => setCardDetails({ type: CARD_NUMBER, payload: e.detail.value as string  })}
                    />

                    <div className='d-flex align-items-center justify-content-between mt-4'>
                        {/* Date Inputs */}
                        <div className='d-flex align-items-center'>
                            <div className='w-25'>
                                <IonInput
                                    type='text'
                                    inputMode='numeric'
                                    placeholder='01'
                                    className='border rounded-2'
                                    max={2}
                                    onIonChange={e => setCardDetails({ type: EXPIRY_MONTH, payload: e.detail.value as string })}
                                />
                                <small>Month</small>
                            </div>

                            <div className='w-25 ms-3'>
                                <IonInput
                                    type='text'
                                    inputMode='numeric'
                                    placeholder='2027'
                                    className='border rounded-2'
                                    max={4}
                                    onIonChange={e => setCardDetails({ type: EXPIRY_YEAR, payload: e.detail.value as string  })}
                                />
                                <small>Year</small>
                            </div>
                        </div>

                        {/* Cvv Inputs */}
                        <div className='w-25 ms-3'>
                            <IonInput
                                type='text'
                                inputMode='numeric'
                                placeholder='123'
                                className='border rounded-2'
                                max={3}
                                onIonChange={e => setCardDetails({ type: CVV, payload: e.detail.value as string })}
                            />
                            <small>cvv</small>
                        </div>
                    </div>
                </section>

                <section>
                    <IonButton
                        className='yellow_fill mt-4'
                        size='large'
                        shape="round"
                        onClick={() => getCardDetails()}
                        expand='block'
                        mode='ios'
                    >
                        Confirm
                    </IonButton>
                </section>
            </IonContent>
        </IonPage>
    )
}

export default GetCardDetails


const FULLNAME = 'FULLNAME'
const CARD_NUMBER = 'CARD_NUMBER'
const CVV = 'CVV'
const EXPIRY_MONTH = 'EXPIRY_MONTH'
const EXPIRY_YEAR = 'EXPIRY_YEAR'


function cardDetailReducer(state: BookingPaymentCardDetails, {payload, type}: Action){
    const newState = {...state}

    switch(type){
        case FULLNAME:
            newState.fullname = payload
            break
        
        case CARD_NUMBER:
            newState.card_number = payload 
            break

        case EXPIRY_YEAR:
            newState.expiry_year = payload 
            break

        case EXPIRY_MONTH:
            newState.expiry_month = payload 
            break

        case CVV:
            newState.cvv = payload 
            break

        default:
            return newState;
    }

    return newState
}