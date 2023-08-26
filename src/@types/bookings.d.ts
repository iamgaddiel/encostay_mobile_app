export interface BookingItem {
    id: string
    collectionId: string
    collectionName: string
    created: string,
    updated: string
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
}

// used in BookingPreview for collecting guest booking details
export interface BookingPreviewInputs {
    checkInDate: string;
    checkOutDate: string;
    numberOfGuest: number;
    total: number;
    showCheckInModal: boolean;
    showCheckOutModal: boolean;
    dateDifference: number;
    formatedCheckInDate: string;
    formatedCheckOutDate: string;
    toggleGuestEdit: boolean;
  }