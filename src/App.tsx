import { Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { book, bookOutline, chatbubbles, home, homeOutline, person, personOutline, searchOutline, sendOutline } from 'ionicons/icons';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './global.css'


// App Css
import "./App.css"



// import Swiper JS
// import Swiper styles
import 'swiper/css';


// import boostrap
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-owl-carousel2/lib/styles.css"

import Routes from './Routes';
import { RecoilRoot } from 'recoil';


setupIonicReact();

const App: React.FC = () => {
  return (

    <RecoilRoot>
      <Routes />
    </RecoilRoot>
  )
};

export default App;
