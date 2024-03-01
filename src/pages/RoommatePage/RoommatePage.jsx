import React, {useState} from 'react'

import Filter from '../../assets/images/filter.svg'
import Write from '../../assets/images/write.svg'
import Next from '../../assets/images/next.svg'
import Premium from '../../assets/images/premium-quality.svg'

import Roommate from '../../components/RoommatePage/Roommate';
import RoommateSwiperList from '../../components/common/RoommateSwiperList';
import SearchAndNotice from '../../components/common/SearchAndNotice';
const RoommatePage = () => {
  const [input, setInput] = useState('')
  const handleChange = (e) => {
    setInput(e.target.value)
  }
  return (
    <div className='bg-[#F3F5F7] pt-[50px] pb-[11px] scroll-smooth'>
      <SearchAndNotice handleChange={handleChange}/>
      <div className='flex justify-between items-center mb-[15px] ml-[24px] pt-[27px]'>
        <div className='flex'>
          <h1 className=' text-left font-bold mr-[3px]'>베스트 룸메</h1>
          <img src={Premium}/>
        </div>
      </div>
      <RoommateSwiperList/>
      <div className='border-t border-[#DEDEDE] pt-[24px]'>
        <button className='flex flex-col items-center fixed z-10 bottom-[100px] right-[10px] min-[393px]:right-[calc(50%-12rem)]'>
          <img src={Write} alt='글쓰기'/><span className='text-[10px] mt-[5px]'>글쓰기</span>
        </button>
        <div className='flex justify-between items-center mb-[14px] px-[24px]'>
          <h1 className='font-bold'>룸메리스트</h1>
          <img src={Filter}/>
        </div>
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