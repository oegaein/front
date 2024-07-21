import React from 'react'
import { useNavigate } from 'react-router-dom'
//components
import Buttons from '@components/HomePage/Buttons'
import Header from '@common/header/Header'
//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'
import RoommateScrollList from '@common/RoommateScrollList'
//images
import Alarm from '@assets/images/common/alarm.svg';

const EndingsoonPage = () => {
  const navigate = useNavigate()
  return (
    <SettingStyle className='flex flex-col gap-[10px]'>
      <div>
        <div className="px-[28px] bg-white">
          <Header backPath="/home" rightContent={Alarm} rightEvent={() => {
              navigate('/alarm');
            }}>
            <span className='header'>마감임박</span>
          </Header>
        </div>
        <div className='p-[25px] bg-white'>
          <Buttons/>
        </div>
      </div>
      <RoommateScrollList type='imminent'/>
    </SettingStyle>
  )
}

export default EndingsoonPage

const SettingStyle = styled.div`
  background-color: ${COLOR.gray50};
  .header {
    font: ${FONT.title2B19}
  }
`