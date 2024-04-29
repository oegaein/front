import React from 'react'
import { useLocation } from 'react-router-dom'
//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

//images
import LeftQuote from '@assets/images/left-quote.svg'
import RightQuote from '@assets/images/right-quote-sign.svg'
import Dots from '@assets/images/header-dots.svg'
import InitialProfile from '@assets/images/initial-profile.svg'

const ProfileImageContainer = ({introduction, profileImage=InitialProfile}) => {
  const location = useLocation()
  const path = location.pathname
  return (
    <>
      <SettingStyle className={`relative h-[160px] px-[30px] bg-[${COLOR.purple1}]`}>
        <div className='text-left'>
          <div className='mypage-introduce flex'>
            <img className='w-[12px] h-[12px]' src={LeftQuote} alt='left quotation mark'/>
            <span className='mx-[6px] pt-[7px]'>{introduction}</span>
            <img className='w-[12px] h-[12px]' src={RightQuote} alt='right quotation mark'/>
          </div>
        </div>
        <div className={`profile-container flex justify-center items-center bg-white h-[186px] w-[186px]
        z-10 absolute translate-y-[calc(-50%)] ${path === '/mypage' ? 'left-[40px]' : 'left-[50%] translate-x-[calc(-50%)]'} top-[100%] rounded-[50%]`}>
          <img onerror={`this.onerror=null; this.src=${InitialProfile};`} 
          className={`rounded-[50%] ${profileImage === InitialProfile ? 'h-[58px] w-[58px]' : 'h-[172px] w-[172px]'}`} 
          src={profileImage} 
          alt='profile-image'/>
          {path === '/mypage' && 
          <div className={`profile-perfection z-20 absolute left-[150px] bottom-[14px] w-[45px] h-[45px] flex justify-center items-center rounded-[50%]`}>
            80%
          </div>}
        </div>

      </SettingStyle>
    </>
  )
}

export default ProfileImageContainer

const SettingStyle = styled.div`
  background-color: ${COLOR.purple1};
  .profile-perfection {
    background-color: ${COLOR.purple1};
    font-size: ${FONT.caption3M12};
    color: white;
  }
  .mypage-heading {
    font-size: ${FONT.title1SB20};
  }
  .mypage-introduce {
    font-size: ${FONT.body5M15};
    color: white;
  }
  .profile-container {
    border: 1px solid ${COLOR.gray100};
  }
`