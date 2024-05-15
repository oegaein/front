import React from 'react'

//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

const UserPageInfo = ({userInfo}) => {
  return (
    <SettingStyle className='flex flex-col gap-[16px]'>
        <div className='flex'>
          <div className='flex mr-[20px]'>
            <span className='info-label'>성별</span>
            <span className='info-value'>{userInfo?.gender}</span>
          </div>
          <div className='flex mr-[20px]'>
            <span className='info-label'>생년월일</span>
            <span className='info-value'>{userInfo?.birthdate.substring(0, 10)}</span>
          </div>
        </div>
        <div className='flex'>
          <div className='flex mr-[20px]'>
            <span className='info-label'>학번</span>
            <span className='info-value'>{userInfo?.student_no}학번</span>
          </div>
          <div className='flex mr-[20px]'>
            <span className='info-label'>전공</span>
            <span className='info-value'>{userInfo?.major}</span>
          </div>
        </div>
    </SettingStyle>
  )
}

export default UserPageInfo

const SettingStyle = styled.div`
  .info-label {
    font-size: ${FONT.caption2M14};
    margin-right: 8px;
  }
  .info-value {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.purple1};
  }

`