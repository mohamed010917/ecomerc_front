import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { useGetTopBanersQuery } from "../../rtk/slice/baners";
import Link from "next/link";



export default function Swper() {
    const { data: baners, error, isLoading } = useGetTopBanersQuery();
    if(isLoading) return (<div>       <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>.</div>) ;
    if(error) return (<div>error....</div>) ;
    return (
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={false}
          centeredSlides={false}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          loop={true}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
        
          className="mySwiper h-full w-full"
        > 
          {
            baners.data.map(e => {
              return (
                <SwiperSlide key={e.id}>
                <div  className="flex  justify-between p-10 sm:flex-row flex-col-reverse items-center gap-4 h-full w-full">
                      <div className="content h-full  flex sm:w-[50%] w-full relative justify-between content-between font-bold  flex-col  gap-4">
                          <h1 className="font-bold dark:text-white text-2xl mb-4 ">{e.title}</h1>
                          <h1 className="mb-4 font-bold dark:text-white text-5xl ">{e.description}</h1>
                          <Link href={e.link ? e.link : "/proudect"} className="sm:mt-30 pg-main text-white w-fit cursor-pointer pt-2 pl-4 rounded-2xl pb-2 pr-4">Show more</Link>
                      </div>
                      <img src={e.img} className="Slide 1 w-[300px] z-50 h-[400px]" />
                </div>
                </SwiperSlide>   
              );
            })
          }
        </Swiper>
      );

}