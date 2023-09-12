import { ApartementItem } from "./apartments"
import { UserCollectionType } from "./users"

export interface BookingItem {
    id: string
    collectionId: string
    collectionName: string
    created: string,
    updated: string
    apartment: string
    guest: string
    expand?: {
        apartment?: ApartementItem
        guest?: UserCollectionType
        host?: UserCollectionType
    }
    checkin_datetime: string
    aditional_info: string
    is_paid: boolean,
    is_canceled: boolean,
    checkout_datetime: string
    host: string
    price: number
    number_of_guests: number,
    transaction_charge: number
    duration_of_stay: number
    guest_phone: string
    reason_for_cancel?: string
    cancellation_charge?: number,
    is_approved?: boolean
    refund_amount?: number
    is_pending: boolean
}


export interface BookingList {
    page: number
    perPage: number
    totalPages: number
    totalItems: number
    items: BookingItem[]
}


export interface BookingFields {
    apartment: string
    guest: string
    checkin_datetime: string
    aditional_info: string
    is_paid: boolean,
    is_canceled: boolean,
    checkout_datetime: string
    host: string
    price: number
    number_of_guests: number
    transaction_charge: number
    duration_of_stay: number
    guest_phone: string
}

// used in BookingPreview for collecting guest booking details
export interface BookingPreviewInputs {
    checkInDate: Date;
    checkOutDate: Date;
    numberOfGuest: number;
    total: number;
    showCheckInModal: boolean;
    showCheckOutModal: boolean;
    dateDifference: number;
    formatedCheckInDate: string;
    formatedCheckOutDate: string;
    toggleGuestEdit: boolean;
    transaction_charge: number
    durationOfStay?: number
    appServiceChargePercentage: number
}