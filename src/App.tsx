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

// all other imports
import Landing from './screens/Landing';
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard/Dashboard';
import Me from './screens/Me';


//signals
// import { showTabs } from "./atoms/settingsAtom"
import { useRecoilValue } from "recoil"
import OnBoardidng from './screens/OnBoardidng/OnBoardidng';
import Passwords from './screens/Passwords/Passwords';
import Home from './screens/Home/Home';


// splide
import "@splidejs/react-splide/css";
import { RecoilRoot } from 'recoil';
import { showTabs } from './signals/settingsSignals';
import Filter from './screens/Filter/Filter';
import AppartmentSearch from './screens/AppartmentSearch/AppartmentSearch';
import HomeDetail from './screens/HomeDetail/HomeDetail';
import BookingPreview from './screens/BookingPreview/BookingPreview';
import Booking1 from './screens/Booking1/Booking1';
import Booking2 from './screens/Booking2/Booking2';
import Booking3 from './screens/Booking3';
import Booking4 from './screens/Booking4/Booking4';
import PaymentProcessing from './screens/PaymentProcessing/PaymentProcessing';
import PaymentConfirmed from './screens/PaymentConfirmed/PaymentConfirmed';
import MangeBooking from './screens/MangeBooking/MangeBooking';
import MangeBookingPreivew from './screens/MangeBookingPreivew/MangeBookingPreivew';
import CancellationSurvey from './screens/CancellationSurvey/CancellationSurvey';
import ChangePassword from './screens/ChangePassword/ChangePassword';
import EditProfile from './screens/EditProfile/EditProfile';
import ContactSupport from './screens/ContactSupport/ContactSupport';
import BankAccount from './screens/BankAccount/BankAccount';
import AddPaymentMethod from './screens/AddPaymentMethod/AddPaymentMethod';
import Transactions from './screens/Transactions/Transactions';
import Withdrawal from './screens/Withdrawal/Withdrawal';
import WithdrawReceiving from './screens/WithdrawReceiving/WithdrawReceiving';
import WithdrawConfirm from './screens/WithdrawConfirm/WithdrawConfirm';




setupIonicReact();

const App: React.FC = () => {

  // showTabs.value = true

  return (
    <RecoilRoot>
      <IonReactRouter>

        <Route exact path="/" render={() => <Landing />} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/register" render={() => <Register />} />
        <Route exact path="/dashboard" render={() => <Dashboard />} />
        <Route exact path="/home" render={() => <Home />} />
        <Route exact path="/me" render={() => <Me />} />
        <Route exact path="/onboarding" render={() => <OnBoardidng />} />
        <Route exact path="/passwords" render={() => <Passwords />} />
        <Route exact path="/filter" render={() => <Filter />} />
        <Route exact path="/apartment_search" render={() => <AppartmentSearch />} />
        <Route exact path="/apartment/:id" render={() => <HomeDetail />} />
        <Route exact path="/apartment_preview/:id" render={() => <BookingPreview />} />
        <Route exact path="/booking_step_1" render={() => <Booking1 />} />
        <Route exact path="/booking_step_2" render={() => <Booking2 />} />
        <Route exact path="/booking_step_3" render={() => <Booking3 />} />
        <Route exact path="/booking_step_4" render={() => <Booking4 />} />
        <Route exact path="/payment_prcessing" render={() => <PaymentProcessing />} />
        <Route exact path="/payment_confirm" render={() => <PaymentConfirmed />} />
        <Route exact path="/manage_bookings" render={() => <MangeBooking />} />
        <Route exact path="/manage_booking_preview/:bookingId" render={() => <MangeBookingPreivew />} />
        <Route exact path="/booking_cancellation_survey/:bookingId" render={() => <CancellationSurvey />} />
        <Route exact path="/change_password" render={() => <ChangePassword />} />
        <Route exact path="/edit_profile" render={() => <EditProfile />} />
        <Route exact path="/contact_support" render={() => <ContactSupport />} />
        <Route exact path="/bank_account" render={() => <BankAccount />} />
        <Route exact path="/add_card" render={() => <AddPaymentMethod />} />
        <Route exact path="/transactions" render={() => <Transactions />} />
        <Route exact path="/withdraw" render={() => <Withdrawal />} />
        <Route exact path="/withdraw_receiving" render={() => <WithdrawReceiving />} />
        <Route exact path="/withdraw_confirm" render={() => <WithdrawConfirm />} />


        {
          showTabs.value ? (
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/withdraw_confirm" render={() => <WithdrawConfirm />} />
                <Route exact path="/withdraw_receiving" render={() => <WithdrawReceiving />} />
                <Route exact path="/withdraw" render={() => <Withdrawal />} />
                <Route exact path="/transactions" render={() => <Transactions />} />
                <Route exact path="/add_card" render={() => <AddPaymentMethod />} />
                <Route exact path="/bank_account" render={() => <BankAccount />} />
                <Route exact path="/contact_support" render={() => <ContactSupport />} />
                <Route exact path="/edit_profile" render={() => <EditProfile />} />
                <Route exact path="/change_password" render={() => <ChangePassword />} />
                <Route exact path="/booking_cancellation_survey/:bookingId" render={() => <CancellationSurvey />} />
                <Route exact path="/manage_booking_preview" render={() => <MangeBookingPreivew />} />
                <Route exact path="/manage_bookings" render={() => <MangeBooking />} />
                <Route exact path="/payment_confirm" render={() => <PaymentConfirmed />} />
                <Route exact path="/payment_prcessing" render={() => <PaymentProcessing />} />
                <Route exact path="/booking_step_4" render={() => <Booking4 />} />
                <Route exact path="/booking_step_3" render={() => <Booking3 />} />
                <Route exact path="/booking_step_2" render={() => <Booking2 />} />
                <Route exact path="/booking_step_1" render={() => <Booking1 />} />
                <Route exact path="/apartment_preview/:id" render={() => <BookingPreview />} />
                <Route exact path="/apartment/:id" render={() => <HomeDetail />} />
                <Route exact path="/apartment_search" render={() => <AppartmentSearch />} />
                <Route exact path="/filter" render={() => <Filter />} />
                <Route exact path="/login" render={() => <Login />} />
                <Route exact path="/register" render={() => <Register />} />
                <Route exact path="/dashboard" render={() => <Dashboard />} />
                <Route exact path="/home" render={() => <Home />} />
                <Route exact path="/me" render={() => <Me />} />
                <Route exact path="/onboarding" render={() => <OnBoardidng />} />
                <Route exact path="/passwords" render={() => <Passwords />} />
              </IonRouterOutlet>

              <IonTabBar slot="bottom">
                <IonTabButton tab="tab1" href="/home">
                  <IonIcon icon={homeOutline} />
                </IonTabButton>
                <IonTabButton tab="tab2" href="/manage_bookings">
                  <IonIcon icon={bookOutline} />
                </IonTabButton>
                <IonTabButton tab="tab3" href="/apartment_search">
                  <IonIcon icon={searchOutline} />
                </IonTabButton>
                <IonTabButton tab="tab4" href="/me">
                  <IonIcon icon={personOutline} />
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          ) : null
        }
      </IonReactRouter>
    </RecoilRoot>
  )
};

export default App;
