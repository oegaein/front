import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'
import RoommateReview from './RoommateReview'

import Next from '@assets/images/next.svg'
const RoommateReviews = () => {
  return (

    <SettingStyle className='relative bg-white px-[24px]'>
      <div className='pb-[16px] pt-[24px] flex justify-between items-center'>
        <h1 className='roommate-review-title'>받은 룸메이트 후기 2</h1>
        <Link to='reviews' className='more flex'>
          더보기
          <img src={Next} alt='see more icon'/>
        </Link>
      </div>
      <div>
        <p className='nodata-ment mb-[24px]'>받은 룸메이트 후기가 아직 없어요.</p>
        <RoommateReview/>
        <RoommateReview/>
        <RoommateReview/>
      </div>
    </SettingStyle>
  )
}

export default RoommateReviews

const SettingStyle = styled.div`
  .roommate-review-title {
    font-size: ${FONT.title3SB17};
  }
  .more {
    font-size: ${FONT.caption2M14};
  }
  .nodata-ment {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.gray800};
  }

`