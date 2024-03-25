import {
  setupIonicReact,
} from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./global.css";

// App Css
import "./App.css";

// import Swiper JS
// import Swiper styles
import "swiper/css";

// import boostrap
import "bootstrap/dist/css/bootstrap.min.css";
import "react-owl-carousel2/lib/styles.css";

import Routes from "./Routes";
import { RecoilRoot } from "recoil";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { IKContext } from 'imagekitio-react';
import Settings from "./helpers/settings";




setupIonicReact();

const { serverBaseUrl } = Settings()

// Image Kit Config
const imageKitUrl = 'https://ik.imagekit.io/encostayapp/'

const imageKitPublicKey = 'public_PgfsRhl7aeYS3xr0YkO5PdwQzI0='

const imageKitAuthenticator = async () => {
  try {
    const response = await fetch(`${serverBaseUrl}/image_kit/auth`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error?.message}`);
  }
};





const App: React.FC = () => {

  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <IKContext publicKey={imageKitPublicKey}
          urlEndpoint={imageKitUrl}
          authenticator={imageKitAuthenticator} >
          <Routes />
        </IKContext>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;


//TODO: request of location to be always active (if location is not turned on the app wouldn't work)
//TODO: same applies for network
//TODO: protect pocketbase ListAppConfig endpoint
