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
import { book, chatbubbles, home, person } from 'ionicons/icons';


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


// import Swiper JS
// import Swiper styles
import 'swiper/css';


// import boostrap
import 'bootstrap/dist/css/bootstrap.min.css';

// all other imports
import Landing from './screens/Landing';
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard/Dashboard';
import Me from './screens/Me';


//signals
import { showTabs } from "./signals/settingsSignals"
import OnBoardidng from './screens/OnBoardidng/OnBoardidng';



setupIonicReact();

const App: React.FC = () => {
  // const { showTabs } = useContext(SettingsContext) as SettingsContextType

  // const showTabs = false;



  return (
    <IonApp>
      <IonReactRouter>

        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/me">
          <Me />
        </Route>
        <Route exact path="/onboarding">
          <OnBoardidng />
        </Route>



        {
          showTabs?.value ? (
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/">
                  <Landing />
                </Route>.l,ll
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/register">
                  <Register />
                </Route>
                <Route exact path="/dashboard">
                  <Dashboard />
                </Route>
                <Route exact path="/me">
                  <Me />
                </Route>
                <Route exact path="/onboarding">
                  <OnBoardidng />
                </Route>
              </IonRouterOutlet>

              <IonTabBar slot="bottom">
                <IonTabButton tab="tab1" href="/dashboard">
                  <IonIcon icon={home} />
                </IonTabButton>
                <IonTabButton tab="tab2" href="/materials">
                  <IonIcon icon={book} />
                </IonTabButton>
                <IonTabButton tab="tab3" href="/feed">
                  <IonIcon icon={chatbubbles} />
                </IonTabButton>
                <IonTabButton tab="tab4" href="/me">
                  <IonIcon icon={person} />
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          ) : null
        }
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
