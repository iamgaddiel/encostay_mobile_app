import { Action } from "../../@types/action";
import { FormInputs } from "../../@types/apartments";
import { getTimeOrDateFromDateTimeString } from "../../helpers/utils";
import { SET_NUMBER_OF_BEDS, SET_NUMBER_OF_GUESTS, SET_NUMBER_OF_CHILDREN, SET_NUMBER_OF_PETS, SET_NUMBER_OF_ROOMS, SET_NUMBER_OF_BATHROOMS, SET_MIN_MAx_NIGHTS, SET_APARTMENT_TITLE, SET_APARTMENT_ADDRESS, SET_APARTMENT_CITY_LOCATION, SET_APARTMENT_COUNTRY_LOCATION, SET_APARTMENT_DESCRIPTION, SET_APARTMENT_HAS_GYM, SET_APARTMENT_HAS_LAUNDRY, SET_APARTMENT_HAS_SECURITY, SET_APARTMENT_HAS_TV_CABLE, SET_APARTMENT_HAS_WIFI, SET_APARTMENT_STATE_LOCATION, SET_CHILDREN_ALLOWED, SET_PARTY_ALLOWED, SET_PETS_ALLOWED, SET_SMOKING_ALLOWED, SET_APARTMENT_TYPE, SET_CHECKOUT_TIME, SET_APARTMENT_IMAGE_1, SET_APARTMENT_IMAGE_2, SET_APARTMENT_IMAGE_3, SET_ALL_APARTMENT_DETAILS, SET_CHECK_IN_TIME } from "../actions/addApartmentsActions";



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

        case SET_APARTMENT_STATE_LOCATION:
            tempState.state_location = payload
            break;

        case SET_APARTMENT_COUNTRY_LOCATION:
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

        case SET_APARTMENT_HAS_LAUNDRY:
            tempState.has_laundry = payload
            break;

        case SET_SMOKING_ALLOWED:
            tempState.smoking_allowed = payload
            break;

        case SET_PETS_ALLOWED:
            tempState.pets_allowed = payload
            break;

        case SET_CHILDREN_ALLOWED:
            tempState.children_allowed = payload
            break;

        case SET_PARTY_ALLOWED:
            tempState.party_allowed = payload
            break;

        case SET_APARTMENT_TYPE:
            tempState.type = payload
            break;

        case SET_CHECK_IN_TIME:
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