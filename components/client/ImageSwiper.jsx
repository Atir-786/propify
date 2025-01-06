"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Keyboard,
  Scrollbar,
  A11y,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/bundle";
import Image from "next/image";
const ImageSwiper = ({ images }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      {/* <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md"> */}
      <Swiper
        modules={[Navigation, Keyboard, Pagination, A11y]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        keyboard={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="rounded-lg overflow-hidden"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[400px] sm:h-[400px] md:h-[400px] lg:h-[500px] bg-gray-100">
              <Image
                src={image}
                alt={`Property image ${index + 1}`}
                fill
                className="rounded-lg object-cover fill"
                // priority={index === 0} // Load the first image faster
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSwiper;
