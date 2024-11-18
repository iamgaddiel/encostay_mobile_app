import { ApartementItem } from "./apartments"
import { BookingItem } from "./bookings"
import { UserCollectionType } from "./users"




export type TransactionCreateFields = {
    apartment?: string
    is_in?: boolean
    is_out?: boolean
    amount: number
    host: string
    booking?: string
    reference?: string
}

export type TransactionItem = {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    apartment: string
    is_in: boolean
    is_out: boolean
    amount: number
    host: string
    reference: string
    expand?: {
        apartment?: ApartementItem,
        host?: UserCollectionType
        booking?: BookingItem
    }
}


export interface TransactionList {
    page: number
    perPage: number
    totalPages: number
    totalItems: number
    items: TransactionItem[]
}



interface TransactionModalInterface{
    is_enabled: boolean
    amount: number | string
}


export interface EarningModalType extends TransactionModalInterface{
    imageUrl: string
    location: string
    numberOfGuests: number
    rating: string | number
    title: string
    apartmentPrice: number
}

export interface WithdrawModalType extends TransactionModalInterface{
    amountWithdrew: number
    bank: Bank
}

export type Bank = {
    account_name: string
    bank_name: string
    bvn: string
    account_number: string
}

export type OTP = string

