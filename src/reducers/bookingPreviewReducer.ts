import { isAfter, isBefore } from "date-fns";
import { Action } from "../@types/action";
import { BookingPreviewInputs } from "../@types/bookings";
import { formatDate, getDateDiffInDays } from "../helpers/utils";
import { SET_GUEST_NUMBER, TOGGLE_CHECKIN_CALANDER, TOGGLE_CHECKOUT_CALANDER, SET_TOTAL, SET_CHECKIN_DATE, SET_CHECKOUT_DATE, SET_DATE_DIFFERENCE, TOGGLE_GUEST_EDIT, SET_TRANSACTION_CHARGE, SET_APP_SERVICE_CHARGE_PERCENTAGE } from "./actions/bookingPreviewActions";



export default function BookingPreviewReducer(state: BookingPreviewInputs, { type, payload }: Action) {
  let updatedState = { ...state };

  switch (type) {
    case SET_GUEST_NUMBER:
      updatedState.numberOfGuest = payload;
      break;

    case TOGGLE_CHECKIN_CALANDER:
      updatedState.showCheckInModal = payload;
      break;

    case TOGGLE_CHECKOUT_CALANDER:
      updatedState.showCheckOutModal = payload;
      break;

    case SET_TOTAL:
      updatedState.total = payload;
      break;

    case SET_CHECKIN_DATE:
      const checkinDateObefct = new Date(payload)
      const currentCheckOutDate = new Date(updatedState.checkOutDate)

      updatedState.durationOfStay = getDateDiffInDays(checkinDateObefct, currentCheckOutDate)
      updatedState.checkInDate = payload;
      updatedState.formatedCheckInDate = formatDate(payload);
      break;

    case SET_CHECKOUT_DATE:
      const currentCheckinDate = new Date(updatedState.checkInDate)
      const checkoutDateObject = new Date(payload)

      updatedState.durationOfStay = getDateDiffInDays(currentCheckinDate, checkoutDateObject)
      updatedState.checkOutDate = payload;
      updatedState.formatedCheckOutDate = formatDate(payload);
      break;

    case SET_DATE_DIFFERENCE:
      updatedState.dateDifference = payload;
      break;

    case TOGGLE_GUEST_EDIT:
      updatedState.toggleGuestEdit = payload;
      break;

    case SET_TRANSACTION_CHARGE:
      updatedState.transaction_charge = payload;
      break;

    case SET_APP_SERVICE_CHARGE_PERCENTAGE:
      updatedState.appServiceChargePercentage = payload;
      break;

    default:
      return updatedState;
  }

  return updatedState;
}