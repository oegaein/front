import React, {useState} from 'react'
import axios from 'axios'

//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

//images
import Plus from '@assets/images/plus.svg'
//components
import RoommateSwiperList from '@components/common/RoommateSwiperList';
import SearchAndNotice from '@components/common/SearchAndNotice';
import FindRoommates from '@common/FindRoommates'
const RoommatePage = () => {
  const fetchMatchingPosts = async () => {
    try {
      const response = await axios.get('/api/v1/matchingposts')
      return response.data
    } catch (err) {
      throw err;
    }
  }
  return (
    <SettingStyle className='bg-white flex flex-col gap-[10px] scroll-smooth'>
      <div>
        <SearchAndNotice/>
        <RoommateSwiperList type={'best'}/>
      </div>
      <div className='bg-white'>
        <button className={`write-btn rounded-[20px] w-[109px] h-[44px] flex justify-center items-center fixed z-10 bottom-[110px] right-[13px] shadow-[2px_2px_10px_rgba(0,0,0,0.25)] min-[393px]:right-[calc(50%-12rem)]`}>
          <img className='h-[14px] w-[14px]' src={Plus} alt='write icon'/>
          <span className='write-btn-text ml-[6px]'>룸메이트</span>
        </button>
        <FindRoommates/>


      </div>
    </SettingStyle>
  )
}

export default RoommatePage

const SettingStyle = styled.div`
  background-color: ${COLOR.gray50};

  .write-btn {
    background-color: ${COLOR.purple1};
  }
  .write-btn-text {
    font-size: ${FONT.buttonSB15};
    color: white;
  }
`