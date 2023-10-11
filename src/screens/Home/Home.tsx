import { useEffect, useState } from "react";

// images
import Man from "../../assets/images/man.png";

// css
import "./Home.css";

import GuestsAccount from "../../components/GuestAccount/GuestAccount";
import HostAccount from "../../components/HostAccount/HostAccount";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../../atoms/appAtom";
import { getSaveData, saveData } from "../../helpers/storageSDKs";
import {
  APP_CONFIG,
  APP_CONFIG_COLLECTION,
  IMAGEKIT_CONFIG,
  USER,
} from "../../helpers/keys";
import { StoredUser, UserCollectionType } from "../../@types/users";
import { listApiCollection } from "../../helpers/apiHelpers";
import ImageKit from "imagekit";
import { ImageKitType } from "../../@types/imagekit";
import { imageKitAtom } from "../../atoms/imagekitAtom";
import { useHistory } from "react-router";
import { AppConfig, AppConfigList } from "../../@types/appConfig";
import { appConfigAtom } from "../../atoms/appConfigAtom";

const Home = () => {
  const history = useHistory()
  // ----------------- States -----------------------

  // TODO: add palceholder while fetching user images

  const [userRecord, setUesrRecrod] = useState<UserCollectionType | null>(null);
  const setAppUserObject = useSetRecoilState(userAtom);
  const setImageKitAtomConfig = useSetRecoilState(imageKitAtom)
  const setAppConfig = useSetRecoilState(appConfigAtom)


  useEffect(() => {
    getUserDetails();
  }, []);


  async function getUserDetails() {
    const { record, token } = (await getSaveData(USER)) as StoredUser;

    setUesrRecrod(record); // set user component level state to get user account type
    getAppConfig(token);
    setAppUserObject({ token, record }); // set app levle user state
  }


  async function getAppConfig(userToken: string) {
    const { data: configList } = await listApiCollection(APP_CONFIG_COLLECTION, userToken) as { data: AppConfigList }
    const appConfig = configList.items[0]

    saveData(APP_CONFIG, appConfig);
    setAppConfig(appConfig)

    setImageKitConfig(appConfig)
  }


  async function setImageKitConfig(appConfig: AppConfig) {

    const { imgkit_pk, imgkit_sk, imgkit_url } = appConfig

    const imageKitConfig: ImageKitType = {
      publicKey: imgkit_pk,
      privateKey: imgkit_sk,
      urlEndpoint: imgkit_url
    }

    // if (error) {
    //   //TODO: display a error message to the user if theres an error fetching config
    //   console.warn("🚀 ~ file: Home.tsx:58 ~ getImageKitConfig ~ error:", error)
    //   return;
    // }

    saveData(IMAGEKIT_CONFIG, imageKitConfig); // save imagekit config to Application's database
    const imageKit: ImageKit = new ImageKit(imageKitConfig) // init ImageKit
    setImageKitAtomConfig(imageKit) // set imageKit object globally
  }

  if (userRecord?.account_type === "host") {
    return <HostAccount userImage={Man} />;
  }

  return <GuestsAccount userImage={Man} />;
};

export default Home;
