import React from 'react'
import MyBookmark from './MyBookmark'

import Chevron from '../../assets/images/chevron.svg'

const BookmarkList = () => {
  return (
    <div className='px-[25px] pb-[20px] bg-white'>
      <div className='flex justify-between py-[22px]'>
        <h1 className='font-bold'>나의 즐겨찾기</h1>
        <div>
          <button className='border border-[#7F6FD8] text-[#7F6FD8] rounded-[5px] text-[11px] py-[4px] px-[5px]'>배달</button>
          <button className='border border-[#BEBBCF] text-[#BEBBCF] rounded-[5px] text-[11px] py-[4px] px-[5px] ml-[8px]'>룸메이트</button>
        </div>
      </div>
      <div className='flex flex-col gap-[16px]'>
        <MyBookmark/>
        <MyBookmark/>
        {/* 북마크 3개 이상일때 더보기 버튼 띄우기 */}
        <button className='flex justify-center items-center rounded-[5px] border border-[#DEDEDE] h-[40px]'>
          <div className='flex text-[12px]'>
            더보기  <img src={Chevron}/>
          </div>
        </button>
      </div>
    </div>
  )
}

export default BookmarkList