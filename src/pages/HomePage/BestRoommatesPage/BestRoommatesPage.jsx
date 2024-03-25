import React from 'react'
//components
import Buttons from '@components/HomePage/Buttons'

//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'
import RoommateScrollList from '@common/RoommateScrollList'

const BestRoommatesPage = () => {
  return (
    <SettingStyle className='flex flex-col gap-[10px]'>
      <div className='p-[25px] bg-white'>
        <Buttons/>
      </div>
      <RoommateScrollList/>
    </SettingStyle>
  )
}

export default BestRoommatesPage

const SettingStyle = styled.div`
  background-color: ${COLOR.gray50};
`