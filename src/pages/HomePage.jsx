import React, {useState} from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";


import SearchAndNotice from '../components/common/SearchAndNotice'
import BestRoommateList from '../components/common/BestRoommateList'

import Next from '../assets/images/next.svg'
const HomePage = () => {
  const [input, setInput] = useState('')
  const handleChange = (e) => {
    setInput(e.target.value)
  }
  return (
    <div className='bg-[#F3F5F7] py-[11px] scroll-smooth'>
      <SearchAndNotice handleChange={handleChange}/>
      <BestRoommateList/>
      <div className='px-[24px]'>
        <div className='flex justify-between items-center mb-[15px]'>
          <div className='flex'>
            <h1 className=' text-left mr-[3px]'>오늘의 기숙사 소식</h1>
          </div>
          <a href='#' className='flex text-[12px]'>
            소식 더보기
            <img src={Next}/>
          </a>
        </div>
        <Swiper 
        direction={'vertical'}
        modules={[Pagination, Autoplay]} 
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="mySwiper bg-white rounded-[15px] relative h-[60px] ">
          <SwiperSlide className='flex items-center px-[15px] pt-[18px] text-left'>
            <span className='absolute top-[10px] right-[10px] text-[11px] text-[#BEBBCF]'>52분 전</span>
            <a href='#' className='text-ellipsis overflow-hidden whitespace-nowrap hover:underline'>크로스핏 같이 다니실 분!</a>
          </SwiperSlide>
          <SwiperSlide className='flex items-center px-[15px] pt-[18px] text-left'>
            <span className='absolute top-[10px] right-[10px] text-[11px] text-[#BEBBCF]'>52분 전</span>
            <a href='#' className='text-ellipsis overflow-hidden whitespace-nowrap hover:underline'>헬스장 같이 다니실 분!</a>
          </SwiperSlide>
          <SwiperSlide className='flex items-center px-[15px] pt-[18px] text-left'>
            <span className='absolute top-[10px] right-[10px] text-[11px] text-[#BEBBCF]'>52분 전</span>
            <a href='#' className='text-ellipsis overflow-hidden whitespace-nowrap hover:underline'>새학기는 새학기 새학기는 새학기</a>
          </SwiperSlide>
        </Swiper>
      </div>
      <BestRoommateList/>
      <div>새로 올라온 공동배달</div>
    </div>
  )
}

export default HomePage