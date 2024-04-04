import React from 'react'
import styled from 'styled-components'

//styles
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

//images
import Yoo from '../../assets/images/유재석.svg'

const Roommate = () => {
  return (
    <SettingStyle className={`flex bg-white border border-[${COLOR.gray100}] rounded-[20px] p-[14px]`}>
      <img className='w-[100px] h-[100px] mr-[12px]' src={Yoo}/>
      <div className='w-full flex flex-col justify-between'>
        <div>
          <div className='flex items-center justify-between'>
            <div>
              <span className='room mr-[10px]'>룸메 평점</span>
              <span className='mates-number'>모집인원 1명</span>
            </div>
            <span className='dday'>D-4</span>
          </div>
          <div className='text-left mt-[7px]'>
            <p className='roommate-title max-w-[205px] whitespace-nowrap overflow-hidden text-ellipsis'>예민하지 않은 분 찾아요~~~~~~~~~~~~~~</p>
            <div>
              <span className='name mr-[6px]'>허윤진</span>
              <span className='gender'>여성</span>
            </div>
          </div>
        </div>
        <div className='text-right'>
          <a className='register-btn'>매칭신청</a>
        </div>
      </div>
    </SettingStyle>
  )
}

export default Roommate

const SettingStyle = styled.div`
  .room {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.purple1};
  }
  .mates-number {
    font-size: ${FONT.caption3M12};
  }
  .dday {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.gray500};
  }
  .roommate-title {
    font-size: ${FONT.caption1SB14};
  }
  .name {
    font-size: ${FONT.caption2M14};
  }
  .gender {
    font-size: ${FONT.caption3M12};
    color: ${COLOR.gray500};
  }

  .register-btn {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.purple1};
  }
`