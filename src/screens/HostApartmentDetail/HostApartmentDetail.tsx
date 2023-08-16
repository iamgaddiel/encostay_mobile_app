import {
  IonPage,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonText,
  IonCard,
  IonCardContent,
  IonThumbnail,
  IonImg,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonAlert,
} from "@ionic/react";
import {
  arrowBack,
  bookmark,
  star,
  wifi,
  tv,
  logoAndroid,
  car,
  lockClosed,
  closeCircle,
  checkmarkCircle,
  calendarNumberOutline,
  location,
  pencil,
  trashBinOutline,
  trashOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import SpaceBetween from "../../components/style/SpaceBetween";

import Room from "../../assets/images/room.png";
import Man from "../../assets/images/man.png";
import {
  deleteApiCollection,
  getApiCollectionItem,
} from "../../helpers/apiHelpers";
import { APARTMENTS_COLLECTION } from "../../helpers/keys";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../atoms/appAtom";
import { ApartementItem } from "../../@types/apartments";

const HostApartmentDetail = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>();
  const history = useHistory();
  const { token } = useRecoilValue(userAtom);

  // TODO: check if apartment is available
  const [isAvailable, setAvailable] = useState(true);

  const apartmentDisplayCarouselSetting = {
    dots: true,
    infinite: false,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    speed: 2000,
    rtl: false,
    autoplay: false,
    autoplaySpeed: 4000,
    cssEase: "linear",
  };

  const [apartment, setApartment] = useState<ApartementItem>();
  const [showAleart, setShowAleart] = useState(false);
  const [showDeleteConfirmDialogue, setShowDeleteConfirmDialogue] = useState(false)

  useEffect(() => {
    getApartmentDetail();
  }, []);

  async function getApartmentDetail() {
    //TODO: make this function a method of a class
    const { response, error } = await getApiCollectionItem(
      APARTMENTS_COLLECTION,
      apartmentId,
      token
    );
    if (error) {
      console.log(
        "🚀 ~ file: HostApartmentDetail.tsx:54 ~ getApartmentDetail ~ error:",
        error
      );
      return;
    }
    setApartment(response as ApartementItem);
  }

  async function deleteApartemnt() {
    const { isDeleted } = await deleteApiCollection(
      APARTMENTS_COLLECTION,
      apartmentId,
      token
    );
    if (isDeleted){
        history.go(-1)
        return
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen className="">
        <IonAlert
            header="Confirm Delete!"
            subHeader="You're about to delete this apartment"
            isOpen={showDeleteConfirmDialogue}
            onDidDismiss={() => setShowDeleteConfirmDialogue(false)}
            mode="ios"
            buttons={
                [
                    {
                        text: 'Cancel',
                        handler: () => setShowDeleteConfirmDialogue(false),
                        cssClass: 'text-warning'
                    },
                    {
                        text: 'Confirm',
                        cssClass: 'bg-danger text-light',
                        handler: () => deleteApartemnt()
                    }
                ]
            }
        />

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
          <IonFabButton
            size="small"
            color={"light"}
            routerDirection="forward"
            routerLink={`/host/apartment/update/${apartmentId}`}
          >
            <IonIcon icon={pencil} color="warning" />
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

        {isAvailable ? (
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
            {apartment?.address}
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
                <IonText className="fw-bold">{apartment?.city}</IonText>
                <IonText className="muted block">
                  {apartment?.state_location}
                </IonText>
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
              {apartment?.additional_rules! === ""
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

        {/* Revies */}
        <section className="mt-4 ion-padding">
          <div className="ion-padding shadow rounded-5">
            <SpaceBetween>
              <big>
                <IonText>${apartment?.price}/night</IonText>
              </big>
              <IonButton
                className="w-50"
                size="large"
                shape="round"
                color={"danger"}
                onClick={() => setShowDeleteConfirmDialogue(true)}
              >
                <IonIcon icon={trashOutline} slot="start" />
                Delete
              </IonButton>
            </SpaceBetween>
          </div>
        </section>

        {/* Revies */}
        {/* TODO: dynamicall update comments */}
        {/* <section className="mt-4 p-4">
          <big>
            <IonText>Reviews</IonText> <br />
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
        </section> */}
      </IonContent>
    </IonPage>
  );
};

export default HostApartmentDetail;
