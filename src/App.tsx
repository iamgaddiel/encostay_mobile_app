import { Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  book,
  bookOutline,
  chatbubbles,
  home,
  homeOutline,
  person,
  personOutline,
  searchOutline,
  sendOutline,
} from "ionicons/icons";

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
import { Capacitor } from "@capacitor/core";
import { Stripe } from '@capacitor-community/stripe'
import Settings from "./helpers/settings";

setupIonicReact();

const settings = Settings()

const {DEBUG} = settings

// const publishableKey = DEBUG ? process.env.REACT_STRIPE_TEST_PK as string : process.env.REACT_STRIPE_LIVE_PK as string
const publishableKey = process.env.REACT_APP_STRIPE_TEST_PK as string


if (Capacitor.isPluginAvailable('Strip')) {
  Stripe.initialize({ publishableKey })
}

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;


//TODO: request of location to be always active (if location is not turned on the app wouldn't work)
//TODO: same applies for network
//TODO: 