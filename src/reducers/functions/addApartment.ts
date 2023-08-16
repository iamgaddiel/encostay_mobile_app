import { Action } from "../../@types/action";
import { FormInputs } from "../../@types/apartments";
import { getTimeOrDateFromDateTimeString } from "../../helpers/utils";
import { SET_NUMBER_OF_BEDS, SET_NUMBER_OF_GUESTS, SET_NUMBER_OF_CHILDREN, SET_NUMBER_OF_PETS, SET_NUMBER_OF_ROOMS, SET_NUMBER_OF_BATHROOMS, SET_MIN_MAx_NIGHTS, SET_APARTMENT_TITLE, SET_APARTMENT_ADDRESS, SET_APARTMENT_CITY_LOCATION, SET_APARTMENT_COUNTRY_LOCATITION, SET_APARTMENT_DESCRIPTION, SET_APARTMENT_HAS_GYM, SET_APARTMENT_HAS_LAUNDARY, SET_APARTMENT_HAS_SECURITY, SET_APARTMENT_HAS_TV_CABLE, SET_APARTMENT_HAS_WIFI, SET_APARTMENT_STATE_LOCATITION, SET_CHILDREN_ALLOWED, SET_PARTY_ALLOWED, SET_PETS_ALLOWED, SET_SMOKING_ALLOWED, SET_APARTMENT_TYPE, SET_CHECIN_TIME, SET_CHECKOUT_TIME, SET_APARTMENT_IMAGE_1, SET_APARTMENT_IMAGE_2, SET_APARTMENT_IMAGE_3, SET_ALL_APARTMENT_DETAILS } from "../actions/addApartmentsActions";



export function addApartmentReducer(state: FormInputs, { type, payload }: Action) {
    let tempState = { ...state };

    switch (type) {
        case SET_NUMBER_OF_BEDS:
            tempState.beds = payload;
            break;

        case SET_NUMBER_OF_GUESTS:
            tempState.guests = payload;
            break;

        case SET_NUMBER_OF_CHILDREN:
            tempState.children = payload;
            break;

        case SET_NUMBER_OF_PETS:
            tempState.pets = payload;
            break;

        case SET_NUMBER_OF_ROOMS:
            tempState.bedrooms = payload;
            break;

        case SET_NUMBER_OF_BATHROOMS:
            tempState.bathrooms = payload;
            break;

        case SET_MIN_MAx_NIGHTS:
            tempState.minMaxNight.lower = payload?.lower!;
            tempState.minMaxNight.upper = payload?.upper!;
            break;

        case SET_APARTMENT_TITLE:
            tempState.title = payload
            break;

        case SET_APARTMENT_DESCRIPTION:
            tempState.description = payload
            break;

        case SET_APARTMENT_ADDRESS:
            tempState.address = payload
            break;

        case SET_APARTMENT_CITY_LOCATION:
            tempState.city = payload
            break;

        case SET_APARTMENT_TITLE:
            tempState.title = payload
            break;

        case SET_APARTMENT_STATE_LOCATITION:
            tempState.state_location = payload
            break;

        case SET_APARTMENT_COUNTRY_LOCATITION:
            tempState.country = payload
            break;

        case SET_APARTMENT_HAS_WIFI:
            tempState.has_wifi = payload
            break;

        case SET_APARTMENT_HAS_TV_CABLE:
            tempState.has_tv_cable = payload
            break;

        case SET_APARTMENT_HAS_SECURITY:
            tempState.has_security = payload
            break;

        case SET_APARTMENT_HAS_GYM:
            tempState.has_gym = payload
            break;

        case SET_APARTMENT_HAS_LAUNDARY:
            tempState.has_laundry = payload
            break;

        case SET_SMOKING_ALLOWED:
            tempState.has_laundry = payload
            break;

        case SET_PETS_ALLOWED:
            tempState.has_laundry = payload
            break;

        case SET_CHILDREN_ALLOWED:
            tempState.has_laundry = payload
            break;

        case SET_PARTY_ALLOWED:
            tempState.has_laundry = payload
            break;

        case SET_APARTMENT_TYPE:
            tempState.type = payload
            break;

        case SET_CHECIN_TIME:
            const checkinTime = getTimeOrDateFromDateTimeString(payload)
            tempState.checkin = checkinTime
            break;

        case SET_CHECKOUT_TIME:
            const checkoutTime = getTimeOrDateFromDateTimeString(payload)
            tempState.checkout = checkoutTime
            break;

        case SET_APARTMENT_IMAGE_1:
            // tempState.images?.push(payload)
            tempState.images![0] = payload
            break;

        case SET_APARTMENT_IMAGE_2:
            // tempState.images?.push(payload)
            tempState.images![1] = payload
            break;
            
            case SET_APARTMENT_IMAGE_3:
                // tempState.images?.push(payload)
            tempState.images![2] = payload
            break;

        case SET_ALL_APARTMENT_DETAILS:
            tempState = {...tempState, ...payload}
            break

        default:
            return tempState;
    }

    return tempState;
}