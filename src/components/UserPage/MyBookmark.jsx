import React from 'react'
import Heart from '../../assets/images/heart-red.svg';
import UserCounts from '../../assets/images/user-counts.svg';
import Res1 from '../../assets/images/안녕모현.svg'

const MyBookmark = () => {
  return (
    <div className='flex border border-[#EDEDED] rounded-[20px] w-full h-[128px]'>
      <div className='rounded-l-[20px] w-[146px]' style={{backgroundImage: `url(${Res1})`}}></div>
      <div className='flex flex-col justify-between p-[15px] w-[calc(100%-146px)]'>
        <div>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <span className='text-[13px] font-bold mr-[10px]'>리오부리또</span>
              <span className='text-[9px]'>3분전</span>
            </div>
            <button>
              <img src={Heart}/>
            </button>
          </div>
          <p className='text-[11px] text-left mt-[12px]'>모집 마감 시간: 오후 11시 30분</p>
        </div>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <img src={UserCounts}/>
            <span className='ml-[6px] text-[#BAAFAF] text-[12px]'>1/4</span>
          </div>
          <button className='text-[10px] text-[#7F6FD8]'>같이 배달하기</button>
        </div>
      </div>
    </div>
  )
}

export default MyBookmark