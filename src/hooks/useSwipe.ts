import React, { useRef, useState } from "react"
import SwiperCore, { Navigation, Pagination, Swiper } from 'swiper';
import { SwiperRef } from "swiper/react";

const useSwipe = () => {

    const swipeRef = useRef<SwiperRef>(null); // Store the swiper instance
    const [passwordResetSwipe, setPasswordResetSwipe] = useState<any>(null);

    return {
        swipeRef,
        passwordResetSwipe, 
        setPasswordResetSwipe,
    }
}

export default useSwipe