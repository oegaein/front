import React from 'react'
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

import ProfileImage from '@assets/images/ProfilePhoto.svg'
import Close from '@assets/images/close.svg'

const Notification = () => {
  return (
    <SettingStyle className='flex justify-between px-[24px] py-[12px]'>
      <div className='flex'>
        <div>
          <img src={ProfileImage} className='w-[65px] h-[65px]' alt='profile'/>
        </div>
        <div className='pt-[7px] ml-[10px] text-left'>
          <p className='notification-contents'>차은우님이 룸메이트 신청을 보냈어요</p>
          <p className='notification-time'>30분전</p>
        </div>
      </div>
      <button className='h-[11px] w-[11px] pt-[9px]'>
        <img src={Close}  alt='close button'/>
      </button>
    </SettingStyle>

  )
}

export default Notification

const SettingStyle = styled.div`
  
  .notification-contents {
    font-size: ${FONT.body5M15};
  }
  .notification-time {
    font-size: ${FONT.caption3M12};
    color: ${COLOR.gray400};
  }

`