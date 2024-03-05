import {
  IonPage,
  IonContent,
  IonAlert,
  IonToast,
  IonImg,
  IonInput,
  IonTextarea,
  IonLabel,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonToggle,
  IonDatetime,
  IonButton,
} from "@ionic/react";
import { warningOutline } from "ionicons/icons";
import React, { useEffect, useReducer, useRef, useState } from "react";
import BackHeader from "../../components/BackHeader";
import SpaceBetween from "../../components/style/SpaceBetween";
import {
  SET_APARTMENT_TITLE,
  SET_APARTMENT_DESCRIPTION,
  SET_APARTMENT_ADDRESS,
  SET_APARTMENT_CITY_LOCATION,
  SET_APARTMENT_STATE_LOCATION,
  SET_APARTMENT_COUNTRY_LOCATION,
  SET_NUMBER_OF_BEDS,
  SET_NUMBER_OF_ROOMS,
  SET_NUMBER_OF_BATHROOMS,
  SET_APARTMENT_TYPE,
  SET_APARTMENT_HAS_WIFI,
  SET_APARTMENT_HAS_TV_CABLE,
  SET_APARTMENT_HAS_SECURITY,
  SET_APARTMENT_HAS_GYM,
  SET_APARTMENT_HAS_LAUNDRY,
  SET_SMOKING_ALLOWED,
  SET_PETS_ALLOWED,
  SET_CHILDREN_ALLOWED,
  SET_PARTY_ALLOWED,
  SET_NUMBER_OF_GUESTS,
  SET_NUMBER_OF_CHILDREN,
  SET_NUMBER_OF_PETS,
  SET_MIN_MAx_NIGHTS,
  SET_CHECK_IN_TIME,
  SET_CHECKOUT_TIME,
  SET_APARTMENT_IMAGE_1,
  SET_APARTMENT_IMAGE_2,
  SET_APARTMENT_IMAGE_3,
  SET_ALL_APARTMENT_DETAILS,
} from "../../reducers/actions/addApartmentsActions";
import { useHistory, useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { Toast } from "../../@types/toast";
import { StoredUser } from "../../@types/users";
import { userAtom } from "../../atoms/appAtom";
import { imageKitAtom } from "../../atoms/imagekitAtom";
import { addApartmentReducer } from "../../reducers/functions/addApartment";
import ImagePlaceholder from "../../assets/images/insert-picture-icon.png";
import { Camera, CameraResultType } from "@capacitor/camera";
import { ImageKitType } from "../../@types/imagekit";
import {
  createApiCollection,
  getApiCollectionItem,
} from "../../helpers/apiHelpers";
import { APARTMENTS_COLLECTION, IMAGEKIT_CONFIG } from "../../helpers/keys";
import { getSaveData } from "../../helpers/storageSDKs";
import { ApartementItem } from "../../@types/apartments";
import { getApartmentDetail } from "../../helpers/utils";




const ApartmentUpdate = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>();
  const history = useHistory();
  const { record: user, token } = useRecoilValue(userAtom) as StoredUser;
  const apartmentImageOne = useRef<HTMLIonImgElement | null>(null);
  const apartmentImageTwo = useRef<HTMLIonImgElement | null>(null);
  const apartmentImageThree = useRef<HTMLIonImgElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const imagekit = useRecoilValue(imageKitAtom);

  const [state, setState] = useReducer(addApartmentReducer, {
    minMaxNight: { lower: 1, upper: 30 },
    children: 0,
    pets: 0,
    smoking_allowed: false,
    children_allowed: false,
    title: "",
    description: "",
    address: "",
    city: "",
    state_location: "",
    country: "",
    guests: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    checkin: "",
    checkout: "",
    type: "duplex",
    has_wifi: false,
    has_tv_cable: false,
    has_laundry: false,
    has_gym: false,
    has_security: false,
    pets_allowed: false,
    party_allowed: false,
    additional_rules: '',
    price: 0,
    images: [],
  });

  const [apartmentDetail, setApartmentDetail] = useState<ApartementItem>()



  const [toastParam, setToastParam] = useState<Toast>({
    enabled: false,
    message: "",
    type: "warning",
  });





  useEffect(() => {
    // getApartmentDetai()
    getApartmentDetail()
  }, []);



async function getApartmentDetail(): Promise<void> {
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
       error
    }
    setApartmentDetail(response as ApartementItem)
  }

  async function submnitForm(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setLoading(() => true);

    const {
      children_allowed,
      children,
      title,
      description,
      address,
      city,
      state_location,
      country,
      checkin,
      checkout,
      images,
    } = state;

    // Error handling
    if (!children_allowed && children > 0) {
      displayToastMessage(
        "Invalid Operation: Check properly, you don't allow children",
        true
      );
      return;
    }

    if (
      (title ||
        description ||
        address ||
        city ||
        state_location ||
        country ||
        checkout ||
        checkin) === ""
    ) {
      displayToastMessage(
        "Missing value(s): Check Title, Description, Address, City, State or Counry",
        true
      );
      return;
    }

    // Error check for no image selected
    // if (images?.length === 0) {
    //   displayToastMessage("You've not selected any image", true);
    //   return;
    // }

    // EXECUTE IF NO FORM ERRORS

    /**
     * UPLOAD IMAGES TO IMAGEKIT
     *
     * #NOTE:
     * Upload image to imagekit and add the returned image urls to the form data to be
     * submited the database.
     */

    // TODO: upload to image kit
    // const imageKitImageUrls = await uploadImageToImageKit(images!);
    // console.log("🚀 ~ file: AddApartments.tsx:185 ~ AddApartments ~ imageKitImageUrls:", imageKitImageUrls)

    let convertedImages = JSON.stringify(images); // FIXME: find a more optimal way

    const formData = {
      // update form data to match required form values for database
      ...state,
      min_nights: state.minMaxNight.lower,
      max_nights: state.minMaxNight.upper,
      host: user?.id!,
      images: convertedImages,
    };

    //TODO: json stringify images before sending to database
    try {
      const { isCreated, error } = await createApiCollection(
        APARTMENTS_COLLECTION,
        formData,
        token
      );

      if (!!error.checkin || !!error.checkout) {
        displayToastMessage(
          "You might have forgotten to set your Checkin or Checkout time",
          true
        );
        setLoading(() => false);
        return;
      }

      setShowAlert(true);
      setLoading(() => false);
    } catch (err: unknown) {
      setLoading(() => false);
    }
  }

  // FIXME: make function a uitl function
  async function uploadImageToImageKit(images: string[]) {
    const imageKitResponseStrigs: string[] = []; // stores the image strings returned from imagekit
    const { urlEndpoint } = (await getSaveData(
      IMAGEKIT_CONFIG
    )) as ImageKitType;
    try {
      images?.forEach((imgPath) => {
        var imageURL = imagekit!.url({
          src: imgPath,
          urlEndpoint,
          // transformation: [
          //   {
          //     height: "300",
          //     width: "400",
          //   },
          // ],
        });
        imageKitResponseStrigs.push(imageURL);
      });
    } catch (err: any) {
      console.error(err);
      return;
    }

    return imageKitResponseStrigs;
  }

  function displayToastMessage(message: string, isVisible: boolean): void {
    if (message === "") return;
    setToastParam({
      enabled: isVisible,
      message,
      type: "warning",
    });
  }

  async function selectImages(imageIndex: number) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    let imageUrl = image.webPath!;
    const imageFile = image.path;

    // Can be set to the src of an image now
    switch (imageIndex) {
      case 1:
        setState({
          type: SET_APARTMENT_IMAGE_1,
          payload: imageUrl,
        });
        // apartmentImageOne.current!.src = imageUrl;
        return;

      case 2:
        setState({
          type: SET_APARTMENT_IMAGE_2,
          payload: imageUrl,
        });
        // apartmentImageTwo.current!.src = imageUrl;
        return;

      case 3:
        setState({
          type: SET_APARTMENT_IMAGE_3,
          payload: imageUrl,
        });
        // apartmentImageThree.current!.src = imageUrl;
        return;
    }
  }

  return (
    <IonPage>
      <BackHeader title="Update Apartment" backLink="/appartments" />
      <IonContent className="ion-padding" fullscreen>
        <IonAlert
          isOpen={showAlert}
          title="Sucess"
          header="Sucess"
          mode="ios"
          subHeader="Your apartment has been added successfuly"
          buttons={[
            {
              text: "Okay",
              handler: () => history.push("/appartments"),
            },
          ]}
        />
        <IonToast
          message={toastParam.message}
          isOpen={toastParam.enabled}
          color={toastParam.type}
          duration={3000}
          position="top"
          icon={warningOutline}
          onDidDismiss={() =>
            setToastParam({
              ...toastParam,
              enabled: false,
            })
          }
        />

        {/* 
                  ------------------------------- [ Apartment Images ] -----------------------
              */}

        {showImages ? (
          <>
            <div className="mt-2 ion-padding">
              <small className="text-muted ion-text-uppercase block border-bottom">
                Uploads Images
              </small>
            </div>

            <div className="mt-4">
              {/* Image 1 */}
              <div className="mt-4 ion-padding-horizontal">
                <div className="rounded-5 mt-2 ion-text-center">
                  <button
                    className="ion-text-center"
                    onClick={() => selectImages(1)}
                  >
                    <IonImg
                      src={state.images![0] ?? ImagePlaceholder}
                      ref={apartmentImageOne}
                      aria-required
                      alt="image placehodler"
                      className="w-50 mx-auto"
                    />
                  </button>
                  {/* <small className="text-muted">Image One</small> */}
                </div>
              </div>

              {state.images!.length > 0 ? (
                <>
                  {/* Image 2 */}
                  <div className="mt-4 ion-padding-horizontal">
                    <div className="rounded-5 mt-2 ion-text-center">
                      <button
                        className="ion-text-center"
                        onClick={() => selectImages(2)}
                      >
                        <IonImg
                          src={state.images![1] ?? ImagePlaceholder}
                          ref={apartmentImageTwo}
                          alt="image placehodler"
                          className="w-50 mx-auto"
                        />
                      </button>
                      {/* <small className="text-muted">Image Two</small> */}
                    </div>
                  </div>

                  {/* Image 3 */}
                  <div className="mt-4 ion-padding-horizontal">
                    <div className="rounded-5 mt-2 ion-text-center">
                      <button
                        className="ion-text-center"
                        onClick={() => selectImages(3)}
                      >
                        <IonImg
                          src={state.images![2] ?? ImagePlaceholder}
                          ref={apartmentImageThree}
                          alt="image placehodler"
                          className="w-50 mx-auto"
                        />
                      </button>
                      {/* <small className="text-muted">Image Three</small> */}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </>
        ) : null}

        <form method="post" onSubmit={submnitForm}>
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

          {/* Title */}
          <div className="mt-2 ion-padding-horizontal">
            <small>Tile</small>
            <div className="rounded-5 mt-2 px-3 grey__bg">
              <IonInput
                type="text"
                placeholder="Apartment title"
                required
                value={apartmentDetail?.title}
                onIonChange={(e) =>
                  setState({
                    payload: e.detail.value,
                    type: SET_APARTMENT_TITLE,
                  })
                }
              />
            </div>
          </div>

          {/* Description */}
          <div className="ion-margin-vertical ion-padding-horizontal">
            <small>Description</small>
            <div className="rounded-5 mt-2 px-3 grey__bg">
              <IonTextarea
                placeholder="Enter apartment description"
                required
                value={apartmentDetail?.description}
                onIonChange={(e) =>
                  setState({
                    payload: e.detail.value,
                    type: SET_APARTMENT_DESCRIPTION,
                  })
                }
              />
            </div>
          </div>

          {/* Address */}
          <div className="ion-margin-vertical ion-padding-horizontal">
            <small>Address</small>
            <div className="rounded-5 mt-2 px-3 grey__bg">
              <IonInput
                type="text"
                placeholder="123 John Street"
                required
                value={apartmentDetail?.address}
                onIonChange={(e) =>
                  setState({
                    payload: e.detail.value,
                    type: SET_APARTMENT_ADDRESS,
                  })
                }
              />
            </div>
          </div>

          {/* CITY */}
          <div className="ion-margin-vertical ion-padding-horizontal">
            <small>City</small>
            <div className="rounded-5 mt-2 px-3 grey__bg">
              <IonInput
                type="text"
                placeholder="Free Town"
                required
                value={apartmentDetail?.city}
                onIonChange={(e) =>
                  setState({
                    payload: e.detail.value,
                    type: SET_APARTMENT_CITY_LOCATION,
                  })
                }
              />
            </div>
          </div>

          {/* State */}
          <div className="ion-margin-vertical ion-padding-horizontal">
            <small>State</small>
            <div className="rounded-5 mt-2 px-3 grey__bg">
              <IonInput
                type="text"
                placeholder="Lagos"
                required
                value={apartmentDetail?.state_location}
                onIonChange={(e) =>
                  setState({
                    payload: e.detail.value,
                    type: SET_APARTMENT_STATE_LOCATION,
                  })
                }
              />
            </div>
          </div>

          {/* COUNTRY */}
          <div className="ion-margin-vertical ion-padding-horizontal">
            <small>Country</small>
            <div className="rounded-5 mt-2 px-3 grey__bg">
              <IonInput
                type="text"
                placeholder="Nigeria"
                required
                value={apartmentDetail?.country}
                onIonChange={(e) =>
                  setState({
                    payload: e.detail.value,
                    type: SET_APARTMENT_COUNTRY_LOCATION,
                  })
                }
              />
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

          {/* BEDS */}
          <div className="mt-2 ion-padding-horizontal">
            <SpaceBetween>
              <small>Number of Beds</small>
              <IonLabel slot="end" className="">
                {state.beds}
              </IonLabel>
            </SpaceBetween>
            <div className="mt-2">
              <IonRange
                color={"warning"}
                pin
                pinFormatter={(value: number) => `${value}`}
                className="apartment__range"
                ticks
                snaps
                max={10}
                min={1}
                value={apartmentDetail?.beds}
                mode="ios"
                aria-required
                onIonChange={(e) =>
                  setState({
                    type: SET_NUMBER_OF_BEDS,
                    payload: e.detail.value,
                  })
                }
              />
            </div>
          </div>

          {/* BEDROOM */}
          <div className="mt-2 ion-padding-horizontal">
            <SpaceBetween>
              <small>Number of Bedrooms</small>
              <IonLabel slot="end" className="">
                {state.bedrooms}
              </IonLabel>
            </SpaceBetween>
            <div className="mt-2">
              <IonRange
                color={"warning"}
                pin
                pinFormatter={(value: number) => `${value}`}
                className="apartment__range"
                ticks
                snaps
                max={10}
                min={1}
                // value={state.bedrooms}
                value={apartmentDetail?.bedrooms}
                mode="ios"
                aria-required
                onIonChange={(e) =>
                  setState({
                    type: SET_NUMBER_OF_ROOMS,
                    payload: e.detail.value,
                  })
                }
              />
            </div>
          </div>

          {/* BATHROOMS */}
          <div className="mt-2 ion-padding-horizontal">
            <SpaceBetween>
              <small>Number of Bathrooms</small>
              <IonLabel slot="end" className="">
                {state.bathrooms}
              </IonLabel>
            </SpaceBetween>
            <div className="mt-2">
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
                aria-required
                // value={state.bathrooms}
                value={apartmentDetail?.bathrooms}
                onIonChange={(e) =>
                  setState({
                    type: SET_NUMBER_OF_BATHROOMS,
                    payload: e.detail.value,
                  })
                }
              />
            </div>
          </div>

          {/* APRTEMENT_TYPE */}
          <div className="ion-margin-vertical ion-padding-horizontal">
            <small>Appartment Type</small>
            <div
              className="rounded-5 mt-2"
              style={{ backgroundColor: "var(--white-4)" }}
            >
              <IonSelect
                mode="ios"
                placeholder="Single Room"
                color={"warning"}
                onIonChange={(e) => {
                  setState({
                    payload: e.detail.value,
                    type: SET_APARTMENT_TYPE,
                  });
                }}
                // value={state.type}
                value={apartmentDetail?.type}
              >
                <IonSelectOption value={"loft"}>Loft</IonSelectOption>
                <IonSelectOption value={"micro apartment"}>
                  Micro Appartment
                </IonSelectOption>
                <IonSelectOption value={"duplex"}>Duplex</IonSelectOption>
                <IonSelectOption value={"triplex"}>Triplex</IonSelectOption>
                <IonSelectOption value={"co-op"}>Co-up</IonSelectOption>
                <IonSelectOption value={"garden apartment"}>
                  Garden Apartment
                </IonSelectOption>
                <IonSelectOption value={"high-rise,"}>
                  Hight-Rise
                </IonSelectOption>
                <IonSelectOption value={"mid-rise"}>Mid-Rise</IonSelectOption>
                <IonSelectOption value={"low-rise"}>Low-Rise</IonSelectOption>
                <IonSelectOption value={"railroad apartment"}>
                  Railroad
                </IonSelectOption>
                <IonSelectOption value={"walk-up"}>Walk Up</IonSelectOption>
                <IonSelectOption value={"single-family home"}>
                  Single Family
                </IonSelectOption>
                <IonSelectOption value={"walk-up"}>
                  Single Family
                </IonSelectOption>
                <IonSelectOption value={"condo"}>Condo</IonSelectOption>
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

          {/* WIFI */}
          <div className="ion-margin-vertical ion-padding-horizontal">
            <SpaceBetween>
              <small>Wifi</small>
              <IonCheckbox
                mode="ios"
                color="warning"
                value={apartmentDetail?.has_wifi}
                onIonChange={(e) =>
                  setState({
                    payload: e.detail.checked,
                    type: SET_APARTMENT_HAS_WIFI,
                  })
                }
              />
            </SpaceBetween>
          </div>

          {/* TV CABLE */}
          <div className="ion-margin-vertical ion-padding-horizontal">
            <SpaceBetween>
              <small>TV Cable</small>
              <IonCheckbox
                mode="ios"
                color="warning"
                value={apartmentDetail?.has_tv_cable}
                onIonChange={(e) =>
                  setState({
                    payload: e.detail.checked,
                    type: SET_APARTMENT_HAS_TV_CABLE,
                  })
                }
              />
            </SpaceBetween>
          </div>

          {/* SECURITY */}
          <div className="ion-margin-vertical ion-padding-horizontal">
            <SpaceBetween>
              <small>Security</small>
              <IonCheckbox
                mode="ios"
                color="warning"
                value={apartmentDetail?.has_security}
                onIonChange={(e) =>
                  setState({
                    payload: e.detail.checked,
                    type: SET_APARTMENT_HAS_SECURITY,
                  })
                }
              />
            </SpaceBetween>
          </div>

          {/* GYM */}
          <div className="ion-margin-vertical ion-padding-horizontal">
            <SpaceBetween>
              <small>Gym</small>
              <IonCheckbox
                mode="ios"
                color="warning"
                value={apartmentDetail?.has_gym}
                onIonChange={(e) =>
                  setState({
                    payload: e.detail.checked,
                    type: SET_APARTMENT_HAS_GYM,
                  })
                }
              />
            </SpaceBetween>
          </div>

          {/* LAUNDARY */}
          <div className="ion-margin-vertical ion-padding-horizontal">
            <SpaceBetween>
              <small>Laundary</small>
              <IonCheckbox
                mode="ios"
                value={apartmentDetail?.has_laundry}
                color="warning"
                onIonChange={(e) =>
                  setState({
                    payload: e.detail.checked,
                    type: SET_APARTMENT_HAS_LAUNDRY,
                  })
                }
              />
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

          {/* SMOKING ALLOWED */}
          <div className="mt-2 ion-padding-horizontal">
            <SpaceBetween>
              <small>Smoking Allowed</small>
              <IonToggle
                mode="ios"
                color={"warning"}
                checked={apartmentDetail?.smoking_allowed}
                onIonChange={(e) =>
                  setState({
                    payload: e.detail.checked,
                    type: SET_SMOKING_ALLOWED,
                  })
                }
              />
            </SpaceBetween>
          </div>

          {/* PETS ALLOWED */}
          <div className="ion-margin-vertical ion-padding-horizontal">
            <SpaceBetween>
              <small>Pets Allowed</small>
              <IonToggle
                mode="ios"
                color={"warning"}
                checked={apartmentDetail?.pets_allowed}
                onIonChange={(e) =>
                  setState({
                    payload: e.detail.checked,
                    type: SET_PETS_ALLOWED,
                  })
                }
              />
            </SpaceBetween>
          </div>

          {/* CHILDREN ALLOWED */}
          <div className="ion-margin-vertical ion-padding-horizontal">
            <SpaceBetween>
              <small>Children Allowed</small>
              <IonToggle
                mode="ios"
                color={"warning"}
                checked={apartmentDetail?.children_allowed}
                onIonChange={(e) =>
                  setState({
                    payload: e.detail.checked,
                    type: SET_CHILDREN_ALLOWED,
                  })
                }
              />
            </SpaceBetween>
          </div>

          {/* Party ALLOWED */}
          <div className="ion-margin-vertical ion-padding-horizontal">
            <SpaceBetween>
              <small>Party Allowed</small>
              <IonToggle
                mode="ios"
                color={"warning"}
                checked={apartmentDetail?.party_allowed}
                onIonChange={(e) =>
                  setState({
                    payload: e.detail.checked,
                    type: SET_PARTY_ALLOWED,
                  })
                }
              />
            </SpaceBetween>
          </div>

          {/* GUEST ALLOWED */}
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

          {/* NUMBER OF CHILDREN ALLOWED */}
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
              min={0}
              mode="ios"
              onIonChange={(event) =>
                setState({
                  type: SET_NUMBER_OF_CHILDREN,
                  payload: event.detail.value,
                })
              }
            />
          </div>

          {/* NUMBER OF PETS */}
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

          {/* MIN_MAX_NIHGTS */}
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
              id={"minMaxNight"}
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
            <small className="text-muted">
              Default minimum night is 1 and the maximum is 30
            </small>
          </div>

          {/* CHECKIN */}
          <div className="mt-2 ion-padding-horizontal">
            <SpaceBetween>
              <small>CheckIn Time</small>
              <div>
                <IonDatetime
                  presentation="time"
                  className="p-0"
                  color={"warning"}
                  aria-required
                  onIonChange={(e) =>
                    setState({
                      payload: e.detail.value as string,
                      type: SET_CHECK_IN_TIME,
                    })
                  }
                />
              </div>
            </SpaceBetween>
          </div>

          {/* CHECKOUT */}
          <div className="mt-2 ion-padding-horizontal">
            <SpaceBetween>
              <small>Checkout Time</small>
              <div>
                <IonDatetime
                  presentation="time"
                  className="p-0"
                  color={"warning"}
                  aria-required
                  onIonChange={(e) =>
                    setState({
                      payload: e.detail.value as string,
                      type: SET_CHECKOUT_TIME,
                    })
                  }
                />
              </div>
            </SpaceBetween>
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
              className="rounded-5 mt-2 ion-padding grey_bg"
              style={{ backgroundColor: "var(--white-4)", height: "30vh" }}
            >
              <IonTextarea placeholder="Lights out by 10:00pm" />
            </div>
          </div>

          <IonButton
            className="yellow_fill my-5"
            shape="round"
            mode="ios"
            size="large"
            expand="block"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : "Confirm"}
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default ApartmentUpdate;
