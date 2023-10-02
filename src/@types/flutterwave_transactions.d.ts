import { ApartementItem } from "./apartments"
import { BookingItem } from "./bookings"
import { UserCollectionType } from "./users"


export type FlutterwaveTransactionItem = {
    id?: string
    collectionId?: string
    collectionName?: string
    created?: string
    updated?: string
    user: string
    account_type: 'guest' | 'host'
    transaction_type: 'withdraw' | 'refund' | 'payment'
    ref_id: string
    booking?: string
    transaction_id: number
    expand?: {
        booking?: BookingItem,
        user?: UserCollectionType
    }
}

export interface FlutterwaveTrsnaction {
    page: number
    perPage: number
    totalPages: number
    totalItems: number
    items: FlutterwaveTrsnactionItem[]
}