import { IonCard, IonCardContent, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonThumbnail, IonTitle } from '@ionic/react'
import React from 'react'
import BackHeaderNoTitle from '../../components/BackHeaderNoTitle/BackHeaderNoTitle'
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle'


import Person from "../../assets/images/man.png"

import "./Me.css"
import { ellipse, logOut } from 'ionicons/icons'
import { clearData } from '../../helpers/storageSDKs'
import { USER } from '../../helpers/keys'
import { useHistory } from 'react-router'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { utilsAtom } from '../../atoms/utilityAtom'
import { userAtom } from '../../atoms/appAtom'




const Me = () => {
  const history = useHistory()

  const setShowTabs = useSetRecoilState(utilsAtom)
  const {record: user} = useRecoilValue(userAtom)



  async function logOutUser() {
    clearData(USER)
    setShowTabs({ showTabs: false})
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
        </section>

        <section className="mt-4">
          <IonList lines='none'>
            <IonItem className="ion-no-padding ion-no-margin">
              <IonCard className='w-100 rounded-4' mode="ios" routerDirection='forward' routerLink='/edit_profile'>
                <IonCardContent>
                  <div className="d-flex align-items-center">
                    <IonIcon icon={ellipse} color='warning' />
                    <IonLabel className='fs-5 ml-5'>Edit Profile</IonLabel>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonItem>
            <IonItem className="ion-no-padding ion-no-margin">
              <IonCard className='w-100 rounded-4' mode="ios" routerDirection='forward' routerLink='/change_password'>
                <IonCardContent>
                  <div className="d-flex align-items-center">
                    <IonIcon icon={ellipse} color='warning' />
                    <IonLabel className='fs-5 ml-5'>Change Password</IonLabel>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonItem>
            <IonItem className="ion-no-padding ion-no-margin">
              <IonCard className='w-100 rounded-4' mode="ios" routerDirection='forward' routerLink='/bank_account'>
                <IonCardContent>
                  <div className="d-flex align-items-center">
                    <IonIcon icon={ellipse} color='warning' />
                    <IonLabel className='fs-5 ml-5'>Bank Account</IonLabel>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonItem>
            <IonItem className="ion-no-padding ion-no-margin">
              <IonCard className='w-100 rounded-4' mode="ios" routerDirection='forward' routerLink='/contact_support'>
                <IonCardContent>
                  <div className="d-flex align-items-center">
                    <IonIcon icon={ellipse} color='warning' />
                    <IonLabel className='fs-5 ml-5'>Contact Support</IonLabel>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonItem>
            <IonItem className="ion-no-padding ion-no-margin">
              <IonCard className='w-100 rounded-4' mode="ios" color={"danger"} onClick={logOutUser}>
                <IonCardContent>
                  <div className="d-flex align-items-center">
                    <IonIcon icon={logOut} color='light' size='large' />
                    <IonLabel className='fs-5 ml-5'>Logout</IonLabel>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonItem>
          </IonList>
        </section>
      </IonContent>
    </IonPage>
  )
}

export default Me