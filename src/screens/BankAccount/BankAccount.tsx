import { IonButton, IonCard, IonCardContent, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonRadio, IonRadioGroup, IonText, IonThumbnail } from '@ionic/react'
import React, { useState } from 'react'
import BackHeader from '../../components/BackHeader/BackHeader'

// 
import MC from "../../assets/images/label.svg"
import SpaceBetween from '../../components/style/SpaceBetween'
import { pencil } from 'ionicons/icons'

const BankAccount = () => {
    const [surveyReason, setSurveyReason] = useState("")
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)


    return (
        <IonPage>
            <BackHeader backLink='/me' title='Bank Account' />
            <IonContent className='ion-padding' fullscreen>

                <IonList lines='none'>
                    <IonRadioGroup value={surveyReason}>
                        <IonItem className='ion-no-padding'>
                            <IonCard className="rounded-3 mt-2 ion-margin-vertical ion-padding-horizontal w-100" style={{ backgroundColor: "var(--white-4)" }} mode='ios'>
                                <IonCardContent className='d-flex align-items-center px-1 py-4'>
                                    <IonImg src={MC} />

                                    <IonText className='ml-3'>
                                        <small><span className="text-muted">Card Name: </span> John Keney Doe</small> <br />
                                        <small>Card Number: <span className="text-muted">1255 1255 1255 1255</span></small> <br />
                                        <small>Expiry Date: <span className="text-muted">12 / 2002</span></small>
                                    </IonText>

                                    <IonRadio slot="end" value={() => setSurveyReason("Helo")} />
                                </IonCardContent>
                            </IonCard>
                        </IonItem>
                    </IonRadioGroup>
                </IonList>


                {/* Add Payment Method */}
                <IonCard
                    className="yellow_fill mt-3"
                    mode="ios"
                    style={{ backgroundColor: "var(--white-4)" }}
                    routerDirection='forward'
                    routerLink='/add_card'

                >
                    <IonCardContent className='p-3'>
                        <SpaceBetween>
                            <div className="rounded-4 d-flex align-items-center justify-content-center ion-padding" style={{ width: "100px", height: "80px", backgroundColor: "var(--text-color2)" }}>
                                <IonIcon icon={pencil} size='large' color='warning' />
                            </div>

                            <div className='ml-4'>
                                <strong>Add Pyament method</strong>
                                <small className='block mt-1 text-muted'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing
                                </small>
                            </div>
                        </SpaceBetween>
                    </IonCardContent>
                </IonCard>

            </IonContent>
        </IonPage >
    )
}

export default BankAccount



// <IonContent className='ion-padding' fullscreen>
// <div className='ion-margin-vertical ion-padding-horizontal'>
//     <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
//         <IonInput
//             type="password"
//             placeholder='0123456790'
//             label='Enter Account Number'
//             labelPlacement='floating'
//             className='ion-no-border'
//             mode='ios'
//             inputMode='numeric'
//         />
//     </div>
// </div>
// <div className='ion-margin-vertical ion-padding-horizontal' style={{ backgroundColor: "var(--white-4)" }}>
//     <IonInput
//         type="date"
//         placeholder='01/10/1998'
//         label='Enter your birthday'
//         labelPlacement='floating'
//         className='ion-no-border'
//         mode='ios'
//     />
// </div>
// <div className='ion-margin-vertical ion-padding-horizontal' style={{ backgroundColor: "var(--white-4)" }}>
//     <IonInput
//         type="text"
//         placeholder='GTBank'
//         label='Enter your bank'
//         labelPlacement='floating'
//         className='ion-no-border'
//         mode='ios'
//     />
// </div>
// {/* <div className='ion-margin-vertical ion-padding-horizontal'>
//     <IonLabel>Confirm Password</IonLabel>
//     <div className="rounded-5 mt-2" style={{ backgroundColor: "var(--white-4)" }}>
//         <IonInput
//             type="password"
//             placeholder=''
//         />
//     </div>
// </div> */}
// <small className="block mt-1 text-muted ion-padding-horizontal">
//     Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, cumque?
// </small>

// <IonButton
//     className="yellow_fill mt-5"
//     shape="round"
//     mode="ios"
//     size="large"
//     expand='block'
// >
//     Confirm
// </IonButton>
// </IonContent>