import React from 'react'

//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

const UserPageInfo = () => {
  return (
    <SettingStyle className='flex flex-col gap-[16px] px-[25px] pt-[103px] pb-[24px]'>
      <h1 className='information-title  text-left'>기본 정보</h1>
        <div className='flex'>
          <div className='flex mr-[20px]'>
            <span className='info-label'>성별</span>
            <span className='info-value'>남성</span>
          </div>
          <div className='flex mr-[20px]'>
            <span className='info-label'>생년월일</span>
            <span className='info-value'>1999.05.25</span>
          </div>
        </div>
        <div className='flex'>
          <div className='flex mr-[20px]'>
            <span className='info-label'>학번</span>
            <span className='info-value'>18학번</span>
          </div>
          <div className='flex mr-[20px]'>
            <span className='info-label'>전공</span>
            <span className='info-value'>폴란드어과</span>
          </div>
        </div>
    </SettingStyle>
  )
}

export default UserPageInfo

const SettingStyle = styled.div`
  border-bottom: 1px solid ${COLOR.gray200};
    .information-title {
    font-size: ${FONT.title3SB17};
  }
  .info-label {
    font-size: ${FONT.caption2M14};
    margin-right: 8px;
  }
  .info-value {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.purple1};
  }

`