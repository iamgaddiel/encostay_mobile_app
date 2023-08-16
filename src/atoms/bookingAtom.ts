import { atom } from "recoil";
import { BOOKINGS_COLLECTION } from "../helpers/keys";
import { BookingFields } from "../@types/bookings";



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
        number_of_guests: 1
    }
})