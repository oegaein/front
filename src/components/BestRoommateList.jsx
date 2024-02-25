import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import BestRoommate from '../components/RoommatePage/BestRoommate';

const BestRoommateList = () => {
  return (
    <>
      <Swiper
      spaceBetween={12}
      slidesPerView={2}
      loop={true}
      className="mySwiper mb-[28px]">
        <SwiperSlide>
          <BestRoommate/>
        </SwiperSlide>
        <SwiperSlide>
          <BestRoommate/>
        </SwiperSlide>
        <SwiperSlide>
          <BestRoommate/>
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default BestRoommateList