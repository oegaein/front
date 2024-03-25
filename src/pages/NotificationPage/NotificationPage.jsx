import React, {useState} from 'react'
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'
import Notification from '@common/NotificationPage/Notification'

const NotificationPage = () => {
  const [selectedTitle, setSelectedTitle] = useState('roommate')
  const handleClick = (type) => {
    setSelectedTitle(type)
  }
  return (
    <SettingStyle>
      <div className='flex'>
        <div onClick={()=>handleClick('roommate')}className={`notification-title ${selectedTitle === 'roommate' && 'selected-title'}`}>룸메이트</div>
        <div onClick={()=>handleClick('delivery')}className={`notification-title ${selectedTitle === 'delivery' && 'selected-title'}`}>공동배달</div>
        <div onClick={()=>handleClick('dorm')}className={`notification-title ${selectedTitle === 'dorm' && 'selected-title'}`}>기숙사소식</div>
      </div>
      <div className='pt-[4px]'>
        {/*Show NoResults or Notification Data */}
        <NoResults/>
        <Notification/>
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
    cursor: pointer;
    &:hover {
      border-bottom: 2px solid ${COLOR.purple1};
      color: black;
    }
  }
  .selected-title {
    border-bottom: 2px solid ${COLOR.purple1};
    color: black;
  }
  .noresults {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.gray500};
  }

`

const NoResults = () => {
  return (
    <p className='noresults mt-[141px]'>새로운 소식이 없어요.</p>
  )
}