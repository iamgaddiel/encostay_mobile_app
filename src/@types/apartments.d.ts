export type Apartment = "loft" | "micro" | "duplex" | "triplex" | "co-op" | "garden" | "high-rise" | "mid-rise" | "low-rise" | "railroad" | "walk-up" | "single-family" | "condo"
export type MinMaxBounds = { lower: number; upper: number };


export interface FormInputs {
    children: number;
    minMaxNight: MinMaxBounds;
    pets: number;
    smoking_allowed: boolean;
    children_allowed: boolean;
    title: string
    description: string
    address: string
    city: string
    state_location: string
    country: string
    guests: number
    bedrooms: number
    beds: number
    bathrooms: number
    checkin: string
    checkout: string
    type: Apartement
    has_wifi: boolean
    has_tv_cable: boolean
    has_laundry: boolean
    has_gym: boolean
    has_security: boolean
    pets_allowed: boolean
    party_allowed: boolean
    additional_rules: string
    price: number
    images:? string[]
}

export interface ApartementItem {
    id?: string
    collectionId?: string
    collectionName?: string
    created?: string
    updated: string
    title: string
    description: string
    address: string
    city: string
    state_location: string
    country: string
    guests: number
    bedrooms: number
    beds: number
    bathrooms: number
    checkin: string
    checkout: string
    type: Apartement
    has_wifi: boolean
    has_tv_cable: boolean
    has_laundry: boolean
    has_gym: boolean
    has_security: boolean
    smoking_allowed: boolean
    pets_allowed: boolean
    children_allowed: boolean
    party_allowed: boolean
    additional_rules: string
    min_nights: number
    max_nights: number
    price: number
    host: string
    is_available: boolean
    images:? string[]
}



export interface ApartementList {
    page: number
    perPage: number
    totalPages: number
    totalItems: numbr
    items: ApartementItem[]
}
