import { atom } from "recoil";
import { BookingPaymentCardDetails } from "../@types/bookings";
import { OTP } from "../@types/transactions";

export const bookingPaymentCardDetailsAtom = atom<BookingPaymentCardDetails>({
    key: 'BOOKING_PAYMENT_CARD_DETAILS',
    default: {
        fullname: '',
        amount: 0,
        card_number: '',
        currency: '',
        cvv: '',
        email: '',
        expiry_month: '',
        expiry_year: '',
        tx_ref: '',
        phone_number: '',
        pin: ''
    }
})

export const bookingPaymentOtpAtom = atom<OTP>({
    key: 'BOOKING_PAYMENT_CARD_OTP',
    default: ''
})

