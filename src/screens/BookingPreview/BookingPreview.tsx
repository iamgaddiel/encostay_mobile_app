import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import SpaceBetween from "../../components/style/SpaceBetween";

import "./BookPreview.css";

import Image from "../../assets/images/room-pt.png";
import {
  checkmark,
  checkmarkCircleOutline,
  checkmarkDone,
  checkmarkDoneOutline,
  chevronForward,
  informationCircle,
  informationCircleOutline,
  pencilOutline,
  person,
  star,
} from "ionicons/icons";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { apartmentAtom } from "../../atoms/apartmentAtom";
import { getStoredUser } from "../../helpers/authSDK";
import { APP_CONFIG } from "../../helpers/keys";
import { AppConfig } from "../../@types/appConfig";
import { getSaveData } from "../../helpers/storageSDKs";
import { format } from "date-fns";
import { Action } from "../../@types/action";
import { formatDate } from "../../helpers/utils";
import { appConfigAtom } from "../../atoms/appConfigAtom";
import { bookingAtom } from "../../atoms/bookingAtom";

interface BookingInputs {
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

const SET_GUEST_NUMBER = "SET_GUEST_NUMBER";
const TOGGLE_CHECKIN_CALANDER = "TOGGLE_CHECKIN_CALANDER";
const TOGGLE_CHECKOUT_CALANDER = "TOGGLE_CHECKOUT_CALANDER";
const TOGGLE_GUEST_EDIT = "TOGGLE_GUEST_EDIT";
const SET_TOTAL = "SET_TOTAL";
const SET_CHECKIN_DATE = "SET_CHECKIN_DATE";
const SET_CHECKOUT_DATE = "SET_CHECKOUT_DATE";
const SET_DATE_DIFFERENCE = "SET_DATE_DIFFERENCE";

function BookingReducer(state: BookingInputs, { type, payload }: Action) {
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
      updatedState.checkInDate = payload;
      updatedState.formatedCheckInDate = formatDate(payload);
      break;

    case SET_CHECKOUT_DATE:
      updatedState.checkOutDate = payload;
      updatedState.formatedCheckOutDate = formatDate(payload);
      break;

    case SET_DATE_DIFFERENCE:
      updatedState.dateDifference = payload;
      break;

    case TOGGLE_GUEST_EDIT:
      updatedState.toggleGuestEdit = payload;
      break;

    // case SET_CHECKOUT_DATE:
    //     updatedState.showCheckOutModal = payload
    //     break;

    default:
      return updatedState;
  }

  return updatedState;
}

const BookingPreview = () => {
  // const [appConfig, setConfigDetails] = useState<AppConfig | null>(null);

  const selectedApartment = useRecoilValue(apartmentAtom);

  const [bookingDetail, setBookingDetail] = useRecoilState(bookingAtom);

  const appConfig = useRecoilValue(appConfigAtom)

  const [state, setState] = useReducer(BookingReducer, {
    checkInDate: "",
    checkOutDate: "",
    numberOfGuest: 1,
    total: 1,
    showCheckInModal: false,
    showCheckOutModal: false,
    dateDifference: 1,
    formatedCheckInDate: "Jan 3",
    formatedCheckOutDate: "Jan 3",
    toggleGuestEdit: false,
  });

  //  CheckIn

  const checkInCalanderModal = useRef<null | HTMLIonModalElement>(null);

  const checkInDatePicker = useRef<null | HTMLIonDatetimeElement>(null);

  //   CheckOut

  const checkOutCalanderModal = useRef<null | HTMLIonModalElement>(null);

  const checkOutDatePicker = useRef<null | HTMLIonDatetimeElement>(null);

  // Computation
  const [durationOfStay, _] = useState(15); //TODO; get the diffenrence between two dates

  const subTotal = useCallback(calculateSubPrice, [durationOfStay])();

  const total = useCallback(calculateTotalPrice, [subTotal])();


  // ==================================== Functions =================================

  function extractDateFromDateTimeString(
    dataTime: string,
    type: "checkin" | "checkout"
  ) {
    const date = dataTime.split("T")[0];
    if (type === "checkin") setState({ type: SET_CHECKIN_DATE, payload: date });
    if (type === "checkout")
      setState({ type: SET_CHECKOUT_DATE, payload: date });
  }

  function calculateSubPrice() {
    return selectedApartment.price * durationOfStay;;
  }

  function calculateTotalPrice() {
    let totalPrice = appConfig?.service_charge! + subTotal;
    setBookingDetail({
      ...bookingDetail,
      checkin_datetime: state.checkInDate,
      checkout_datetime: state.checkOutDate,
      price: totalPrice,
      number_of_guests: state.numberOfGuest
    })
    return totalPrice
  }

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/apartment/3" mode="ios" />
          </IonButtons>
          <IonTitle>Make Reservation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* =========================== Modals Start ======================== */}
        {/* Checkin Modal */}
        <IonModal
          ref={checkInCalanderModal}
          className="birthday_modal"
          isOpen={state.showCheckInModal}
          onDidDismiss={() =>
            setState({
              type: TOGGLE_CHECKIN_CALANDER,
              payload: false,
            })
          }
        >
          <IonContent>
            <IonDatetime
              // onIonChange={e => setSelectedBirthday(e.detail?.value as string)}
              onIonChange={(e) =>
                extractDateFromDateTimeString(
                  e.detail?.value as string,
                  "checkin"
                )
              }
              color={"warning"}
              presentation="date"
              ref={checkInDatePicker}
              showDefaultButtons
            ></IonDatetime>
          </IonContent>
        </IonModal>

        {/* Checkout Modal */}
        <IonModal
          ref={checkOutCalanderModal}
          className="birthday_modal"
          isOpen={state.showCheckOutModal}
          onDidDismiss={() =>
            setState({
              type: TOGGLE_CHECKIN_CALANDER,
              payload: false,
            })
          }
        >
          <IonContent>
            <IonDatetime
              // onIonChange={e => setSelectedBirthday(e.detail?.value as string)}
              onIonChange={(e) =>
                extractDateFromDateTimeString(
                  e.detail?.value as string,
                  "checkout"
                )
              }
              color={"warning"}
              presentation="date"
              ref={checkOutDatePicker}
              showDefaultButtons
            ></IonDatetime>
          </IonContent>
        </IonModal>
        {/* =========================== Modals Ends ======================== */}

        {/* Home preview */}
        <section className="d-flex mt-3">
          <div
            className="preview_img rounded-4"
            style={{ backgroundImage: `url(${Image})` }}
          ></div>
          <div
            className="ml-5 align-between"
            style={{ alignItems: "space-between" }}
          >
            <big>{selectedApartment.title}</big>
            <IonText className="fs-3 block">
              ₦{selectedApartment.price}/night
            </IonText>
            <span className="d-flex align-items-center">
              <div className="fs-5">
                <IonIcon icon={star} color="warning" /> 4.8
              </div>
              <div className="text-muted mx-4">(234)</div>
            </span>
          </div>
        </section>

        {/* Checkin/checkout dates */}
        <section
          className="my-4 d-flex justify-content-between p-4 rounded-4"
          style={{ backgroundColor: "var(--white-4)" }}
        >
          {/* CheckIn Section */}
          <div
            style={{ flex: 1 }}
            onClick={() =>
              setState({
                type: TOGGLE_CHECKIN_CALANDER,
                payload: true,
              })
            }
          >
            <IonText className="text-muted">Check In</IonText>
            <div
              className="rounded-3 p-2 mt-4 shadow-sm"
              style={{ width: "90px", backgroundColor: "white" }}
            >
              <SpaceBetween>
                <IonText className="text-muted">
                  {state.formatedCheckInDate}
                </IonText>
                <IonIcon icon={chevronForward} />
              </SpaceBetween>
            </div>
          </div>

          {/* Checkout Section */}
          <div
            style={{ flex: 1 }}
            className="mx-3"
            onClick={() =>
              setState({
                type: TOGGLE_CHECKOUT_CALANDER,
                payload: true,
              })
            }
          >
            <IonText className="text-muted">Checkout</IonText>
            <div
              className="rounded-3 p-2 mt-4 shadow-sm"
              style={{ width: "90px", backgroundColor: "white" }}
            >
              <SpaceBetween>
                <IonText className="text-muted">
                  {state.formatedCheckOutDate}
                </IonText>
                <IonIcon icon={chevronForward} />
              </SpaceBetween>
            </div>
          </div>

          {/* Edit Number of Guests Staying*/}
          <div style={{ flex: 2 }}>
            <IonText className="text-muted">Guets</IonText>
            <div className="rounded-3 p-2 mt-2 d-flex justify-content-between">
              <div className="d-flex align-items-center justify-content-between mt-1">
                <IonIcon icon={person} color={"warning"} />{" "}
                {state.toggleGuestEdit ? (
                  <>
                    <IonInput
                      type="text"
                      inputMode="numeric"
                      autofocus
                      value={state.numberOfGuest}
                      className="bg-light mx-2 rounded-3"
                      onIonChange={(e) =>
                        setState({
                          type: SET_GUEST_NUMBER,
                          payload: parseInt(e.detail.value as string),
                        })
                      }
                    />
                    <IonIcon
                      icon={checkmarkCircleOutline}
                      color={"dark"}
                      onClick={() =>
                        setState({ type: TOGGLE_GUEST_EDIT, payload: false })
                      }
                    />
                  </>
                ) : (
                  <>
                    <small className="text-muted"></small>
                    <IonInput
                      type="text"
                      inputMode="numeric"
                      readonly
                      value={state.numberOfGuest}
                    />
                    <IonIcon
                      icon={pencilOutline}
                      color={"dark"}
                      onClick={() =>
                        setState({ type: TOGGLE_GUEST_EDIT, payload: true })
                      }
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Checkout Order Summary */}
        <section
          className="rounded-4 p-4"
          style={{ backgroundColor: "var(--light-red)" }}
        >
          <IonText className="fw-bold text-muted">
            Fee & Tax Details{" "}
            <IonIcon
              icon={informationCircleOutline}
              color={"warning"}
              className="mx-2"
            />
          </IonText>

          <div className="mt-5">
            <SpaceBetween className="my-3">
              <IonText className="text-muted">
                ${selectedApartment.price} x {durationOfStay} night
              </IonText>
              <IonText className="fw-bold-sm">${subTotal}</IonText>
            </SpaceBetween>
            <SpaceBetween className="my-3">
              <IonText className="text-muted">Services Charges</IonText>
              <IonText className="fw-bold-sm">
                ${appConfig?.service_charge}
              </IonText>
            </SpaceBetween>
          </div>

          <div className="w-100 mt-4 border border-warning"></div>

          <SpaceBetween>
            <div className="ion-text-start">
              <IonText className="text-muted">Total</IonText>
            </div>
            <div
              className="shadow-sm p-2 bg-light rounded-3 text-end w-75 mt-3"
              style={{ fontSize: "1.2rem" }}
            >
              <IonText>${total}</IonText>
            </div>
          </SpaceBetween>
        </section>

        <div className="ion-text-center mt-5">
          <IonButton
            className="brown_fill"
            shape="round"
            size="large"
            style={{ width: "12rem", height: "55px" }}
            routerDirection="forward"
            routerLink="/booking_step_1"
          >
            Reserve
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default BookingPreview;
