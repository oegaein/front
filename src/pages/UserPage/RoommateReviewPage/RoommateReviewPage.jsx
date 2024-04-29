import RoommateReview from '@components/UserPage/RoommateReview'
import RoommateReviewList from '@components/UserPage/RoommateReviewList'
import React from 'react'
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'
import { useParams } from 'react-router-dom'
import Header from '@common/header/Header'
const RoommateReviewPage = () => {
  const {memberId} = useParams()
  return (
    <SettingStyle>
      <div className="px-[28px]">
				<Header backPath={`user/${memberId}`} rightContent=" " rightEvent={() => {}}>
					<span>룸메이트 후기</span>
				</Header>
			</div>
      <div className='main pt-[12px]'>
        <RoommateReviewList memberId={memberId} isInReviewPage={true}/>
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