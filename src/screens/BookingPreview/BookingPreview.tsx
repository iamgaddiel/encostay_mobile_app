import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonInput,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import {
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import SpaceBetween from "../../components/style/SpaceBetween";

import "./BookPreview.css";

import Image from "../../assets/images/room-pt.png";
import {
  checkmarkCircleOutline,
  chevronForward,
  informationCircleOutline,
  pencilOutline,
  person,
  star,
} from "ionicons/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { apartmentAtom } from "../../atoms/apartmentAtom";
import { isAfter, isBefore, isEqual } from "date-fns";
import { appConfigAtom } from "../../atoms/appConfigAtom";
import { bookingAtom, selectedApartmentIdAtom } from "../../atoms/bookingAtom";
import {
  SET_GUEST_NUMBER,
  TOGGLE_CHECKIN_CALANDER,
  TOGGLE_CHECKOUT_CALANDER,
  SET_CHECKIN_DATE,
  SET_CHECKOUT_DATE,
  TOGGLE_GUEST_EDIT,
  SET_TRANSACTION_CHARGE,
  SET_APP_SERVICE_CHARGE_PERCENTAGE,
  SET_TOTAL,
} from "../../reducers/actions/bookingPreviewActions";
import BookingPreviewReducer from "../../reducers/bookingPreviewReducer";
import { useHistory, useParams } from "react-router";
import { AppConfig } from "../../@types/appConfig";
import { getSaveData } from "../../helpers/storageSDKs";
import { APP_CONFIG } from "../../helpers/keys";




const BookingPreview = () => {

  const apartmentId = useRecoilValue(selectedApartmentIdAtom)

  const history = useHistory();

  const selectedApartment = useRecoilValue(apartmentAtom);

  const [bookingDetail, setBookingDetail] = useRecoilState(bookingAtom);

  const [state, setState] = useReducer(BookingPreviewReducer, {
    checkInDate: new Date('2003-01-23'),
    checkOutDate: new Date('2003-01-23'),
    numberOfGuest: 1,
    total: 1,
    showCheckInModal: false,
    showCheckOutModal: false,
    dateDifference: 1,
    formatedCheckInDate: "Jan 3",
    formatedCheckOutDate: "Jan 3",
    toggleGuestEdit: false,
    durationOfStay: 1,
    transaction_charge: 1,
    appServiceChargePercentage: 1
  });

  const [showToast, setShowToast] = useState({
    enabled: false,
    message: "",
  });

  //  CheckInModal

  const checkInCalanderModal = useRef<null | HTMLIonModalElement>(null);

  const checkInDatePicker = useRef<null | HTMLIonDatetimeElement>(null);

  //   CheckOutModal

  const checkOutCalanderModal = useRef<null | HTMLIonModalElement>(null);

  const checkOutDatePicker = useRef<null | HTMLIonDatetimeElement>(null);

  // Computation

  const [subTotal, setSubTotal] = useState(0);

  // const [total, setTotal] = useState(0);



  useEffect(() => {
    getAppServiceChargePercentage()
  }, [])

  useEffect(() => {
    calculateSubPrice();
  }, [state.durationOfStay, state.numberOfGuest]);



 
  // ==================================== Functions =================================



  function handleBooking(){
    const selectedCheckInDate = new Date(state.checkInDate);
    const selectedCheckOutDate = new Date(state.checkOutDate);

    // check if selected checkInDate is after checkoutDate
    if (isAfter(selectedCheckInDate, selectedCheckOutDate)) {
      setShowToast({
        message:
          "Invalid date selection. Your check in date is futher than your checkout date",
        enabled: true,
      });
      return;
    }

    // check if selected checkInDate is after checkoutDate
    if (isBefore(selectedCheckOutDate, selectedCheckInDate)) {
      setShowToast({
        message:
          "Invalid date selection. Your CheckOut Date Is More Recent Than Your CheckIn date",
        enabled: true,
      });
      return;
    }

    // check if both checkin and checkout date are the same
    if (isEqual(selectedCheckOutDate, selectedCheckInDate)) {
      setShowToast({
        message:
          "Invalid date selection. Select different CheckIn And CheckOut Dates",
        enabled: true,
      });
      return;
    }

    setBookingDetail({
      ...bookingDetail,
      checkin_datetime: state.checkInDate.toString(),
      checkout_datetime: state.checkOutDate.toString(),
      price: state.total,
      number_of_guests: state.numberOfGuest!,
      transaction_charge: state.transaction_charge,
      duration_of_stay: state?.durationOfStay!,
      host: apartmentId
    });

    history.push("/booking_step_1");
  }
  

  async function getAppServiceChargePercentage() {
    const { service_charge } = await getSaveData(APP_CONFIG) as AppConfig
    setState({
      type: SET_APP_SERVICE_CHARGE_PERCENTAGE,
      payload: service_charge
    })
  }


  // TODO: move function to utils
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
    const bookingSubTotal = selectedApartment.price * state.durationOfStay!;
    calculateTransactionCharge(bookingSubTotal);
    setSubTotal(bookingSubTotal);
  }

  function calculateTransactionCharge(subTotal: number) {
    let transactionCharge = state.appServiceChargePercentage * subTotal;

    setState({
      type: SET_TRANSACTION_CHARGE,
      payload: transactionCharge,
    });

    calculateTotalAndTransactionCost(subTotal, transactionCharge)
  }


  function calculateTotalAndTransactionCost(subTotal: number, transactionCharge: number) {
    let totalPrice = transactionCharge + subTotal;

    setState({
      type: SET_TOTAL,
      payload: totalPrice
    })

    setState({
      type: SET_TRANSACTION_CHARGE,
      payload: transactionCharge
    })

    // setTotal(totalPrice);
  }


  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/apartment/${apartmentId}`} mode="ios" />
          </IonButtons>
          <IonTitle>Make Reservation</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* =========================== Toast Start ======================== */}
        <IonToast
          isOpen={showToast.enabled}
          color={"warning"}
          message={showToast.message}
          duration={4000}
          position="top"
          onDidDismiss={() =>
            setShowToast({
              enabled: false,
              message: "",
            })
          }
        />
        {/* =========================== Toast Ends ======================== */}

        {/* =========================== Checkin Modal Start ======================== */}
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
        {/* =========================== Checkin Modal Ends ======================== */}

        {/* =========================== Checkout Modal Ends ======================== */}
        <IonModal
          ref={checkOutCalanderModal}
          className="birthday_modal"
          isOpen={state.showCheckOutModal}
          onDidDismiss={() =>
            setState({
              type: TOGGLE_CHECKOUT_CALANDER,
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
        {/* =========================== Checkout Modal Ends ======================== */}

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
                ${selectedApartment.price} x {state?.durationOfStay} night
              </IonText>
              <IonText className="fw-bold-sm">${subTotal}</IonText>
            </SpaceBetween>
            <SpaceBetween className="my-3">
              <IonText className="text-muted">Services Charges</IonText>
              <IonText className="fw-bold-sm">
                ${state.transaction_charge}
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
              <IonText>${state.total}</IonText>
            </div>
          </SpaceBetween>
        </section>

        <div className="ion-text-center mt-5">
          <IonButton
            className="brown_fill"
            shape="round"
            size="large"
            style={{ width: "12rem", height: "55px" }}
            onClick={handleBooking}
          >
            Reserve
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default BookingPreview;
