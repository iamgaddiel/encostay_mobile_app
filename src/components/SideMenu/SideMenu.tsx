import { IonMenu, IonHeader, IonToolbar, IonMenuToggle, IonButton, IonIcon, IonContent, IonAvatar, IonImg, IonList, IonItem, IonLabel, IonText } from '@ionic/react'
import { personOutline, briefcaseOutline, notificationsOutline, documentOutline, settingsOutline, chatbubbleOutline, close, documentTextOutline, walletOutline } from 'ionicons/icons'
import React from 'react'


interface Props {
    userImage: string
}
const SideMenu: React.FC<Props> = ({ userImage }) => {
    return (
        <IonMenu contentId="main-content">
            <IonHeader className='ion-no-border px-3'>
                <IonToolbar>
                    <IonMenuToggle slot="end">
                        <IonButton className='yellow_fill' fill='clear' size='small' style={{ width: "50px", height: "50px"}}>
                            <IonIcon icon={close} size='large' />
                        </IonButton>
                    </IonMenuToggle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>

                {/* Profile Preview */}
                <section className="ion-margin-horizontal">
                    <IonAvatar>
                        <IonImg src={userImage} />
                    </IonAvatar>

                    <div className='mt-3'>
                        <big className='fw-bold-sm'>Marvis Ighedosa</big>
                    </div>
                </section>


                {/* Menus */}
                <section>
                    <IonList lines='none'>
                        <IonItem routerDirection='forward' routerLink='/me' className="mt-3">
                            <IonIcon icon={personOutline} slot="start" />
                            <IonLabel>My Profile</IonLabel>
                        </IonItem>
                        <IonItem routerDirection='forward' routerLink='/me' className="mt-3">
                            <IonIcon icon={briefcaseOutline} slot="start" />
                            <IonLabel>Payment method</IonLabel>
                        </IonItem>
                        <IonItem routerDirection='forward' routerLink='/me' className="mt-3">
                            <IonIcon icon={notificationsOutline} slot="start" />
                            <IonLabel> Notification</IonLabel>
                        </IonItem>
                        <IonItem routerDirection='forward' routerLink='/transactions' className="mt-3">
                            <IonIcon icon={documentTextOutline} slot="start" />
                            <IonLabel>Transactions</IonLabel>
                        </IonItem>
                        <IonItem routerDirection='forward' routerLink='/withdraw' className="mt-3">
                            <IonIcon icon={walletOutline} slot="start" />
                            <IonLabel>Withdraw</IonLabel>
                        </IonItem>
                        <IonItem routerDirection='forward' routerLink='/me' className="mt-3">
                            <IonIcon icon={settingsOutline} slot="start" />
                            <IonLabel>Setting</IonLabel>
                        </IonItem>
                        <IonItem routerDirection='forward' routerLink='/me' className="mt-3">
                            <IonIcon icon={chatbubbleOutline} slot="start" />
                            <IonLabel>Support</IonLabel>
                        </IonItem>
                    </IonList>
                </section>

                <IonButton className="mt-4 yellow_fill" mode='ios' size='large' shape="round">Log Out</IonButton>

            </IonContent>
        </IonMenu>
    )
}

export default SideMenu