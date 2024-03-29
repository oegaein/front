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

const ProfileImageContainer = ({profileImage}) => {
  const location = useLocation()
  const path = location.pathname
  return (
    <>
      <SettingStyle className={`relative h-[230px] px-[30px] bg-[${COLOR.purple1}]`}>
        <div className=''>
          {"<"}
          <img src={Dots} alt=''/>
        </div>
        <div className='text-left mt-[22px]'>
          <h1 className='mypage-heading text-white pl-[3px]'>{path === '/mypage' ? "차은우 님의 마이페이지" : "차은우 님의 프로필"}</h1>
          <div className='mypage-introduce flex mt-[18px]'>
            <img className='w-[12px] h-[12px]' src={LeftQuote} alt='left quotation mark'/>
            <span className='mx-[6px] pt-[7px]'>맛집 투어 좋아해요! ✿˘◡˘✿</span>
            <img className='w-[12px] h-[12px]' src={RightQuote} alt='right quotation mark'/>
          </div>
        </div>
        <div className={`profile-container flex justify-center items-center bg-white h-[186px] w-[186px]
        z-10 absolute translate-y-[calc(-50%)] ${path === '/mypage' ? 'left-[40px]' : 'left-[50%] translate-x-[calc(-50%)]'} top-[100%] rounded-[50%]`}>
          <img className='h-[172px] w-[172px] rounded-[50%]' src={profileImage} alt='profile-image'/>
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