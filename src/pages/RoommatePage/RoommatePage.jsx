import React, {useState} from 'react'
import axios from 'axios'

//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

//images
//components
import RoommateSwiperList from '@components/common/RoommateSwiperList';
import SearchAndNotice from '@components/common/SearchAndNotice';
import RoommateScrollList from '@common/RoommateScrollList'
import AddRoommateButton from '@common/button/AddRoommateButton'
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
      <AddRoommateButton/>
      <div>
        <SearchAndNotice/>
        <RoommateSwiperList type={'best'}/>
      </div>
      <RoommateScrollList/>
    </SettingStyle>
  )
}

export default RoommatePage

const SettingStyle = styled.div`
  background-color: ${COLOR.gray50};

`