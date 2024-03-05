import { atom } from "recoil";
import { AddApartmentFormValue, AddApartmentLocationType, ApartementItem, SearchFilterApartmentType } from "../@types/apartments";
import { APARTMENTS_COLLECTION } from "../helpers/keys";



export const apartmentAtom = atom<ApartementItem>({
    key: APARTMENTS_COLLECTION,
    default: {
        id: "",
        collectionId: "",
        collectionName: "",
        created: "",
        updated: "",
        title: "",
        description: "",
        address: "",
        city: "",
        state_location: "",
        country: "",
        guests: 0,
        bedrooms: 0,
        beds: 0,
        bathrooms: 0,
        checkin: "",
        checkout: "",
        type: "duplex",
        has_wifi: false,
        has_tv_cable: false,
        has_laundry: false,
        has_gym: false,
        has_security: false,
        smoking_allowed: false,
        pets_allowed: false,
        children_allowed: false,
        party_allowed: false,
        additional_rules: "",
        min_nights: 0,
        max_nights: 0,
        price: 0,
        host: "",
        is_available: false,
        max_number_of_children_allowed: 0,
        max_number_of_pets_allowed: 0,
        image_1: '',
        image_2: '',
        image_3: ''
    }
})

export const addApartmentAtom = atom<Partial<AddApartmentFormValue>>({
    key: APARTMENTS_COLLECTION,
    default: {
        title: "",
        description: "",
        address: "",
        city: "",
        state_location: "",
        country: "",
        guests: 0,
        bedrooms: 0,
        beds: 0,
        bathrooms: 0,
        checkin: "",
        checkout: "",
        type: "duplex",
        has_wifi: false,
        has_tv_cable: false,
        has_laundry: false,
        has_gym: false,
        has_security: false,
        smoking_allowed: false,
        pets_allowed: false,
        children_allowed: false,
        party_allowed: false,
        additional_rules: "",
        min_nights: 0,
        max_nights: 0,
        price: 0,
        host: "",
        is_available: false,
        image_1: '',
        image_2: '',
        image_3: ''
    }
})


export const searchFilterAtom = atom<SearchFilterApartmentType>({
    key: 'SEARCH_FILTER',
    default: {
        pets_allowed: false,
        party_allowed: false,
        smoking_allowed: false,
        children_allowed: false,
        // guests: 0,
        has_gym: false,
        has_security: false,
        has_laundry: false,
        has_tv_cable: false,
        has_wifi: false,
        // type: 'duplex',
        // bedrooms: 0,
        price_range: {
            max: 1000,
            min: 1000
        }
    }
})