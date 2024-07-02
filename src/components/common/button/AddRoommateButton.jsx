import React from 'react'
import styled from 'styled-components'
import COLOR from '@styles/color'
import FONT from '@styles/fonts'
import Plus from '@assets/images/plus.svg'
import { Link } from 'react-router-dom'

const AddRoommateButton = () => {
  return (
    <SettingStyle to="/post-roommate"
    className='rounded-[20px] w-[109px] h-[44px] flex justify-center items-center fixed z-10 bottom-[110px] right-[13px] shadow-[2px_2px_10px_rgba(0,0,0,0.25)] min-[393px]:right-[calc(50%-12rem)]'>
      <img className='h-[14px] w-[14px]' src={Plus} alt='write icon'/>
      <span className='btn-text ml-[6px]'>룸메이트</span>
    </SettingStyle>
  )
}

export default AddRoommateButton

const SettingStyle = styled(Link)`
  background-color: ${COLOR.purple1};
  .btn-text {
    font-size: ${FONT.buttonSB15};
    color: white;
  }
`