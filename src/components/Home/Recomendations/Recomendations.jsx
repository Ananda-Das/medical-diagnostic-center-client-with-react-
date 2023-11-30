// import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Recomendations = () => {
  const axiosPublic = useAxiosPublic();

  const { data: recomendations = [] } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/recomendations");
      return res.data;
    },
  });

//   console.log(recomendations);

  return (
    <div className="my-10 w-11/12 mx-auto">
      <h1 className="text-3xl font-bold text-center">Our Special Doctor Says</h1>

      <div className="my-7">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
          autoplay
        >
          {recomendations.map((slider) => (
            <SwiperSlide key={slider._id}>
              <div className="space-y-2">
                <img src={slider.imageUrl} alt="" />
                <p className="text-2xl font-extrabold">{slider.professional_name}</p>
                <p className="text-lg font-bold">{slider.professional_position}</p>
                <p>{slider.tip}</p>
              </div>
            </SwiperSlide>
          ))}
          {/* <SwiperSlide>Slide 1</SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  );
};

export default Recomendations;
