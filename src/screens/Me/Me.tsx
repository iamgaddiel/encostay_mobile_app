import { IonCard, IonCardContent, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonText, IonThumbnail, IonTitle } from '@ionic/react'
import React from 'react'
import BackHeaderNoTitle from '../../components/BackHeaderNoTitle/BackHeaderNoTitle'
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle'


import Person from "../../assets/images/man.png"

import "./Me.css"
import { buildOutline, call, card, ellipse, heart, heartOutline, lockClosed, lockOpenOutline, logOut, logOutOutline, person, personOutline, save } from 'ionicons/icons'
import { clearData } from '../../helpers/storageSDKs'
import { APP_CONFIG, IMAGEKIT_CONFIG, SELECTED_BOOKING_FOR_CANCELATION, USER } from '../../helpers/keys'
import { useHistory } from 'react-router'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { utilsAtom } from '../../atoms/utilityAtom'
import { userAtom } from '../../atoms/appAtom'




const Me = () => {
  const history = useHistory()

  const setShowTabs = useSetRecoilState(utilsAtom)
  const { record: user } = useRecoilValue(userAtom)



  async function logOutUser() {
    clearData(USER)
    clearData(SELECTED_BOOKING_FOR_CANCELATION)
    clearData(APP_CONFIG)
    clearData(IMAGEKIT_CONFIG)
    setShowTabs({ showTabs: false })
    history.push('/login')
  }



  return (
    <IonPage>
      <HeaderTitle title='Profile' />
      <IonContent className='ion-padding'>

        {/* Profile Preview */}
        <section className="ion-text-center mt-3">
          <div className="me_thumbnail" style={{ backgroundImage: `url(${Person})` }}></div>

          <IonTitle className='mt-3 fs-2'>{user.name}</IonTitle>
          <small className="text-center text-muted">{user.email}</small>
        </section>

        <section className="mt-4">
          <IonList lines='none'>
            <IonItem className="ion-no-margin" mode="ios" routerDirection='forward' routerLink='/edit_profile'>
              <div className="d-flex align-items-center">
                <IonIcon icon={person} color='warning' size='large' />
                <IonText className='ml-5'>Edit Profile</IonText>
              </div>
            </IonItem>
            <IonItem className="ion-no-margin" mode='ios' routerDirection='forward' routerLink='/favorites'>
              <div className="d-flex align-items-center">
                <IonIcon icon={heart} color='warning' size='large' />
                <IonText className='ml-5'>Favorites</IonText>
              </div>
            </IonItem>
            <IonItem className="ion-no-margin" mode="ios" routerDirection='forward' routerLink='/change_password'>
              <div className="d-flex align-items-center">
                <IonIcon icon={lockClosed} color='warning' size='large' />
                <IonLabel className='ml-5'>Change Password</IonLabel>
              </div>
            </IonItem>
            {/* {
              user.account_type === 'host' && ( */}
            <IonItem className="ion-no-margin" mode="ios" routerDirection='forward' routerLink='/bank_account'>
              <div className="d-flex align-items-center">
                <IonIcon icon={card} color='warning' size='large' />
                <IonLabel className='ml-5'>Bank Account</IonLabel>
              </div>

            </IonItem>
            {/* )
            } */}
            <IonItem className="ion-no-margin" mode="ios" routerDirection='forward' routerLink='/contact_support'>
              <div className="d-flex align-items-center">
                <IonIcon icon={call} color='warning' size='large' />
                <IonLabel className='ml-5'>Contact Support</IonLabel>
              </div>
            </IonItem>
            {/* <IonItem className="ion-no-padding ion-no-margin">
              <IonCard className='w-100 rounded-4' mode="ios" color={"danger"} onClick={logOutUser}>
                <IonCardContent>
                  <div className="d-flex align-items-center">
                    <IonIcon icon={logOut} color='light' size='large' />
                    <IonLabel className='fs-5 ml-5'>Logout</IonLabel>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonItem> */}
          </IonList>

          <IonList lines='none'>
            <IonItem className="ion-no-margin" mode="ios" onClick={logOutUser}>
              <div className="d-flex align-items-center ion-text-danger">
                <IonIcon icon={logOutOutline} color='danger' size='large' />
                <IonText className='ml-5'>Logout</IonText>
              </div>
            </IonItem>
          </IonList>
        </section>
      </IonContent>
    </IonPage>
  )
}

export default Me