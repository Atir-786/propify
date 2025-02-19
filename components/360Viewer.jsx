"use client";
import React, { useEffect, useRef, useState } from "react";
import PhotoSphereViewer from "photo-sphere-viewer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
const VirtualTour = ({ images }) => {
  const viewerRef = useRef(null);
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      if (viewerRef.current) {
        viewerRef.current.destroy(); // Destroy the previous viewer before loading a new one
      }

      viewerRef.current = new PhotoSphereViewer({
        container: containerRef.current,
        panorama: images[currentIndex],
        navbar: ["zoom", "fullscreen"],
        defaultZoomLvl: 0,
        loadingTxt: "Loading...",
        touchmoveTwoFingers: true,
        mousewheel: true,
      });
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }
    };
  }, [currentIndex, images]);

  return (
    <div className="relative w-full h-[500px]">
      {/* 360 Viewer */}
      <div ref={containerRef} className="w-full h-full"></div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10">
        <button
          className="bg-black text-white p-3 rounded-full"
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === 0 ? images.length - 1 : prev - 1
            )
          }
        >
          ⬅️
        </button>
      </div>

      <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10">
        <button
          className="bg-black text-white p-3 rounded-full"
          onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
        >
          ➡️
        </button>
      </div>

      {/* Thumbnail Preview */}
      <Swiper
        modules={[Navigation]}
        slidesPerView={5}
        spaceBetween={10}
        navigation
        className="mt-4"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              alt="image"
              src={img}
              className={`w-16 h-16 cursor-pointer rounded-md border ${
                index === currentIndex
                  ? "border-2 border-blue-500"
                  : "border-transparent"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VirtualTour;
