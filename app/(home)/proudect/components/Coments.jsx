"use client";
import React, { useEffect, useState } from 'react'

import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Reting from '../../commponents/Reting';

function Coments({data}) {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 p-6">
            <h1 className="mt-4 mb-6 text-3xl text-center text-black dark:text-white font-bold">Reviews</h1>
            
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3} // عرض 3 بطاقات
                spaceBetween={20} // مسافة بين البطاقات
                coverflowEffect={{
                    rotate: 0, // تقليل الدوران
                    stretch: 0,
                    depth: 0,
                    modifier: 1,
                    slideShadows: false,
                }}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                navigation
                pagination={{ clickable: true }}
                className="mySwiper max-w-5xl mx-auto"
            >
                {data.map((e) => (
                    <SwiperSlide key={e.id}>
                        <div className="rounded-lg w-[300px] h-[280px] bg-white dark:bg-gray-700 shadow-lg p-5 flex flex-col items-center text-center">
                            <Reting rating={e.rating}/>
                            <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">
                                {e.comment}
                            </p>
                            <h1 className="text-xl font-bold text-black dark:text-white">{e.user} </h1>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Coments