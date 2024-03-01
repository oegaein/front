import React from 'react'
import Star from '../../assets/images/star.svg'
import Yoo from '../../assets/images/유재석.svg'
const BestRoommate = () => {
  return (
    <button className='w-[192px] h-[179px] rounded-[20px] bg-white p-[20px] ml-[12px]'>
      <div className='flex items-center justify-between text-[12px] text-[#7F6FD8] mb-[12px]'>
        <div className='flex'>
          <span>룸메 평점</span>
          <div className='flex gap-0.5 ml-[8px]'>
            <img src={Star}/>
            <img src={Star}/>
            <img src={Star}/>
            <img src={Star}/>
            <img src={Star}/>
          </div>
        </div>
        <span className='text-[#BEBBCF]'>D-7</span>
      </div>
      <p className='text-[13px] mb-[13px]'>마음 잘 맞는 룸메 구해요!</p>
      <div className='flex items-center'>
        <img src={Yoo}/>
        <div className='text-[11px] ml-[12px]'>
          <p>컴퓨터공학과</p>
          <p>20학번 유재석</p>
        </div>
      </div>
      <p className='text-right text-[11px] text-[#7F6FD8]'>매칭신청</p>
    </button>
  )
}

export default BestRoommate