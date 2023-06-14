import React from 'react'

import Person from "../../assets/images/man.png"

//css
import "../Me/Me.css"
import { IonPage, IonContent, IonTitle, IonIcon, IonInput, IonButton } from '@ionic/react'
import HeaderTitle from '../../components/HeaderTitle'
import BackHeader from '../../components/BackHeader/BackHeader'
import { pencil } from 'ionicons/icons'



const EditProfile = () => {
  return (
    <IonPage>
      <BackHeader title='Profile' backLink='/me' />
      <IonContent className='ion-padding'>

        {/* Profile Preview */}
        <section className="ion-text-center mt-3">
          <div className="me_thumbnail" style={{ backgroundImage: `url(${Person})` }}></div>

          <IonTitle className='mt-3 fs-2'>Robert Bowie</IonTitle>
        </section>

        <section className="mt-4">
          <div className="rounded-4 d-flex align-items-center ion-margin-vertical p-2" style={{ backgroundColor: "var(--white-4)" }}>
            <IonIcon icon={pencil} className='block' />
            <IonInput type="text" placeholder="First Name" className='ml-3' />
          </div>
          <div className="rounded-4 d-flex align-items-center ion-margin-vertical p-2" style={{ backgroundColor: "var(--white-4)" }}>
            <IonIcon icon={pencil} className='block' />
            <IonInput type="text" placeholder="Last Name" className='ml-3' />
          </div>
          <div className="rounded-4 d-flex align-items-center ion-margin-vertical p-2" style={{ backgroundColor: "var(--white-4)" }}>
            <IonIcon icon={pencil} className='block' slot="start" />
            <IonInput type="email" placeholder="Email" className='ml-3' />
          </div>
          <div className="rounded-4 d-flex align-items-center ion-margin-vertical p-2" style={{ backgroundColor: "var(--white-4)" }}>
            <IonIcon icon={pencil} className='block' />
            <IonInput type="text" placeholder="John" className='ml-3' />
          </div>
          <div className="rounded-4 d-flex align-items-center ion-margin-vertical p-2" style={{ backgroundColor: "var(--white-4)" }}>
            <IonIcon icon={pencil} className='block' />
            <IonInput type="date" placeholder="John" className='ml-3' />
          </div>
        </section>

        <IonButton
          className="yellow_fill mt-5"
          shape="round"
          mode="ios"
          expand='block'
        >
          Save
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

export default EditProfile