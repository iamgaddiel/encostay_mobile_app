import React, { useReducer, useState } from "react";

import Person from "../../assets/images/man.png";

//css
import "../Me/Me.css";
import {
  IonPage,
  IonContent,
  IonTitle,
  IonIcon,
  IonInput,
  IonButton,
  IonToast,
} from "@ionic/react";
import HeaderTitle from "../../components/HeaderTitle";
import BackHeader from "../../components/BackHeader/BackHeader";
import { pencil } from "ionicons/icons";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../atoms/appAtom";
import { Action } from "../../@types/action";
import { set } from "react-hook-form";
import { updateApiCollectionItem } from "../../helpers/apiHelpers";
import { USERS_COLLECTION } from "../../helpers/keys";
import ProfileImage from "../../components/ProfileImage";

// types
interface UpdateFields {
  name: string;
  email: string;
}

const SET_NAME = "SET_NAME";
const SET_EMAIL = "SET_EMAIL";
const SET_PHONE = "SET_PHONE";

function reducer(state: UpdateFields, { type, payload }: Action) {
  const newState = { ...state };

  switch (type) {
    case SET_NAME:
      newState.name = payload;
      break;

    case SET_EMAIL:
      newState.email = payload;
      break;

    default:
      return newState;
  }

  return newState;
}

const EditProfile = () => {
  const { record: user , token} = useRecoilValue(userAtom);
  const [state, setState] = useReducer(reducer, {
    name: user.name,
    email: user.email,
  });
  const [showToast, setShowToast] = useState({
    enabled: false,
    message: "",
  });

  async function updateUserProfile(
    formEvent: React.FormEvent<HTMLFormElement>
  ) {
    formEvent.preventDefault();
    const { name, email } = state;


    // Error Checking
    if ( name || email === '') {
      setShowToast({
        enabled: true,
        message: "You're Missing a Value, Check And Try Again",
      });
      return
    }


    const formData = {
      ...state,
      phone: user.phone,
      account_type: user.account_type
    }
    
    const { isUpdated, response } = await updateApiCollectionItem(USERS_COLLECTION, user.id, formData, token)
    console.log("🚀 ~ file: EditProfile.tsx:83 ~ EditProfile ~ response:", response)

    if (!isUpdated) {
      setShowToast({
        enabled: true,
        message: "There was an error updating your profile, try again"
      })
      return
    }

    //TODO: Update User Profile online
    //TODO: UPdate App DB User detail (StoreUser)
    //TODO: update User App State value (Recoil)
  }

  return (
    <IonPage>
      <BackHeader title="Profile" backLink="/me" />
      <IonContent className="ion-padding">
        <IonToast
          color={"warning"}
          isOpen={showToast.enabled}
          duration={4000}
          message={showToast.message}
          position="top"
          onDidDismiss={() => setShowToast({
            enabled: false,
            message: ""
          })}
        />
        {/* Profile Preview */}
        <section className="ion-text-center mt-3">

          <ProfileImage className="me_thumbnail" />

          <IonTitle className="mt-3 fs-2">{user.name}</IonTitle>
        </section>

        <section className="mt-4 ion-padding">
          <form onSubmit={updateUserProfile}>
            <div
              className="rounded-4 d-flex align-items-center ion-margin-vertical p-2"
              style={{ backgroundColor: "var(--white-4)" }}
            >
              <IonIcon icon={pencil} className="block" />
              <IonInput
                type="text"
                placeholder="John Doe"
                className="ml-3"
                value={state.name}
                onIonChange={(e) =>
                  setState({
                    type: SET_NAME,
                    payload: e.detail.value,
                  })
                }
              />
            </div>
            <div
              className="rounded-4 d-flex align-items-center ion-margin-vertical p-2"
              style={{ backgroundColor: "var(--white-4)" }}
            >
              <IonIcon icon={pencil} className="block" slot="start" />
              <IonInput
                type="email"
                placeholder="Email"
                className="ml-3"
                value={state.email}
                onIonChange={(e) =>
                  setState({
                    type: SET_EMAIL,
                    payload: e.detail.value,
                  })
                }
              />
            </div>

            <IonButton
              className="yellow_fill mt-5"
              shape="round"
              mode="ios"
              expand="block"
              type="submit"
            >
              Save
            </IonButton>
          </form>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
