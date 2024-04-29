import React from 'react'
//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

//images
import Yoo from '../../assets/images/유재석.svg'
import Dots from '../../assets/images/dots.svg'

const RoommateReview = ({review}) => {
  return (
    <SettingStyle className='flex py-[12px]'>
      <img src={Yoo} className='w-[40px] h-[40px] mr-[13px]' alt='user profile image'/>
      <div className='text-left w-[calc(100%-53px)]'>
        <div className='flex justify-between mb-[2px]'>
          <div>
            <span className='review-name mr-[13px] text-[14px]'>{review.writer_name}</span>
            <span className='review-rate text-[12px]'>{review.evaluation}</span>
          </div>
          <button>
            <img src={Dots} className='w-[16px] h-[16px]'/>
          </button>
        </div>
        <p className='review-room mb-[16px]'>{review.semester} {review.dormitory}</p>
        <div className='review-comment overflow-hidden whitespace-nowrap overflow-hidden text-ellipsis'>
          {review.content}
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