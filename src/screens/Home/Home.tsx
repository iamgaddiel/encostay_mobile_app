import { useState } from "react";

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
import { useHistory } from "react-router";
import { AppConfig, AppConfigList } from "../../@types/appConfig";
import { appConfigAtom } from "../../atoms/appConfigAtom";
import Settings from "../../helpers/settings";
import { _post } from "../../helpers/api";
import { serverLog } from "../../helpers/utils";
import { useIonViewDidEnter } from "@ionic/react";

const Home = () => {
  const history = useHistory()
  const { serverBaseUrl } = Settings()
  // ----------------- States -----------------------

  // TODO: add placeholder while fetching user images

  const [userRecord, setUesrRecrod] = useState<UserCollectionType | null>(null);
  const setAppUserObject = useSetRecoilState(userAtom);
  const setAppConfig = useSetRecoilState(appConfigAtom)


  useIonViewDidEnter(() => {
    getUserDetails();
  }, []);


  async function getUserDetails() {
    const { record, token } = await getSaveData(USER) as StoredUser;

    setUesrRecrod(record); // set user component level state to get user account type
    getAppConfig(token);
    setAppUserObject({ token, record }); // set app levle user state
  }


  async function getAppConfig(userToken: string) {
    try {
      const { data: configList } = await listApiCollection(APP_CONFIG_COLLECTION, userToken) as { data: AppConfigList }
      const appConfig = configList?.items[0]

      saveData(APP_CONFIG, appConfig);
      setAppConfig(appConfig)


    } catch (error) {
      serverLog({
        file: 'Home.tsx',
        errorMessage: error,
        lineNumber: '72'
      })
    }
  }


 
  if (userRecord?.account_type === "host") {
    return <HostAccount />;
  }

  return <GuestsAccount />;
};

export default Home;
