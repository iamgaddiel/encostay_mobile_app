import { IonButton, IonContent, IonImg, IonPage } from '@ionic/react'
import React, { useContext, useEffect } from 'react'

// import { showTabs } from "../../atoms/settingsAtom"
import { useRecoilState } from "recoil"


// images
import Logo from "../../assets/images/logo.png"
import Overlay from "../../assets/images/Oval.png"


// style
import "./Landidng.css"
import { utilsAtom } from '../../atoms/utilityAtom'
import useAppLaunched from '../../hooks/useAppLaunched'
import Login from '../Login'
import { useHistory } from 'react-router'


const Landing = () => {
  const history = useHistory()
  const [utils, setUtilValue] = useRecoilState(utilsAtom)
  const { appLauned } = useAppLaunched()




  
  // Redirect
  
  
  useEffect(() => {
    setUtilValue({ ...utils, showTabs: false })
  }, [])
  
  if (appLauned){
    history.push('/login')
  }
  
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