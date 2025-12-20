"use client"
import Image from "next/image";
import bg from "@/public/images/auth/bg-2.jpg"
import slider1 from "@/public/images/auth/slide-1.png"
import slider2 from "@/public/images/auth/slide-2.png"
import slider3 from "@/public/images/auth/slide-3.png"
import ForgotForm from "./forgot-form";
import { Swiper, SwiperSlide } from "swiper/react";
import Verification from "./verification";
import Verificationcode from "./verificationcode";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useThemeStore } from "@/store";
import auth3Light from "@/public/images/auth/auth3-light.png";
import auth3Dark from "@/public/images/auth/auth3-dark.png";

const ForgotPage = () => {
  const { isRtl } = useThemeStore();
  return (

    //   <div className="loginwrapper ">
    <div className="loginwrapper min-h-screen overflow-hidden w-full relative">
      <div className="lg-inner-column  grid  lg:grid-cols-2 w-full flex-wrap justify-center overflow-y-auto p-4">

      <div className="min-h-screen w-full  absolute -z-10">
        <Image
          src={auth3Dark}
          alt="background image"
          className="absolute top-0 left-0 w-full h-full light:hidden"
        />
        <Image
          src={auth3Light}
          alt="background image"
          className="absolute top-0 left-0 w-full h-full dark:hidden"
        />
      </div>
        
      <div className=" px-4 flex justify-center items-center">
          <div className="bg-white/20 backdrop-blur-sm border border-white/20 p-12 shadow-md rounded-md lg:w-2/3" >
            <ForgotForm />
          </div>
        </div>
        
        <div
          className="h-full w-full  bg-no-repeat bg-center bg-cover hidden lg:block rounded-xl"
     
        >
          <Swiper
            key={`swiper-${isRtl}`}
            dir={isRtl ? 'rtl' : 'ltr'}
            navigation={{
              prevEl: ".prev",
              nextEl: ".next",
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Navigation, Pagination, Autoplay]}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="w-full h-full rounded-2xl auth-swiper"
            style={{
              "--swiper-pagination-color": "#fff",
              "--swiper-pagination-bottom": "40px",
              "--swiper-pagination-bullet-size": "10px",
            } as React.CSSProperties}
          >
            <SwiperSlide>
              <div className="w-full h-full flex justify-center items-center">
                <Image src={slider1} alt="image" className="" priority={true} />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-full flex justify-center items-center">
                <Image src={slider2} alt="image" className="" priority={true} />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-full flex justify-center items-center">
                <Image src={slider3} alt="image" className="" priority={true} />
              </div>
            </SwiperSlide>
          </Swiper>

        </div>
       
      </div>
    
    </div>

    
  );
};

export default ForgotPage;
