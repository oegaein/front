import React from 'react'
import Star from '../../assets/images/star.svg'
import Yoo from '../../assets/images/유재석.svg'

const Roommate = () => {
  return (
    <div className='bg-white rounded-[20px] p-[18px] h-[180px] relative'>
      <div className='flex justify-between text-[12px] mb-[5px]'>
        <div className='flex items-center'>
          <span className='text-[#7F6FD8]'>룸메 평점</span>
          <div className='flex ml-[5px] gap-0.5'>
            <img src={Star}/>
            <img src={Star}/>
            <img src={Star}/>
            <img src={Star}/>
            <img src={Star}/>
          </div>
        </div>
        <span className='text-[#BEBBCF]'>D-4</span>
      </div>
      <p className='text-left text-[14px] mb-[7px]'>신긱 룸메 찾습니다.</p>
      <div className='flex items-center pl-[10px]'>
        <img className='w-[97px]' src={Yoo}/>
        <div className='ml-[17px] text-[15px]'>
          <p className='mb-[10px]'>컴퓨터공학과</p>
          <p>20학번 유재석</p>
        </div>
      </div>
      <p className='text-right text-[11px] text-[#7F6FD8] absolute bottom-[13px] right-[20px]'>매칭신청</p>
    </div>
  )
}

export default Roommate