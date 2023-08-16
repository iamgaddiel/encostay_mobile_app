import {
  IonAccordion,
  IonAccordionGroup,
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonImg,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonThumbnail,
} from "@ionic/react";
import {
  arrowBack,
  bookmark,
  calendarNumberOutline,
  car,
  checkmarkCircle,
  closeCircle,
  closeOutline,
  location,
  lockClosed,
  logoAndroid,
  star,
  tv,
  wifi,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";

import Room from "../../assets/images/room.png";
import Man from "../../assets/images/man.png";

//css
import "./HomeDetail.css";
// import { rooms } from '../../atoms/demoAtoms'
import Slider from "react-slick";
import SpaceBetween from "../../components/style/SpaceBetween";
import { useHistory, useParams } from "react-router";
import { ApartementItem } from "../../@types/apartments";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "../../atoms/appAtom";
import { getApartmentDetail } from "../../helpers/utils";
import { bookingAtom } from "../../atoms/bookingAtom";
import { apartmentAtom } from "../../atoms/apartmentAtom";

const HomeDetail = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>();

  const { token: authToken } = useRecoilValue(userAtom);

  // TODO: check if apartment is available

  // const [isAvailable, setAvailable] = useState(true)

  const [apartment, setApartment] = useState<ApartementItem | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [bookingDetail, setBookingDetail] = useRecoilState(bookingAtom);

  const { record: user } = useRecoilValue(userAtom);

  const setSelectedApartment = useSetRecoilState(apartmentAtom)

  const history = useHistory();





  useEffect(() => {
    (async () => {
      const res = await getApartmentDetail(apartmentId, authToken);

      setApartment(res); // set component state

      // set app level booking state
      setBookingDetail({
        ...bookingDetail,
        apartment: apartment?.id!,
        guest: user.id,
        host: apartment?.host!
      });

      setSelectedApartment({...res!}) // set app level selected apartment for booking
    })();
  }, []);


  return (
    <IonPage>
      <IonContent fullscreen className="">
        {/* Floating Buttons */}
        <IonFab horizontal="start" vertical="top" className="mt-3">
          <IonFabButton
            size="small"
            color={"warning"}
            routerDirection="back"
            onClick={() => history.go(-1)}
          >
            <IonIcon icon={arrowBack} color="light" />
          </IonFabButton>
        </IonFab>
        <IonFab horizontal="end" vertical="top" className="mt-3">
          <IonFabButton size="small" color={"light"}>
            <IonIcon icon={bookmark} color="warning" />
          </IonFabButton>
        </IonFab>

        <section
          className="home_detail_hero_image"
          style={{ backgroundImage: `url(${Room})` }}
        ></section>
        {/* <Slider {...apartmentDisplayCarouselSetting}>
                        <section className="home_detail_hero_image" style={{ backgroundImage: `url(${Room})` }}></section>
                        <section className="home_detail_hero_image" style={{ backgroundImage: `url(${Room})` }}></section>
                        <section className="home_detail_hero_image" style={{ backgroundImage: `url(${Room})` }}></section>
                </Slider> */}

        {/* Apartment is Available */}

        {apartment?.is_available ? (
          <div
            className="ion-padding w-75 my-4 mx-auto rounded-4 ion-text-center"
            style={{ backgroundColor: "var(--very-light-green)" }}
          >
            <IonText style={{ color: "var(--green)" }}>Available</IonText>
          </div>
        ) : (
          <div
            className="ion-padding w-75 my-4 mx-auto rounded-4 ion-text-center"
            style={{ backgroundColor: "var(--light-red)" }}
          >
            <IonText color={"warning"}>Unavailable</IonText>
          </div>
        )}

        {/* Apartment Rating and Location  */}
        <section className="home_detail_intro ion-text-center ion-padding">
          <div>
            <IonIcon icon={star} color="warning" /> 4.9 (334)
          </div>
          <big className="my-4">{apartment?.title}</big> <br />
          <span className="text-muted fs-small">
            <IonIcon icon={location} />
            {apartment?.address}, {apartment?.state_location}
          </span>
        </section>

        {/* State/Country and Owner */}
        <section className="ion-padding">
          <div
            className="mx-auto mt-4 rounded-4 ion-padding"
            style={{ width: "80vw", backgroundColor: "var(--light-orange)" }}
          >
            <IonCard className="rounded-4">
              <IonCardContent>
                <IonText className="fw-bold">New York</IonText>
                <IonText className="muted block">United States</IonText>
              </IonCardContent>
            </IonCard>
            <IonCard className="rounded-4 mt-3">
              <IonCardContent className="d-flex align-items-center">
                <IonThumbnail>
                  <IonImg src={Man} />
                </IonThumbnail>
                <div className="ml-4">
                  <IonText className="fw-bold">New York</IonText>
                  <IonText className="muted block">
                    <small>United States</small>
                  </IonText>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        </section>

        {/* About | Descriptions */}
        <section className="mt-4 p-4">
          <big>
            <IonText>About</IonText>
          </big>

          <div className="mt-3 text-muted">
            <IonText>{apartment?.description}</IonText>
          </div>
        </section>

        {/* Details  */}
        <section className="p-2">
          <IonAccordionGroup mode="ios" className="">
            <IonAccordion value="accomodation_type" className="rounded-5">
              <IonItem
                slot="header"
                color="light"
                className="ion-padding"
                lines="none"
              >
                <IonLabel>Details</IonLabel>
              </IonItem>

              <div className="ion-padding" slot="content">
                <IonList lines="none">
                  <IonItem>
                    <IonText>ID</IonText>
                    <IonText className="fw-bold" slot="end">
                      {apartment?.id}
                    </IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Guets</IonText>
                    <IonText className="fw-bold" slot="end">
                      {apartment?.guests}
                    </IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Beds</IonText>
                    <IonText className="fw-bold" slot="end">
                      {apartment?.beds}
                    </IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Bathrooms</IonText>
                    <IonText className="fw-bold" slot="end">
                      {apartment?.bathrooms}
                    </IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Check-in-After</IonText>
                    <IonText className="fw-bold" slot="end">
                      {apartment?.checkin}
                    </IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Check-out-Before</IonText>
                    <IonText className="fw-bold" slot="end">
                      {apartment?.checkout}
                    </IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Type</IonText>
                    <IonText className="fw-bold" slot="end">
                      {apartment?.type}
                    </IonText>
                  </IonItem>
                </IonList>
              </div>
            </IonAccordion>
          </IonAccordionGroup>
        </section>

        {/* Amenities*/}
        <section className="mt-4 p-4">
          <big>
            <IonText>Amenities</IonText>
          </big>

          <div className="d-flex justify-content-between mt-4 ion-text-center">
            {apartment?.has_wifi && (
              <div className="amenities-item">
                <div className="rounded-3 p-2 amenities-item-icon-wrapper">
                  <IonIcon
                    icon={wifi}
                    size={"small"}
                    className="amenities-item-icon"
                  />{" "}
                  <br />
                </div>
                <small className="ion-margin-top">
                  <IonText>Wifi</IonText>
                </small>
              </div>
            )}

            {apartment?.has_tv_cable && (
              <div className="amenities-item">
                <div className="rounded-3 p-2 amenities-item-icon-wrapper">
                  <IonIcon
                    icon={tv}
                    size={"small"}
                    className="amenities-item-icon"
                  />{" "}
                  <br />
                </div>
                <small className="ion-margin-top">
                  <IonText>TV Cable</IonText>
                </small>
              </div>
            )}

            {apartment?.has_laundry && (
              <div className="amenities-item">
                <div className="rounded-3 p-2 amenities-item-icon-wrapper">
                  <IonIcon
                    icon={logoAndroid}
                    size={"small"}
                    className="amenities-item-icon"
                  />{" "}
                  <br />
                </div>
                <small className="ion-margin-top">
                  <IonText>Laundry</IonText>
                </small>
              </div>
            )}

            {apartment?.has_gym && (
              <div className="amenities-item">
                <div className="rounded-3 p-2 amenities-item-icon-wrapper">
                  <IonIcon
                    icon={car}
                    size={"small"}
                    className="amenities-item-icon"
                  />{" "}
                  <br />
                </div>
                <small className="ion-margin-top">
                  <IonText>Gym</IonText>
                </small>
              </div>
            )}

            {apartment?.has_security && (
              <div className="amenities-item">
                <div className="rounded-3 p-2 amenities-item-icon-wrapper">
                  <IonIcon
                    icon={lockClosed}
                    size={"small"}
                    className="amenities-item-icon"
                  />{" "}
                  <br />
                </div>
                <small className="ion-margin-top">
                  <IonText>Security</IonText>
                </small>
              </div>
            )}
          </div>
        </section>

        {/* Terms and Rules */}
        <section className="mt-2 p-4">
          <big>
            <IonText>Terms & rules</IonText>
          </big>

          <div>
            <IonList className="" lines="none">
              <IonItem>
                <IonIcon
                  icon={
                    apartment?.smoking_allowed ? checkmarkCircle : closeCircle
                  }
                  color={apartment?.smoking_allowed ? "success" : "danger"}
                  size="small"
                  slot="start"
                />
                <IonText>
                  <small>Smoking</small>
                </IonText>
                <IonText slot="end">
                  <small>{apartment?.smoking_allowed ? "Yes" : "No"}</small>
                </IonText>
              </IonItem>
              <IonItem>
                <IonIcon
                  icon={apartment?.pets_allowed ? checkmarkCircle : closeCircle}
                  color={apartment?.pets_allowed ? "success" : "danger"}
                  size="small"
                  slot="start"
                />
                <IonText>
                  <small>Pets Allowed</small>
                </IonText>
                <IonText slot="end">
                  <small>{apartment?.pets_allowed ? "Yes" : "No"}</small>
                </IonText>
              </IonItem>
              <IonItem>
                <IonIcon
                  icon={
                    apartment?.party_allowed ? checkmarkCircle : closeCircle
                  }
                  color={apartment?.party_allowed ? "success" : "danger"}
                  size="small"
                  slot="start"
                />
                <IonText>
                  <small>Party Allowed</small>
                </IonText>
                <IonText slot="end">
                  <small>{apartment?.party_allowed ? "Yes" : "No"}</small>
                </IonText>
              </IonItem>
              <IonItem>
                <IonIcon
                  icon={
                    apartment?.children_allowed ? checkmarkCircle : closeCircle
                  }
                  color={apartment?.children_allowed ? "success" : "danger"}
                  size="small"
                  slot="start"
                />
                <IonText>
                  <small>Children Allowed</small>
                </IonText>
                <IonText slot="end">
                  <small>{apartment?.children_allowed ? "Yes" : "No"}</small>
                </IonText>
              </IonItem>
            </IonList>
          </div>
        </section>

        {/* Additional rules informmation */}
        <section className="mt-2 p-4">
          <IonText>Additional rules informmation</IonText>

          <div className="mt-3 text-muted">
            <IonText>
              {apartment?.additional_rules! !== ""
                ? apartment?.additional_rules!
                : "N/A"}
            </IonText>
          </div>
        </section>

        {/* Availability */}
        <section className="mt-2 p-4">
          <IonText>Availability</IonText>

          <div className="mt-3 text-muted">
            <SpaceBetween>
              <div className="d-flex align-items-top mx-3">
                <IonIcon
                  icon={calendarNumberOutline}
                  color={"warning"}
                  size={"large"}
                />
                <small className="ion-margin-start text-muted">
                  The minimum stay is {apartment?.min_nights} nights
                </small>
              </div>
              <div className="d-flex align-items-top mx-3">
                <IonIcon
                  icon={calendarNumberOutline}
                  color={"warning"}
                  size={"large"}
                />
                <small className="ion-margin-start text-muted">
                  The maximum stay is {apartment?.max_nights} nights
                </small>
              </div>
            </SpaceBetween>
          </div>
        </section>

        {/* Price */}
        <section className="mt-4 ion-padding">
          <div className="ion-padding shadow rounded-5">
            <SpaceBetween>
              <big>
                <IonText>${apartment?.price}/night</IonText>
              </big>
              <IonButton
                className="brown_fill"
                size="large"
                shape="round"
                onClick={() => history.push(`/apartment_preview/${apartment?.id}`)}
              >
                Reserve
              </IonButton>
            </SpaceBetween>
          </div>
        </section>

        {/* Revies */}
        <section className="mt-4 p-4">
          <big>
            <IonText>Reviews</IonText> <br />
            {/* todo: dynamicall update comments */}
            <small className="text-muted">98 coments</small>
          </big>

          <div className="mt-3 text-muted">
            <IonList lines="none">
              <IonItem>
                <SpaceBetween>
                  <div className="review-avater">
                    <IonText className="fw-bold" color={"light"}>
                      A
                    </IonText>
                  </div>
                  <div className="comments">
                    <strong>Alicia</strong> <br />
                    <IonText className="text-muted">
                      Lorem sdfsdf sdf sdfs ipsum dolor sit amet consectetur
                      adipisicing elit. Perspiciatis, quaerat?
                    </IonText>
                  </div>
                </SpaceBetween>
              </IonItem>
            </IonList>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default HomeDetail;
