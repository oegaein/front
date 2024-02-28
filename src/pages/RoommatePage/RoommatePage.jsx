import React, {useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import Filter from '../../assets/images/filter.svg'
import Write from '../../assets/images/write.svg'

import Roommate from '../../components/RoommatePage/Roommate';
import BestRoommateList from '../../components/common/BestRoommateList';
import SearchAndNotice from '../../components/common/SearchAndNotice';
const RoommatePage = () => {
  const [input, setInput] = useState('')
  const handleChange = (e) => {
    setInput(e.target.value)
  }
  return (
    <div className='bg-[#F3F5F7] py-[11px] scroll-smooth'>
      <SearchAndNotice handleChange={handleChange}/>
      <BestRoommateList/>
      <div className='border-t border-[#DEDEDE] pt-[28px]'>
        <button className='flex flex-col items-center fixed z-10 bottom-[100px] right-[10px]'>
          <img src={Write}/><span className='text-[10px] mt-[5px]'>글쓰기</span>
        </button>
        <div className='flex justify-between items-center mb-[12px] px-[24px]'>
          <h1>룸메리스트</h1>
          <img src={Filter}/>
        </div>
        <Swiper
          spaceBetween={0}
          slidesPerView={4}
          className='mySwiper mb-[23px]'
        >
          <SwiperSlide>
            <button className='border border-[#978EF3] text-[11px] text-[#978EF3] rounded-[10px] p-[9px] bg-white ml-[24px]'>베스트 룸메</button>
          </SwiperSlide>
          <SwiperSlide>
            <button className='border border-[#DEDEDE] text-[11px] rounded-[10px] p-[9px] bg-white'>비슷한 연령</button>
          </SwiperSlide>
          <SwiperSlide>
            <button className='border border-[#DEDEDE] text-[11px] rounded-[10px] p-[9px] bg-white'>비슷한 성향</button>
          </SwiperSlide>
          <SwiperSlide>
            <button className='border border-[#DEDEDE] text-[11px] rounded-[10px] p-[9px] bg-white'>같은 성별</button>
          </SwiperSlide>
          <SwiperSlide>
            <button className='border border-[#DEDEDE] text-[11px] rounded-[10px] p-[9px] bg-white'>같은 전공</button>
          </SwiperSlide>
          <SwiperSlide>
            <button className='border border-[#DEDEDE] text-[11px] rounded-[10px] p-[9px] bg-white'>같은 전공</button>
          </SwiperSlide>
          <SwiperSlide>
            <button className='border border-[#DEDEDE] text-[11px] rounded-[10px] p-[9px] bg-white'>같은 전공</button>
          </SwiperSlide>
        </Swiper>
        <div className='flex flex-col gap-[12px] px-[24px]'>
          <Roommate/>
          <Roommate/>
          <Roommate/>
        </div>
      </div>
    </div>
  )
}

export default RoommatePage