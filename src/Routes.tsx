import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { homeOutline, bookOutline, searchOutline, personOutline } from 'ionicons/icons'
import React from 'react'
import { Route } from 'react-router'
import AddPaymentMethod from './screens/AddBankAccount'
import AppartmentSearch from './screens/AppartmentSearch'
import BankAccount from './screens/BankAccount'
import Booking1 from './screens/Booking1'
import Booking2 from './screens/Booking2'
import Booking3 from './screens/Booking3'
import Booking4 from './screens/Booking4'
import BookingPreview from './screens/BookingPreview'
import CancellationSurvey from './screens/CancellationSurvey/CancellationSurvey'
import ChangePassword from './screens/ChangePassword/ChangePassword'
import ContactSupport from './screens/ContactSupport'
import Dashboard from './screens/Dashboard'
import EditProfile from './screens/EditProfile'
import Filter from './screens/Filter'
import Home from './screens/Home'
import HomeDetail from './screens/HomeDetail'
import Landing from './screens/Landing'
import Login from './screens/Login'
import MangeBooking from './screens/MangeBooking'
import MangeBookingPreivew from './screens/MangeBookingPreivew'
import Me from './screens/Me'
import OnBoardidng from './screens/OnBoardidng'
import Passwords from './screens/Passwords'
import PaymentConfirmed from './screens/PaymentConfirmed/PaymentConfirmed'
import PaymentProcessing from './screens/PaymentProcessing'
import Register from './screens/Register'
import Transactions from './screens/Transactions'
import WithdrawConfirm from './screens/WithdrawConfirm'
import WithdrawReceiving from './screens/WithdrawReceiving'
import Withdrawal from './screens/Withdraw'
import { useRecoilValue } from 'recoil'
import { utilsAtom } from './atoms/utilityAtom'
import Appartments from './screens/Appartments/Appartments'
import AddApartments from './screens/AddApartments/AddApartments'
import HostApartmentDetail from './screens/HostApartmentDetail/HostApartmentDetail'
import ApartmentUpdate from './screens/ApartmentUpdate/ApartmentUpdate'
import HostAcceptOrDecline from './screens/HostAcceptOrDecline/HostAcceptOrDecline'
import AddBankAccount from './screens/AddBankAccount'

const Routes = () => {
    const { showTabs } = useRecoilValue(utilsAtom)
    //FIXME: correct apartment spelling

    return (
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
            <Route exact path="/add_bank" render={() => <AddBankAccount />} />
            <Route exact path="/transactions" render={() => <Transactions />} />
            <Route exact path="/withdraw" render={() => <Withdrawal />} />
            <Route exact path="/withdraw_receiving" render={() => <WithdrawReceiving />} />
            <Route exact path="/withdraw_confirm" render={() => <WithdrawConfirm />} />
            <Route exact path="/appartments" render={() => <Appartments />} />
            <Route exact path="/add_apartment" render={() => <AddApartments />} />
            <Route exact path="/host/apartment/detail/:apartmentId" render={() => <HostApartmentDetail />} />
            <Route exact path="/host/apartment/update/:apartmentId" render={() => <ApartmentUpdate />} />
            <Route exact path="/host/booking/preview/:bookingId" render={() => <HostAcceptOrDecline />} />

            {
                showTabs ? (
                    <IonTabs>
                        <IonRouterOutlet>
                            <Route exact path="/host/booking/preview/:bookingId" render={() => <HostAcceptOrDecline />} />
                            <Route exact path="/host/apartment/update/:apartmentId" render={() => <ApartmentUpdate />} />
                            <Route exact path="/host/apartment/detail/:apartmentId" render={() => <HostApartmentDetail />} />
                            <Route exact path="/add_apartment" render={() => <AddApartments />} />
                            <Route exact path="/appartments" render={() => <Appartments />} />
                            <Route exact path="/withdraw_confirm" render={() => <WithdrawConfirm />} />
                            <Route exact path="/withdraw_receiving" render={() => <WithdrawReceiving />} />
                            <Route exact path="/withdraw" render={() => <Withdrawal />} />
                            <Route exact path="/transactions" render={() => <Transactions />} />
                            <Route exact path="/add_bank" render={() => <AddBankAccount />} />
                            <Route exact path="/bank_account" render={() => <BankAccount />} />
                            <Route exact path="/contact_support" render={() => <ContactSupport />} />
                            <Route exact path="/edit_profile" render={() => <EditProfile />} />
                            <Route exact path="/change_password" render={() => <ChangePassword />} />
                            <Route exact path="/booking_cancellation_survey/:bookingId" render={() => <CancellationSurvey />} />
                            <Route exact path="/manage_booking_preview/:bookingId" render={() => <MangeBookingPreivew />} />
                            <Route exact path="/manage_bookings" render={() => <MangeBooking />} />
                            <Route exact path="/payment_confirm" render={() => <PaymentConfirmed />} />
                            <Route exact path="/payment_prcessing" render={() => <PaymentProcessing />} />
                            <Route exact path="/booking_step_4" render={() => <Booking4 />} />
                            <Route exact path="/booking_step_3" render={() => <Booking3 />} />
                            <Route exact path="/booking_step_2" render={() => <Booking2 />} />
                            <Route exact path="/booking_step_1" render={() => <Booking1 />} />
                            <Route exact path="/apartment_preview/:id" render={() => <BookingPreview />} />
                            <Route exact path="/apartment/:apartmentId" render={() => <HomeDetail />} />
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

                        <IonTabBar slot="bottom" className='ion-padding-vertical'>
                            <IonTabButton tab="tab1" href="/home">
                                <IonIcon icon={homeOutline} />
                                <IonLabel>
                                    <small>Home</small>
                                </IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="tab2" href="/manage_bookings">
                                <IonIcon icon={bookOutline} />
                                <IonLabel>
                                    <small>Bookings</small>
                                </IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="tab3" href="/apartment_search">
                                <IonIcon icon={searchOutline} />
                                <IonLabel>
                                    <small>Search</small>
                                </IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="tab4" href="/me">
                                <IonIcon icon={personOutline} />
                                <IonLabel>
                                    <small>Profile</small>
                                </IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs>
                ) : null
            }
        </IonReactRouter>
    )
}

export default Routes