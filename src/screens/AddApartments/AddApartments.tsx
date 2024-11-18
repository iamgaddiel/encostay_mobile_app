import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonInput,
  IonToggle,
  IonLabel,
  IonPage,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonImg,
  IonToast,
  IonDatetime,
  IonAlert,
  useIonRouter,
} from "@ionic/react";
import React, { useReducer, useRef, useState } from "react";
import BackHeader from "../../components/BackHeader/BackHeader";
import SpaceBetween from "../../components/style/SpaceBetween";
import { Camera, CameraResultType } from "@capacitor/camera";

// css
import "./AddApartments.css";
import { addApartmentReducer } from "../../reducers/functions/addApartment";
import { warningOutline } from "ionicons/icons";
import {
  SET_NUMBER_OF_BEDS,
  SET_NUMBER_OF_BATHROOMS,
  SET_NUMBER_OF_GUESTS,
  SET_NUMBER_OF_CHILDREN,
  SET_NUMBER_OF_PETS,
  SET_MIN_MAx_NIGHTS,
  SET_APARTMENT_TITLE,
  SET_APARTMENT_DESCRIPTION,
  SET_APARTMENT_ADDRESS,
  SET_APARTMENT_CITY_LOCATION,
  SET_APARTMENT_STATE_LOCATION,
  SET_APARTMENT_COUNTRY_LOCATION,
  SET_APARTMENT_HAS_WIFI,
  SET_APARTMENT_HAS_TV_CABLE,
  SET_APARTMENT_HAS_SECURITY,
  SET_APARTMENT_HAS_GYM,
  SET_APARTMENT_HAS_LAUNDRY,
  SET_CHILDREN_ALLOWED,
  SET_PETS_ALLOWED,
  SET_SMOKING_ALLOWED,
  SET_PARTY_ALLOWED,
  SET_APARTMENT_TYPE,
  SET_CHECK_IN_TIME,
  SET_CHECKOUT_TIME,
  SET_NUMBER_OF_ROOMS,
  SET_APARTMENT_IMAGE_1,
  SET_APARTMENT_IMAGE_2,
  SET_APARTMENT_IMAGE_3,
  SET_PRICE_PER_NIGHT,
} from "../../reducers/actions/addApartmentsActions";
import ImagePlaceholder from "../../assets/images/insert-picture-icon.png";
import { Toast } from "../../@types/toast";
import { createApiCollection } from "../../helpers/apiHelpers";
import { StoredUser } from "../../@types/users";
import { getSaveData } from "../../helpers/storageSDKs";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../atoms/appAtom";
import { imageKitAtom } from "../../atoms/imagekitAtom"; 
import { APARTMENTS_COLLECTION, IMAGEKIT_CONFIG } from "../../helpers/keys";
import { ImageKitType } from "../../@types/imagekit";

const AddApartments = () => {
  //FIXME: loading on form submission not working
  //FIXME: transition to the host apartment screen after submission successful

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
    additional_rules: "",
    price: 0,
    images: [],
  });

  const [toastParam, setToastParam] = useState<Toast>({
    enabled: false,
    message: "",
    type: "warning",
  });

  const { record: user, token } = useRecoilValue(userAtom) as StoredUser;
  const apartmentImageOne = useRef<HTMLIonImgElement | null>(null);
  const apartmentImageTwo = useRef<HTMLIonImgElement | null>(null);
  const apartmentImageThree = useRef<HTMLIonImgElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [showAlert, setShowAlert] = useState(false)

  const imagekit = useRecoilValue(imageKitAtom)

  const router = useIonRouter()






  async function submitForm(
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
     * submitted the database.
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
          "You might have forgotten to set your check-in or Checkout time",
          true
        );
        setLoading(() => false);
        return;
      }



    } catch (err: unknown) {
      setLoading(() => false);
    }

    setShowAlert(true)
    setLoading(() => false);
  }

  async function uploadImageToImageKit(images: string[]) {
    const imageKitResponseStrings: string[] = []; // stores the image strings returned from imagekit
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
        imageKitResponseStrings.push(imageURL);
      });
    } catch (err: any) {
      console.error(err);
      return;
    }

    return imageKitResponseStrings;
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
      <BackHeader title="Add Apartment" backLink="/apartments" />
      <IonContent className="ion-padding" fullscreen>
        <IonAlert
          isOpen={showAlert}
          title="Success"
          header="Success"
          mode="ios"
          subHeader="Your apartment has been added successful"
          buttons={
            [
              {
                text: 'Okay',
                handler: () => router.push('/apartments')
              }
            ]
          }
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

        {/* {showImages ? (
 
        ) : null} */}



        <form method="post" onSubmit={submitForm}>

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

export default AddApartments;
