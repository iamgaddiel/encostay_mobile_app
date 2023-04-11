import { IonPage, IonContent, IonImg, IonButton } from '@ionic/react'
import React, { useState } from 'react'
import SpaceBetween from '../../components/style/SpaceBetween'

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';


// styles
import "./OnBoarding.css"


//images
import Map from "../../assets/images/map.png"
import People from "../../assets/images/people.png"
import View from "../../assets/images/view.png"
import P1 from "../../assets/images/1.svg"
import P2 from "../../assets/images/2.svg"
import P3 from "../../assets/images/3.svg"
import { useHistory } from 'react-router';
import { swiper } from '../../signals/passwordResetSignal';



const OnBoardidng = () => {

    const slides = [
        {
            image: Map,
            heading: "Tavel with no worry",
            subText: "You can now experince the next level of travel experince for hote bookings",
            pagination: P1,
            btnText: "Next",
            slideIndex: 0
        },
        {
            image: People,
            heading: "Find Hundereds of hotels",
            subText: "Discover hundreds of hotels that spread across the world for you",
            pagination: P2,
            btnText: "Next",
            slideIndex: 1
        },
        {
            image: View,
            heading: "Let's discovery the world",
            subText: "Book hotel for the best travel experience. Enjoy your trip!",
            pagination: P3,
            btnText: "Get Started",
            slideIndex: 2
        },
    ]

    // 3party hooks
    const history = useHistory()


    // states
    // const [swiper, setSwiper] = useState<any>(null)
    const [nextBtnText, setNextBtnText] = useState("Next")
    const [paginationImage, setPaginationImage] = useState(P1)



    // functions
    function handleSlide() {
        if (!swiper.value?.isEnd) {
            swiper.value?.slideNext()
            return
        }
        
        history.push("/login")
    }

    function handleSlideChange(){
        switch (swiper.value?.activeIndex) {
            case 0:
                setPaginationImage(P1)
                break

            case 1:
                setPaginationImage(P2)
                break

            case 2:
                setPaginationImage(P3)
                break
        }

        swiper.value?.isEnd && setNextBtnText("Get Started")

    }



    return (
        <IonPage>
            <IonContent>

                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    onSlideChange={() => handleSlideChange()}
                    pagination={true}
                    allowSlidePrev={false}
                    onSwiper={(swp) => swiper.value = swp}
                >
                    {
                        slides.map((slide) => (
                            <SwiperSlide key={slide.slideIndex}>
                                <section className="onboarding_images">
                                    <div className="hero_image">
                                        <IonImg src={slide.image} />
                                    </div>

                                    <div className="hero_heading">
                                        <h2 className='hero_heading_text'>{slide.heading}</h2>
                                        <p className="mt-4 text-muted hero_heading_sub_text">{slide.subText}</p>
                                    </div>
                                </section>


                            </SwiperSlide>
                        ))
                    }
                </Swiper>

                <SpaceBetween className='px-4'>
                    <IonImg src={paginationImage} />

                    <IonButton
                        shape="round"
                        className='fill brown_fill nm_btn'
                        size='large'
                        onClick={() => handleSlide()}
                    >
                        {nextBtnText}
                    </IonButton>
                </SpaceBetween>
            </IonContent>
        </IonPage>
    )
}

export default OnBoardidng