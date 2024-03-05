import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonPage,
  IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import BackHeaderNoTitle from "../../components/BackHeaderNoTitle/BackHeaderNoTitle";

import "./Booking1.css";
import {
  cameraReverseOutline,
  shieldOutline,
  warningOutline,
} from "ionicons/icons";
import SpaceBetween from "../../components/style/SpaceBetween";
import { useRecoilValue } from "recoil";
import { bookingAtom } from "../../atoms/bookingAtom";
import { getHumanReadableDate } from "../../helpers/utils";
import Currency from "../../components/Currency";
import { userAtom } from "../../atoms/appAtom";

const Booking1 = () => {
  const bookingDetails = useRecoilValue(bookingAtom);

  const { record: user } = useRecoilValue(userAtom)

  const [bookedDays, setBookedDays] = useState({
    checkInWeekDay: "",
    checkInDay: 0,
    checkInMonth: "",
    checkOutWeekDay: "",
    checkOutDay: 0,
    checkOutMonth: "",
  });

  useEffect(() => {
    getBookedDays();
  }, []);

  function getBookedDays() {
    const checkIn = getHumanReadableDate(
      new Date(bookingDetails.checkin_datetime)
    );
    const checkOut = getHumanReadableDate(
      new Date(bookingDetails.checkout_datetime)
    );

    setBookedDays({
      checkInWeekDay: checkIn.weekday,
      checkInDay: checkIn.day,
      checkInMonth: checkIn.monthAbbreviation,
      checkOutWeekDay: checkOut.weekday,
      checkOutDay: checkOut.day,
      checkOutMonth: checkOut.monthAbbreviation,
    });
  }

  return (
    <IonPage>
      <BackHeaderNoTitle defaultHref="booking_step_1" />
      <IonContent className="ion-padding" fullscreen>
        <section className="mt-3 booking_process ion-padding-horizontal">
          <div className="booking_process_stage_currnet">Step 1</div>
          <div className="booking_process_stage">2</div>
          <div className="booking_process_stage">3</div>
          {/* <div className="booking_process_stage">4</div> */}
        </section>

        <section className="mt-5 ion-padding">
          <IonText className="fs-1">Book your stay</IonText>
          <section
            className="ion-margin-top d-flex justify-content-between p-2 rounded-4"
            style={{ backgroundColor: "var(--white-4)" }}
          >
            <IonText className="text-muted p-2 text-justify">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Veritatis, corporis omnis necessitatibus deleniti doloremque
              alias.
            </IonText>
          </section>
        </section>

        <section className="mt-4 ion-padding">
          <IonText className="fs-4">
            {bookingDetails.duration_of_stay} nights in Pefect Room
          </IonText>

          <div className="d-flex align-items-center mt-4">
            {/* Date */}
            <div className="booking_calander rounded-5 h">
              <div className="rounded-4 ion-text-center booking_calander_item">
                <IonText className="text-muted">{bookedDays.checkInMonth}</IonText>
                <IonText
                  className="fw-bold block fs-4"
                  style={{ marginTop: "1px" }}
                >
                  {bookedDays.checkInDay}
                </IonText>
              </div>
              <div className="rounded-4 ion-text-center booking_calander_item mt-4">
                <IonText className="text-muted">{bookedDays.checkOutMonth}</IonText>
                <IonText
                  className="fw-bold block fs-4"
                  style={{ marginTop: "1px" }}
                >
                  {bookedDays.checkOutDay}
                </IonText>
              </div>
            </div>

            {/* Time */}
            <div className="booking_time mx-4">
              <div className="rounded-4 ion-text-center booking_time_item">
                <IonText className="text-muted">
                  {bookedDays.checkInWeekDay} Checkin
                </IonText>
                <IonText className="block fs-4" style={{ marginTop: "1px" }}>
                  12PM - 9PM
                </IonText>
              </div>
              <div className="rounded-4 ion-text-center booking_time_item mt-4">
                <IonText className="text-muted">
                  {bookedDays.checkOutWeekDay} Checkout
                </IonText>
                <IonText className="block fs-4" style={{ marginTop: "1px" }}>
                  12PM
                </IonText>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-3">
          <IonAccordionGroup mode="ios" className="">
            <IonAccordion value="accomodation_type" className="rounded-5">
              <IonItem
                slot="header"
                color="light"
                className="ion-padding"
                lines="none"
              >
                <IonText>Things to keep in mind</IonText>
              </IonItem>

              <div className="ion-padding" slot="content">
                <SpaceBetween className="my-2">
                  <div className="bg-light rounded-3 p-2">
                    <IonIcon
                      icon={warningOutline}
                      color="warning"
                      size="large"
                    />
                  </div>
                  <IonText className="ml-4">
                    Guns or other dangerouse things are not allowed.
                  </IonText>
                </SpaceBetween>
                <div className="my-2 d-flex align-items-center">
                  <div className="bg-light rounded-3 p-2">
                    <IonIcon
                      icon={cameraReverseOutline}
                      color="warning"
                      size="large"
                    />
                  </div>
                  <IonText className="ms-3">Cameras are not allowed.</IonText>
                </div>
                <SpaceBetween className="my-2">
                  <div className="bg-light rounded-3 p-2">
                    <IonIcon
                      icon={shieldOutline}
                      color="warning"
                      size="large"
                    />
                  </div>
                  <IonText className="ml-4">
                    Disturbing other Guets is not allowed.
                  </IonText>
                </SpaceBetween>
              </div>
            </IonAccordion>
          </IonAccordionGroup>
        </section>

        {/* Reviews */}
        <section className="mt-4 ion-padding">
          <div className="ion-padding shadow rounded-5">
            <SpaceBetween>
              <big>
                <IonText>Total: <Currency currency={user.preferred_currency} />{bookingDetails.price}</IonText>
              </big>
              <IonButton
                className="brown_fill"
                size="large"
                shape="round"
                routerDirection="forward"
                routerLink="/booking_step_2"
              >
                Agree
              </IonButton>
            </SpaceBetween>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Booking1;
