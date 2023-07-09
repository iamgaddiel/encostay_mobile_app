import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonInput,
  IonToggle,
  IonItemDivider,
  IonLabel,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";
import React, { useReducer, useState } from "react";
import BackHeader from "../../components/BackHeader/BackHeader";
import SpaceBetween from "../../components/style/SpaceBetween";
import { useForm, SubmitHandler } from "react-hook-form";
import { ApartementItem } from "../../@types/apartment";
import { Camera, CameraResultType } from "@capacitor/camera";

// css
import "./AddApartments.css";

// Types

type MinMaxBounds = { lower: number; upper: number };

interface RangeValues {
  beds: number;
  guests: number;
  children: number;
  minMaxNight: MinMaxBounds;
  bathrooms: number;
  bedrooms: number;
  price: number;
  pets: number;
  has_wifi: boolean;
  has_cable: boolean;
  has_security: boolean;
  has_gym: boolean;
  pets_allowed: boolean;
  smoking_allowed: boolean;
  children_allowed: boolean;
}

interface Action {
  payload: any;
  type: string;
}

// Action Keys

const SET_NUMBER_OF_BEDS = "SET_NUMBER_OF_BEDS";
const SET_NUMBER_OF_GUESTS = "SET_NUMBER_OF_GUESTS";
const SET_NUMBER_OF_PETS = "SET_NUMBER_OF_PETS";
const SET_NUMBER_OF_CHILDREN = "SET_NUMBER_OF_CHILDREN";
const SET_NUMBER_OF_ROOMS = "SET_NUMBER_OF_ROOMS";
const SET_NUMBER_OF_BATHROOMS = "SET_NUMBER_OF_BATHROOMS";
const SET_MIN_MAx_NIGHTS = "SET_MIN_MAx_NIGHTS";

// Reducer Function

function reducer(state: RangeValues, { type, payload }: Action) {
  const tempState = { ...state };

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

    default:
      return tempState;
  }

  return tempState;
}

const AddApartments = () => {
  const { register, handleSubmit } = useForm<ApartementItem>();

  //todo: if has_children == false && number_of_children > 0 : restrict form submition.
  //todo:

  const [state, setState] = useReducer(reducer, {
    beds: 1,
    bathrooms: 1,
    bedrooms: 1,
    children: 1,
    guests: 1,
    minMaxNight: { lower: 1, upper: 30 },
    price: 0,
    pets: 0,
  });

  async function selectImages() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    let imageUrl = image.path;

    // Can be set to the src of an image now
    imageElement.src = imageUrl;
  }

  // const onSubmit: SubmitHandler<ApartementItem> = (data) => {
  //     const formData = {
  //         ...data,
  //         beds,
  //         bathrooms,
  //         bedrooms,
  //         children,
  //         guests,
  //         pets,
  //         price,
  //         min_nighths: minMaxNight.lower,
  //         max_nighths: minMaxNight.upper,
  //     }
  // }

  return (
    <IonPage>
      <BackHeader title="Add Apartment" backLink="/appartments" />
      <IonContent className="ion-padding" fullscreen>
        {/* 
                -----------------------------------------------------------------
                ----------------------------- Apartment Location-------------------
                -----------------------------------------------------------------
                 */}
        <div className="mt-1 ion-padding">
          <small className="text-muted border-bottom block text-uppercase">
            Apartmnet Location
          </small>
        </div>
        <div className="mt-2 ion-padding-horizontal">
          <small>Tile</small>
          <div
            className="rounded-5 mt-2"
            style={{ backgroundColor: "var(--white-4)" }}
          >
            <IonInput type="text" placeholder="Apartment title" />
          </div>
        </div>
        <div className="ion-margin-vertical ion-padding-horizontal">
          <small>Description</small>
          <div
            className="rounded-5 mt-2"
            style={{ backgroundColor: "var(--white-4)" }}
          >
            <IonTextarea placeholder="Enter apartment description" />
          </div>
        </div>
        <div className="ion-margin-vertical ion-padding-horizontal">
          <small>Address</small>
          <div
            className="rounded-5 mt-2"
            style={{ backgroundColor: "var(--white-4)" }}
          >
            <IonInput type="text" placeholder="123 John Street" />
          </div>
        </div>
        <div className="ion-margin-vertical ion-padding-horizontal">
          <small>City</small>
          <div
            className="rounded-5 mt-2"
            style={{ backgroundColor: "var(--white-4)" }}
          >
            <IonInput type="text" placeholder="Free Town" />
          </div>
        </div>
        <div className="ion-margin-vertical ion-padding-horizontal">
          <small>State</small>
          <div
            className="rounded-5 mt-2"
            style={{ backgroundColor: "var(--white-4)" }}
          >
            <IonInput type="text" placeholder="Lagos" />
          </div>
        </div>
        <div className="ion-margin-vertical ion-padding-horizontal">
          <small>Country</small>
          <div
            className="rounded-5 mt-2"
            style={{ backgroundColor: "var(--white-4)" }}
          >
            <IonInput type="text" placeholder="Nigeria" />
          </div>
        </div>

        {/* 
                -----------------------------------------------------------------
                ----------------------------- Apartment Details -------------------
                -----------------------------------------------------------------
                 */}
        <div className="mt-1 ion-padding">
          <small className="text-muted border-bottom block text-uppercase">
            Apartment Details
          </small>
        </div>
        <div className="mt-2 ion-padding-horizontal">
          <SpaceBetween>
            <small>Number of Beds</small>
            <IonLabel slot="end" className="">
              {state.beds}
            </IonLabel>
          </SpaceBetween>
          <div
            className="rounded-5 mt-2"
            style={{ backgroundColor: "var(--white-4)" }}
          >
            <IonRange
              color={"warning"}
              pin
              pinFormatter={(value: number) => `${value}`}
              className="apartment__range"
              ticks
              snaps
              max={10}
              min={1}
              mode="ios"
              onIonChange={
                // (e) => setRangeValues({ ...rangeValues, beds: e.detail.value as number })
                (e) =>
                  setState({
                    type: SET_NUMBER_OF_BEDS,
                    payload: e.detail.value,
                  })
              }
            />
          </div>
        </div>
        <div className="ion-margin-vertical ion-padding-horizontal">
          <SpaceBetween>
            <small>Number Of Children Allowed </small>
            <IonLabel slot="end">{state.bathrooms}</IonLabel>
          </SpaceBetween>
          <div
            className="rounded-5 mt-2"
            style={{ backgroundColor: "var(--white-4)" }}
          >
            <IonRange
              className="apartment__range"
              color={"warning"}
              pin
              pinFormatter={(value: number) => `${value}`}
              ticks
              snaps
              max={10}
              min={1}
              mode="ios"
              onIonChange={(event) =>
                setState({
                  type: SET_NUMBER_OF_BATHROOMS,
                  payload: event.detail.value,
                })
              }
            />
          </div>
        </div>
        <div className="ion-margin-vertical ion-padding-horizontal">
          <small>Appartment Type</small>
          <div
            className="rounded-5 mt-2"
            style={{ backgroundColor: "var(--white-4)" }}
          >
            <IonSelect mode="ios" placeholder="Single Room" color={"warning"}>
              <IonSelectOption>Loft</IonSelectOption>
              <IonSelectOption>Micro Appartment</IonSelectOption>
              <IonSelectOption>Duplex</IonSelectOption>
              <IonSelectOption>Triplex</IonSelectOption>
              <IonSelectOption>Co-up</IonSelectOption>
              <IonSelectOption>Garden Apartment</IonSelectOption>
              <IonSelectOption>Hight-Rise</IonSelectOption>
              <IonSelectOption>Mid-Rise</IonSelectOption>
              <IonSelectOption>Low-Rise</IonSelectOption>
              <IonSelectOption>Railroad</IonSelectOption>
              <IonSelectOption>Single Family</IonSelectOption>
              <IonSelectOption>Condo</IonSelectOption>
            </IonSelect>
          </div>
        </div>

        {/* 
                -----------------------------------------------------------------
                ----------------------------- Available Items -------------------
                -----------------------------------------------------------------
                 */}
        <div className="mt-1 ion-padding">
          <small className="text-muted border-bottom block text-uppercase">
            Select Items Available
          </small>
        </div>
        <div className="ion-margin-vertical ion-padding-horizontal">
          <SpaceBetween>
            <small>Wifi</small>
            <IonCheckbox mode="ios" color="warning" />
          </SpaceBetween>
        </div>
        <div className="ion-margin-vertical ion-padding-horizontal">
          <SpaceBetween>
            <small>TV Cable</small>
            <IonCheckbox mode="ios" color="warning" />
          </SpaceBetween>
        </div>
        <div className="ion-margin-vertical ion-padding-horizontal">
          <SpaceBetween>
            <small>Security</small>
            <IonCheckbox mode="ios" color="warning" />
          </SpaceBetween>
        </div>
        <div className="ion-margin-vertical ion-padding-horizontal">
          <SpaceBetween>
            <small>Gym</small>
            <IonCheckbox mode="ios" color="warning" />
          </SpaceBetween>
        </div>
        <div className="ion-margin-vertical ion-padding-horizontal">
          <SpaceBetween>
            <small>Laundary</small>
            <IonCheckbox mode="ios" color="warning" />
          </SpaceBetween>
        </div>

        {/* 
                -----------------------------------------------------------------
                ----------------------------- House Rules-------------------
                -----------------------------------------------------------------
                 */}
        <div className="mt-2 ion-padding">
          <small className="text-muted text-uppercase border-bottom block">
            House Rules
          </small>
        </div>
        <div className="mt-2 ion-padding-horizontal">
          <SpaceBetween>
            <small>Smoking Allowed</small>
            <IonToggle mode="ios" color={"warning"} />
          </SpaceBetween>
        </div>
        <div className="ion-margin-vertical ion-padding-horizontal">
          <SpaceBetween>
            <small>Pets Allowed</small>
            <IonToggle mode="ios" color={"warning"} />
          </SpaceBetween>
        </div>
        <div className="ion-margin-vertical ion-padding-horizontal">
          <SpaceBetween>
            <small>Children Allowed</small>
            <IonToggle mode="ios" color={"warning"} />
          </SpaceBetween>
        </div>
        <div className="ion-margin-vertical ion-padding-horizontal">
          <SpaceBetween>
            <small>Number Of Guets Allowed</small>
            <IonLabel slot="end">{state.guests}</IonLabel>
          </SpaceBetween>
          <IonRange
            className="apartment__range"
            color={"warning"}
            pin
            pinFormatter={(value: number) => `${value}`}
            ticks
            snaps
            max={10}
            min={1}
            mode="ios"
            onIonChange={(event) =>
              setState({
                type: SET_NUMBER_OF_GUESTS,
                payload: event.detail.value,
              })
            }
          />
        </div>

        <div className="ion-margin-vertical ion-padding-horizontal">
          <SpaceBetween>
            <small>Number Of Children Allowed </small>
            <IonLabel slot="end">{state.children}</IonLabel>
          </SpaceBetween>
          <IonRange
            className="apartment__range"
            color={"warning"}
            pin
            pinFormatter={(value: number) => `${value}`}
            ticks
            snaps
            max={10}
            min={1}
            mode="ios"
            onIonChange={(event) =>
              setState({
                type: SET_NUMBER_OF_CHILDREN,
                payload: event.detail.value,
              })
            }
          />
        </div>

        <div className="ion-margin-vertical ion-padding-horizontal">
          <SpaceBetween>
            <small>Number Of Pets Allowed </small>
            <IonLabel slot="end">{state.pets}</IonLabel>
          </SpaceBetween>

          <IonRange
            className="apartment__range"
            color={"warning"}
            pin
            pinFormatter={(value: number) => `${value}`}
            ticks
            snaps
            max={10}
            min={1}
            mode="ios"
            onIonChange={(event) =>
              setState({
                type: SET_NUMBER_OF_PETS,
                payload: event.detail.value,
              })
            }
          />
        </div>

        {/* 
                -----------------------------------------------------------------
                ----------------------------- Time Rules  -------------------
                -----------------------------------------------------------------
                 */}
        <div className="mt-2 ion-padding">
          <small className="text-muted ion-text-uppercase block border-bottom">
            Time schedule
          </small>
        </div>
        <div className="mt-2 ion-padding-horizontal">
          <small>Min / Max Nights Allowed</small>
          <IonRange
            className="apartment__range"
            color={"warning"}
            pin
            pinFormatter={(value: number) => `${value}`}
            ticks
            snaps
            max={30}
            min={1}
            mode="ios"
            dualKnobs
            // onIonChange={(e) => updateMinMaxNight(e.detail?.value as { lower: number, upper: number })}
            onIonChange={(event) =>
              setState({
                type: SET_MIN_MAx_NIGHTS,
                payload: event.detail.value,
              })
            }
          >
            <IonLabel slot="start">{state.minMaxNight.lower}</IonLabel>
            <IonLabel slot="end">{state.minMaxNight.upper}</IonLabel>
          </IonRange>
        </div>
        <div className="ion-margin-vertical ion-padding-horizontal">
          <small>Maximum number of nights allowed </small>
          <div
            className="rounded-5 mt-2"
            style={{ backgroundColor: "var(--white-4)" }}
          >
            <IonInput type="text" inputMode="numeric" placeholder="10 nights" />
          </div>
        </div>
        <div className="ion-margin-vertical ion-padding-horizontal">
          <small>Maximum number of nights allowed </small>
          <div
            className="rounded-5 mt-2"
            style={{ backgroundColor: "var(--white-4)" }}
          >
            <IonInput type="text" inputMode="numeric" placeholder="10 nights" />
          </div>
        </div>

        {/* 
                -----------------------------------------------------------------
                ----------------------------- Extras -------------------
                -----------------------------------------------------------------
                 */}
        <div className="mt-2 ion-padding">
          <small className="text-muted ion-text-uppercase block border-bottom">
            Extras
          </small>
        </div>
        {/* 
                    ------------------------------- [ Additional Rules ] -----------------------
                */}
        <div className="mt-2 ion-padding-horizontal">
          <small>State Additional Rules</small>
          <div
            className="rounded-5 mt-2"
            style={{ backgroundColor: "var(--white-4)" }}
          >
            <IonTextarea placeholder="Lights out by 10:00pm" />
          </div>
        </div>
        {/* 
                    ------------------------------- [ Apartment Images ] -----------------------
                */}
        <div className="mt-2 ion-padding-horizontal">
          <small>Apartment Images</small>
          <div
            className="rounded-5 mt-2"
            style={{ backgroundColor: "var(--white-4)" }}
          >
            <IonIcon icon={imagesOutline} size={"large"} />
          </div>
        </div>
        {/* <div className="mt-2 ion-padding-horizontal">
          <small>Apartment Images</small>
          <div
            className="rounded-5 mt-2"
            style={{ backgroundColor: "var(--white-4)" }}
          >
            <IonInput type="" placeholder="Images" />
          </div>
        </div> */}

        <IonButton
          className="yellow_fill my-5"
          shape="round"
          mode="ios"
          size="large"
          expand="block"
        >
          Confirm
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddApartments;
