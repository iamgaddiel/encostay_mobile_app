import { useEffect, useState } from "react";

// images
import Man from "../../assets/images/man.png";

// css
import "./Home.css";

import GuestsAccount from "../../components/GuestAccount/GuestAccount";
import HostAccount from "../../components/HostAccount/HostAccount";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtom } from "../../atoms/appAtom";
import { IonSkeletonText } from "@ionic/react";
import SpaceBetween from "../../components/style/SpaceBetween";
import { getSaveData, saveData } from "../../helpers/storageSDKs";
import {
  IMAGEKIT_COLLECTION,
  IMAGEKIT_CONFIG,
  USER,
} from "../../helpers/keys";
import { StoredUser, UserCollectionType } from "../../@types/users";
import { getApiCollectionItem } from "../../helpers/apiHelpers";
import ImageKit from "imagekit";
import { ImageKitType } from "../../@types/imagekit";
import { imageKitAtom } from "../../atoms/imagekitAtom";

const Home = () => {
  // ----------------- States -----------------------
  // TODO: add palceholder while fetching user images

  const [userRecord, setUesrRecrod] = useState<UserCollectionType | null>(null);
  const setAppUserObject = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(true);
  const  setImageKitAtomConfig = useSetRecoilState(imageKitAtom)


  useEffect(() => {
    getUserDetails();
  }, []);


  async function getUserDetails() {
    const { record, token } = (await getSaveData(USER)) as StoredUser;

    setUesrRecrod(record); // set user component level state to get user account type
    getImageKitConfig(token);
    setAppUserObject({ token, record }); // set app levle user state
    setLoading(false);
  }

  async function getImageKitConfig(userToken: string) {
    const collectionId = "xhc7u3mxyfmg1f4"
    const { response, error } = await getApiCollectionItem(
      IMAGEKIT_COLLECTION,
      collectionId,
      userToken
    );

    if (error) {
      //TODO: display a error message to the user if theres an error fetching config
      console.warn("🚀 ~ file: Home.tsx:58 ~ getImageKitConfig ~ error:", error)
      return;
    }

    saveData(IMAGEKIT_CONFIG, response); // save imagekit config to Application's database
    const imageKit: ImageKit = new ImageKit(response as ImageKitType) // init ImageKit
    setImageKitAtomConfig(imageKit) // set imageKit object globally
  }

  if (userRecord?.account_type === "host") {
    return <HostAccount userImage={Man} />;
  }
  if (userRecord?.account_type === "guest") {
    return <GuestsAccount userImage={Man} />;
  }

  return (
    <div className="ion-padding">
      {loading ? (
        <>
          <div>
            <IonSkeletonText
              animated
              style={{ width: "100%", height: "200px" }}
              className="rounded-4"
            />
            <IonSkeletonText
              animated
              style={{ width: "95%", height: "10px" }}
              className="mt-3"
            />
            <IonSkeletonText
              animated
              style={{ width: "80%", height: "10px" }}
              className="mt-3"
            />
            <IonSkeletonText
              animated
              style={{ width: "90%", height: "10px" }}
              className="mt-3"
            />
            <IonSkeletonText
              animated
              style={{ width: "80%", height: "10px" }}
              className="mt-3"
            />
            <IonSkeletonText
              animated
              style={{ width: "90%", height: "10px" }}
              className="mt-3"
            />
            <SpaceBetween className="mt-4">
              <IonSkeletonText
                animated
                style={{ width: "40%", height: "60px" }}
                className="rounded-4"
              />
              <IonSkeletonText
                animated
                style={{ width: "40%", height: "60px" }}
                className="rounded-4"
              />
            </SpaceBetween>
          </div>
          <div className="mt-5">
            <IonSkeletonText
              animated
              style={{ width: "100%", height: "200px" }}
              className="rounded-4"
            />
            <IonSkeletonText
              animated
              style={{ width: "95%", height: "10px" }}
              className="mt-3"
            />
            <IonSkeletonText
              animated
              style={{ width: "80%", height: "10px" }}
              className="mt-3"
            />
            <IonSkeletonText
              animated
              style={{ width: "90%", height: "10px" }}
              className="mt-3"
            />
            <IonSkeletonText
              animated
              style={{ width: "80%", height: "10px" }}
              className="mt-3"
            />
            <IonSkeletonText
              animated
              style={{ width: "90%", height: "10px" }}
              className="mt-3"
            />
            <SpaceBetween className="mt-4">
              <IonSkeletonText
                animated
                style={{ width: "40%", height: "60px" }}
                className="rounded-4"
              />
              <IonSkeletonText
                animated
                style={{ width: "40%", height: "60px" }}
                className="rounded-4"
              />
            </SpaceBetween>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Home;
