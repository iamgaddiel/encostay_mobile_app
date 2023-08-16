import { atom } from "recoil";
import { ApartementItem } from "../@types/apartments";
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
        images: [""]
    }
})