import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import BestRoommate from '../RoommatePage/BestRoommate';

import Premium from '../../assets/images/premium-quality.svg'
import Next from '../../assets/images/next.svg'
const BestRoommateList = () => {
  return (
    <>
      <div className='flex justify-between items-center mb-[15px] ml-[24px] pt-[27px]'>
        <div className='flex '>
          <h1 className=' text-left mr-[3px]'>베스트 룸메</h1>
          <img src={Premium}/>
        </div>
        <Link to='#' className='flex mr-[24px] text-[12px]'>
          다른 룸메 찾아보기
          <img src={Next}/>
        </Link>
      </div>
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