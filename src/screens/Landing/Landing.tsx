import { IonButton, IonContent, IonImg, IonPage } from '@ionic/react'
import { useEffect, useState } from 'react'

// import { showTabs } from "../../atoms/settingsAtom"
import { useRecoilState } from "recoil"


// images
import Logo from "../../assets/images/logo.png"
import Overlay from "../../assets/images/Oval.png"


// style
import "./Landidng.css"
import { utilsAtom } from '../../atoms/utilityAtom'
import { LAUNCH_STATUS, USER } from '../../helpers/keys'
import { getSaveData, saveData } from '../../helpers/storageSDKs'
import { StoredUser } from '../../@types/users'
import {} from '../../helpers/preference'


const Landing = () => {

  const [utils, setUtilValue] = useRecoilState(utilsAtom)

  const [appLaunchedBefore, setAppLaunchedBefore] = useState(false)

  const [userIsFound, setUserIsFound] = useState(false)



  useEffect(() => {
    setUtilValue({ ...utils, showTabs: false })
  }, [])


  // check if app has been launched before
  // TODO: use Capacity prefrences not StorageAPI for verifying launch status
  useEffect(() => {
    (async () => {
      const appIsLaunchedStatus = await getSaveData(LAUNCH_STATUS) as string
      if (appIsLaunchedStatus === null) {
        saveData(LAUNCH_STATUS, 'true')
        return
      }
      setAppLaunchedBefore(() => true)
    })()
  }, [])


  useEffect(() => {
    (async () => {
      const user = await getSaveData(USER) as StoredUser
      if (user !== null) setUserIsFound(() => true)
    }
    )()
  }, [])




  return (
    <IonPage>
      <IonContent className=''>
        <section className="landing_bg">
          <IonImg src={Overlay} className='overlay' />

          <div className='landing_text ion-text-center'>
            <div>
              <div className="logo_img">
                <IonImg src={Logo} />
              </div>
              <p className="landing_title landing_texts">encostay</p>
              <p className="landing_sub_title landing_texts">Enjoy convient stay</p>
            </div>

            {
              userIsFound && appLaunchedBefore && (
                <IonButton
                  className='fill brown_fill nm_btn mt-5'
                  shape='round'
                  routerLink='/home'
                  routerDirection='forward'
                >
                  Continue
                </IonButton>
              )
            }
            
            {
              !userIsFound && appLaunchedBefore && (
                <IonButton
                  className='fill brown_fill nm_btn mt-5'
                  shape='round'
                  routerLink='/login'
                  routerDirection='forward'
                >
                  Login
                </IonButton>
              )
            }

            {
              !userIsFound && !appLaunchedBefore && (
                <IonButton
                  className='fill brown_fill nm_btn mt-5'
                  shape='round'
                  routerLink='/onboarding'
                  routerDirection='forward'
                >
                  Get started
                </IonButton>
              )
            }

          </div>

        </section>
      </IonContent>
    </IonPage >
  )
}

export default Landing