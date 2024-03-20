import React from 'react'

//images
import Yoo from '../../assets/images/유재석.svg'

//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'
const BestRoommate = () => {
  return (
    <SettingStyle className={`w-[192px] h-[179px] border border-[${COLOR.gray100}] rounded-[20px] bg-white p-[17px] pb-[13px] ml-[12px]`}>
      <div className='flex items-center justify-between mb-[12px]'>
        <span className='room'>A동 4인실</span>
        <span className='dday'>D-7</span>
      </div>
      <p className='title text-left mb-[13px]'>마음 잘 맞는 룸메 구해요!</p>
      <div className='flex items-center'>
        <img src={Yoo} alt='profile image'/>
        <div className='ml-[10px] text-left'>
          <p>
            <span className='name mr-[6px]'>유재석</span>
            <span className='gender'>남성</span>
          </p>
          <p className='number'>모집인원 2명</p>
        </div>
      </div>
      <div className='text-right'>
      <button className='register text-right'>매칭신청</button>
      </div>
    </SettingStyle>
  )
}

export default BestRoommate

const SettingStyle = styled.button`
  .room {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.purple1};
  }
  .dday {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.gray500};
  }
  .title {
    font-size: ${FONT.caption1SB14};
  }
  .name {
    font-size: ${FONT.caption2M14};
  }
  .gender {
    font-size: ${FONT.caption3M12};
    color: ${COLOR.gray500};
  }
  .number {
    font-size: ${FONT.caption3M12};
  }
  .register {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.purple1};
  }
`