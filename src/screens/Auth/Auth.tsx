import { IonCol, IonContent, IonGrid, IonImg, IonPage, IonRow, IonSegment, IonSegmentButton } from '@ionic/react'
import React, { useState } from 'react'
import Login from '../Login'
import Register from '../Register'
import Logo from "../../assets/images/login_logo.svg";
import "./Auth.module.css"



const Auth = () => {
    const [screen, setScreen] = useState<"login" | "register">("login")

    return (
        <IonPage>
            <IonContent className='ion-padding'>

                <IonGrid fixed>
                    <IonRow className='ion-justify-content-center'>
                        <IonCol size='5' sizeMd='3' sizeSm='2' sizeLg='2' className=''>
                            <IonImg src={Logo} />
                        </IonCol>
                    </IonRow>
                    <IonRow className='ion-justify-content-center'>
                        <IonCol size='6' sizeMd='3' sizeLg='4'>
                            <IonSegment value={screen} mode="md">
                                <IonSegmentButton layout='icon-start' type='button' value='login' onClick={() => setScreen("login")} className='ion-text-capitalize'>Login</IonSegmentButton>
                                <IonSegmentButton type='button' value='register' onClick={() => setScreen("register")} className='ion-text-capitalize'>SignUp</IonSegmentButton>
                            </IonSegment>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                {screen === "login" && <Login />}
                {screen === "register" && <Register switchScreen={setScreen} />}
            </IonContent>
        </IonPage>
    )
}

export default Auth