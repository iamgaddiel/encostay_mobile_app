import { Prettify } from "./utils";

export type Apartment = "loft" | "micro" | "duplex" | "triplex" | "co-op" | "garden" | "high-rise" | "mid-rise" | "low-rise" | "railroad" | "walk-up" | "single-family" | "condo"

export type MinMaxBounds = { lower: number; upper: number };


// export interface FormInputs {
//     children: number;
//     minMaxNight: MinMaxBounds;
//     pets: number;
//     smoking_allowed: boolean;
//     children_allowed: boolean;
//     title: string
//     description: string
//     address: string
//     city: string
//     state_location: string
//     country: string
//     guests: number
//     bedrooms: number
//     beds: number
//     bathrooms: number
//     checkin: string
//     checkout: string
//     type: Apartment
//     has_wifi: boolean
//     has_tv_cable: boolean
//     has_laundry: boolean
//     has_gym: boolean
//     has_security: boolean
//     pets_allowed: boolean
//     party_allowed: boolean
//     additional_rules: string
//     price: number
//     images: ?string[]
// }

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
    type: Apartment
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
    image_1?: string
    image_2?: string
    image_3?: string
    max_number_of_children_allowed: number
    max_number_of_pets_allowed: number,
}



export interface ApartementList {
    page: number
    perPage: number
    totalPages: number
    totalItems: number
    items: ApartementItem[]
}

export interface ApartmentSearchOptions { perPage: number, page: number, filter?: string }

export type AddApartmentFormValue = Omit<ApartementItem, 'id' | 'collectionId' | 'collectionName' | 'created' | 'updated'>

export type AddApartmentLocationType = Pick<AddApartmentFormValue, 'title' | 'description' | 'address' | 'city' | 'state_location' | 'country'>

export type AddApartmentDetailType = Pick<AddApartmentFormValue, 'beds' | 'bathrooms' | 'price' | 'type' | 'bedrooms'>

export type AddApartmentItemsType = Pick<AddApartmentFormValue, 'has_wifi' | 'has_tv_cable' | 'has_gym' | 'has_laundry' | 'has_security'>

export type AddApartmentRuleType = Pick<AddApartmentFormValue, 'smoking_allowed' | 'pets_allowed' | 'children_allowed' | 'party_allowed' | 'guests'  | 'max_number_of_children_allowed' | 'max_number_of_pets_allowed'>

export type AddApartmentTimeRuleType = Pick<AddApartmentFormValue, 'min_nights' | 'max_nights' | 'checkin' | 'checkout'>

export type AddApartmentImageType = Pick<AddApartmentFormValue, 'image_1' | 'image_2' | 'image_3'>

export type AddExtraApartmentRuleType = Pick<AddApartmentFormValue, 'additional_rules'>

export type SearchFilterApartmentType = Prettify<Partial<Pick<AddApartmentFormValue, 'party_allowed' | 'pets_allowed' | 'smoking_allowed' | 'children_allowed' | 'has_gym' | 'has_laundry' | 'has_security' | 'has_tv_cable' | 'has_wifi'  >> & { price_range: { max: number, min: number}}>

