import { IonButton, IonContent, IonImg, IonPage } from '@ionic/react'
import React, { useEffect } from 'react'

// import { showTabs } from "../../atoms/settingsAtom"
import { useRecoilState } from "recoil"
import { showTabs } from '../../signals/settingsSignals'


// images
import Logo from "../../assets/images/logo.png"
import Overlay from "../../assets/images/Oval.png"


// style
import "./Landidng.css"


const Landing = () => {
  // const [showTabs, setShowTabs] = useRecoilState(showTabsState)


  useEffect(() => {
    showTabs.value = false;
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

            <IonButton
              className='fill brown_fill nm_btn mt-5'
              shape='round'
              routerLink='/onboarding'
              routerDirection='forward'
            >
              Get started
            </IonButton>

          </div>

        </section>
      </IonContent>
    </IonPage >
  )
}

export default Landing