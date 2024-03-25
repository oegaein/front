import React from 'react'
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

import ProfileImage from '@assets/images/ProfilePhoto.svg'
import Close from '@assets/images/close.svg'
const NotificationPage = () => {
  return (
    <SettingStyle>
      <div className='flex'>
        <div className='notification-title selected'>룸메이트</div>
        <div className='notification-title'>공동배달</div>
        <div className='notification-title'>기숙사소식</div>
      </div>
      <div className='pb-[4px]'>
        <div className='flex justify-between px-[24px] py-[12px]'>
          <div className='flex'>
            <div>
              <img src={ProfileImage} className='w-[65px] h-[65px]' alt='profile'/>
            </div>
            <div className='pt-[7px] ml-[10px] text-left'>
              <p className='notification-contents'>차은우님이 룸메이트 신청을 보냈어요</p>
              <span className='notification-time'>30분전</span>
            </div>
          </div>
          <div className='pt-[9px]'>
            <img src={Close} className='h-[11px] w-[11px]' alt='close button'/>
          </div>
        </div>
      </div>
    </SettingStyle>
  )
}

export default NotificationPage

const SettingStyle = styled.div`
  .notification-title {
    flex: 1;
    font-size: ${FONT.caption2M14};
    color: ${COLOR.gray500};
    border-bottom: 2px solid ${COLOR.gray100};
    padding-bottom: 9px;
  }
  .selected {
    border-bottom: 2px solid ${COLOR.purple1};
    color: black;
  }
  .notification-contents {

  }
  .notification-time {
    
  }

`