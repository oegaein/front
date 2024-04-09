import React, {useState} from 'react'
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'
import Profile from '@assets/images/profile-image.svg'
import LikeItem from '@components/LikePage/LikeItem'
const LikePage = () => {
  const [uploadPostType, setUploadPostType] = useState('roommate')
  const handleClickUploadPost = (type) => {
    setUploadPostType(type)
  }

  return (
    <SettingStyle>
      <div>
        <div className='flex mt-[24px]'>
          <div onClick={()=>handleClickUploadPost('roommate')}className={`notification-title ${uploadPostType === 'roommate' && 'selected-title'}`}>룸메이트</div>
          <div onClick={()=>handleClickUploadPost('delivery')}className={`notification-title ${uploadPostType === 'delivery' && 'selected-title'}`}>공동배달</div>
        </div>
      </div>
      <div className='likelist flex flex-col gap-[1px]'>
        <LikeItem profileImage={Profile}/>
        <LikeItem profileImage={Profile}/>
      </div>
    </SettingStyle>
  )
}

export default LikePage

const SettingStyle = styled.main`
    .notification-title {
    flex: 1;
    font-size: ${FONT.caption2M14};
    color: ${COLOR.gray500};
    border-bottom: 2px solid ${COLOR.gray100};
    padding-bottom: 16px;
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
  .likelist {
    background-color: ${COLOR.gray100};
  }
`