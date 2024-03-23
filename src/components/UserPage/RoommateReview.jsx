import React from 'react'
//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

//images
import Yoo from '../../assets/images/유재석.svg'
import Dots from '../../assets/images/dots.svg'

const RoommateReview = () => {
  return (
    <SettingStyle className='flex pb-[24px]'>
      <img src={Yoo} className='w-[40px] h-[40px] mr-[13px]' alt='user profile image'/>
      <div className='text-left w-[calc(100%-53px)]'>
        <div className='flex justify-between mb-[2px]'>
          <div>
            <span className='review-name mr-[13px] text-[14px]'>유재석</span>
            <span className='review-rate text-[12px]'>최고예요</span>
          </div>
          <button>
            <img src={Dots} className='w-[16px] h-[16px]'/>
          </button>
        </div>
        <p className='review-room mb-[16px]'>2023년 1학기 B동</p>
        <div className='review-comment overflow-hidden whitespace-nowrap overflow-hidden text-ellipsis'>
          한 학기 동안 문제없이 잘 생활했습니다!
          다음에도 기회 되면 같은 방 하고 싶어요
        </div>
      </div>

    </SettingStyle>
  )
}

export default RoommateReview

const SettingStyle = styled.div`
  .review-name {
    font-size: ${FONT.body4SB15};
  }
  .review-rate {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.purple1};
  }
  .review-room {
    font-size: ${FONT.caption3M12};
    color: ${COLOR.gray500};
  }
  .review-comment {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.gray800};
  }
`