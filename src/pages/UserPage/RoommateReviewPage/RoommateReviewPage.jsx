import RoommateReview from '@components/UserPage/RoommateReview'
import React from 'react'
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'
import { useParams } from 'react-router-dom'
import Header from '@common/header/Header'
const RoommateReviewPage = () => {
  const {id} = useParams()
  console.log(id)
  return (
    <SettingStyle>
      <div className="px-[28px]">
				<Header backPath={`user/${id}`} rightContent=" " rightEvent={() => {}}>
					<span>룸메이트 후기</span>
				</Header>
			</div>
      <div className='flex items-center justify-center h-full'>
      </div>
      <div className='main px-[24px] pt-[24px]'>
        <p className='nodata-ment mt-[180px]'>룸메이트 후기가 아직 없어요.</p>
        <RoommateReview/>
        <RoommateReview/>
        <RoommateReview/>
        <RoommateReview/>
      </div>
    </SettingStyle>
  )
}

export default RoommateReviewPage

const SettingStyle = styled.main`
  .main {
    border-top: 1px solid ${COLOR.gray100};
  }
  .nodata-ment {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.gray500};
  }
`