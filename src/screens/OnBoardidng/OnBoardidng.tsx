import { IonPage, IonContent, IonImg, IonButton, IonCol, IonGrid, IonRow, useIonRouter } from '@ionic/react'
import { useState } from 'react'
import SpaceBetween from '../../components/style/SpaceBetween'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useHistory } from 'react-router';


// styles
import "./OnBoarding.css"


//images
import Images from "../../constants/Images"




const OnBoardidng = () => {
    const slides = [
        {
            image: Images.OnboardingImg1,
            heading: "Tavel with no worry",
            subText: "You can now experince the next level of travel experince for hote bookings",
            pagination: Images.OnboardingPaginationImg1,
            btnText: "Next",
            slideIndex: 0
        },
        {
            image: Images.OnboardingImg2,
            heading: "Find Hundereds of hotels",
            subText: "Discover hundreds of hotels that spread across the world for you",
            pagination: Images.OnboardingPaginationImg2,
            btnText: "Next",
            slideIndex: 1
        },
        {
            image: Images.OnboardingImg3,
            heading: "Let's discovery the world",
            subText: "Book hotel for the best travel experience. Enjoy your trip!",
            pagination: Images.OnboardingPaginationImg3,
            btnText: "Begin",
            slideIndex: 2
        },
    ]

    const router = useIonRouter()



    // states
    const [nextBtnText, setNextBtnText] = useState("Next")
    const [paginationImage, setPaginationImage] = useState(Images.OnboardingPaginationImg1)
    const [onBoardingSwipe, setOnBoardingSwipe] = useState<any | null>(null)



    function handleSlide() {
        // if (swipeRef.current !== null) {
        //     if (!swipeRef.current.swiper?.isEnd){
        //         swipeRef.current.swiper.slideNext();
        //         return
        //     }
        // }

        if (onBoardingSwipe !== null) {
            if (!onBoardingSwipe?.isEnd) {
                onBoardingSwipe?.slideNext();
                handleSlideChange()
                return
            }
        }

        router.push("/auth", "root")
    }


    function handleSlideChange() {
        switch (onBoardingSwipe?.activeIndex) {
            case 0:
                setPaginationImage(Images.OnboardingPaginationImg1)
                break

            case 1:
                setPaginationImage(Images.OnboardingPaginationImg2)
                break

            case 2:
                setPaginationImage(Images.OnboardingPaginationImg3)
                break
        }

        onBoardingSwipe?.isEnd && setNextBtnText("Begin")

    }


    return (
        <IonPage>
            <IonContent className='ion-no-padding'>
                <IonGrid fixed className='ion-no-padding'>
                    <IonRow>
                        <IonCol size='12'>
                            <Swiper
                                spaceBetween={50} pagination={true}
                                allowSlidePrev={false}
                                onSwiper={swp => setOnBoardingSwipe(swp)}
                            >
                                {
                                    slides.map((slide) => (
                                        <SwiperSlide key={slide.slideIndex}>
                                            <section className="onboarding_images">
                                                <div className="hero_image" style={{ backgroundImage: `url(${slide.image})` }}>
                                                </div>
                                                <div className="hero_heading ion-padding-horizontal">
                                                    <h2 className='hero_heading_text'>{slide.heading}</h2>
                                                    <p className="mt-4 text-muted hero_heading_sub_text">{slide.subText}</p>
                                                </div>
                                            </section>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </IonCol>
                        <IonCol className='ion-padding-horizontal ion-margin-top'>
                            <IonRow className='ion-align-items-center'>
                                <IonCol size='2'>
                                    <IonImg src={paginationImage} />
                                </IonCol>
                                <IonCol size='10' className='ion-text-end'>
                                    <IonButton shape="round" className='fill brown_fill nm_btn' size='small' onClick={() => handleSlide()}>
                                        {nextBtnText}
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default OnBoardidng