import { atom } from "recoil";
import { BOOKINGS_COLLECTION } from "../helpers/keys";
import { BookingFields, BookingItem } from "../@types/bookings";



export const bookingAtom  = atom<BookingFields>({
    key: BOOKINGS_COLLECTION,
    default: {
        apartment: "",
        guest: "",
        checkin_datetime: "",
        aditional_info: "",
        is_paid: false,
        is_canceled: false,
        checkout_datetime: "",
        host: "",
        price: 0,
        number_of_guests: 1,
        transaction_charge: 0,
        duration_of_stay: 1,
        guest_phone: '',
        is_pending: true
    }
})

export const selectedApartmentIdAtom = atom({
    key: 'SELECTED_BOOKING_APARTMENT_ID',
    default: ''
})  


export const appartmnetBookingAtom = atom<BookingItem>({
    key: 'BOOKING_ITEM',
    default: {
        id: '',
        collectionId: "",
        collectionName: "",
        created: "",
        updated: "",
        apartment: "",
        guest: "",
        checkin_datetime: "",
        aditional_info: "",
        is_paid: false,
        is_canceled: false,
        checkout_datetime: "",
        host: "",
        price: 0,
        number_of_guests: 0,
        transaction_charge: 0,
        duration_of_stay: 0,
        guest_phone: "",
        refund_amount: 0,
        is_pending: false
    }
})

