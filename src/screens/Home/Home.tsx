import { IonAvatar, IonButton, IonCard, IonCardContent, IonContent, IonIcon, IonImg, IonPage, IonRouterLink, IonSearchbar, IonText } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import SpaceBetween from '../../components/style/SpaceBetween'

// images
import Man from "../../assets/images/man.png"


// css
import "./Home.css"
import { bed, bedOutline, caretForwardOutline, chevronForwardOutline, filter, heart, optionsOutline, wifiOutline } from 'ionicons/icons'


// splide
import { Swiper, SwiperSlide } from 'swiper/react';

// slider
import Slider from "react-slick";

// cotexts
import { SettingsContext, SettingsContextType } from '../../contexts/SettingsContext'
import { showTabs } from '../../signals/settingsSignals'
import { useHistory } from 'react-router'
import { rooms } from '../../signals/demoSignals'


import OwlCarousel from "react-owl-carousel2"
import GuestsAccount from '../../components/GuestAccount/GuestAccount'
import HostAccount from '../../components/HostAccount/HostAccount'




type Account = "guest" | "host"


const Home = () => {

    // ----------------- States -----------------------
    //todo: add palceholder while fetching user image

    const history = useHistory()
    const [active, setActive] = useState(true)
    const [account, setAccount] = useState<Account>("host")
    showTabs.value = true



    useEffect(() => {
        showTabs.value = true
    }, [])



    // return TSX

    if (account === "host") {
        return <HostAccount
            userImage={Man}
        />
    }

    return <GuestsAccount
        userImage={Man}
    />
}

export default Home


