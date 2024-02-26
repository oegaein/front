import React, {useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SearchIcon from '../assets/images/search-icon.png'
import Bell from '../assets/images/bell.png'
import Premium from '../assets/images/premium-quality.png'
import Filter from '../assets/images/filter.png'
import BestRoommateList from '../components/common/BestRoommateList';
import Roommate from '../components/RoommatePage/Roommate';
import Write from '../assets/images/write.png'
const RoommatePage = () => {
  const [input, setInput] = useState('')
  const handleChange = (e) => {
    setInput(e.target.value)
  }
  return (
    <div className='bg-[#F3F5F7] py-[11px] scroll-smooth'>
      <div className='flex justify-between mb-[27px]'>
        <div className='rounded-[15px] p-[15px] flex justify-between w-[314px] bg-white ml-[24px]'>
          <input className='text-[14px] w-[250px] focus:outline-none' type='text' 
          placeholder='검색으로 원하는 룸메를 찾아보세요'
          onChange={handleChange}/>
          <button>
            <img src={SearchIcon}/>
          </button>
        </div>
        <button className='mr-[12px]'>
          <img src={Bell}/>
        </button>
      </div>
      <div className='flex items-center mb-[15px] ml-[24px]'>
        <h1 className=' text-left mr-[3px]'>베스트 룸메</h1>
        <img src={Premium}/>
      </div>
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
          mousewheel={true}
          className='mb-[23px]'
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