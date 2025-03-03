"use client";
import React, { useEffect, useState } from 'react'

import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Ele from '../../commponents/ele';
function Slid({id}) {
     const [data, setData] = useState(null);
        useEffect( () => {
            let me = "GET"
            let api = `http://127.0.0.1:8000/api/catgory/${id}` ;
            fetch(api, {
              method: me,
              credentials: "include",
            })
              .then((response) => {
                if (!response.ok) {
                  return response.json().then((errorData) => {
                    console.error("API Error:", errorData);
                    throw new Error("Failed to fetch data");
                  });
                }
    
                return response.json();
              })
              .then((responseData) => {
                  console.log(responseData)
                  if (responseData.data) {
                    setData(responseData.data);
                  } else {
                    console.error("Unexpected data format:", responseData);
                  }
        
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
        },[]);
    if(data){
        return (
            <div className="bg-gray-100 dark:bg-gray-800 p-6">
                <h1 className="mt-4 mb-6 text-3xl text-center text-black dark:text-white font-bold">More proudect</h1>
                
                <Swiper
                    modules={[Navigation, Autoplay, EffectCoverflow]}
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
                    {data.proudect.map((e) => (
                        <SwiperSlide key={e.id}>
                            <Ele e={e}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        );

    }
}

export default Slid