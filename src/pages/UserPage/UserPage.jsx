import React from 'react'

import InitialProfile from '@assets/images/initial-profile.svg'
import ProfileImage from '@assets/images/profile-image.svg'

//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

//components
import Header from '@common/header/Header'
import ProfileImageContainer from '@components/UserPage/ProfileImageContainer'
import RoommateReviewList from '@components/UserPage/RoommateReviewList'
import UserPageInfo from '@components/UserPage/UserPageInfo'
import UserLifeStyles from '@components/UserPage/UserLifeStyles'
const UserPage = () => {
  return (
    <SettingStyle>
      <div className="px-[28px]">
				<Header backPath="/roommate" rightContent=" " rightEvent={() => {}}>
					<span>차은우 님의 프로필</span>
				</Header>
			</div>
      <ProfileImageContainer/>
      <div className='userinfolifestyles flex flex-col gap-[10px] border-b border-[#DEDEDE]'>
        <div className='bg-white'>
          <div className='user-info pt-[103px] pb-[24px]  px-[25px]'>
            <h1 className='information-title text-left mb-[16px]'>기본 정보</h1>
            <UserPageInfo/>
          </div>
          <div className='px-[25px] py-[24px]'>
            <h1 className='pb-[19px] text-left font-bold'>성향 및 라이프 스타일</h1>
            <UserLifeStyles/>
          </div>
        </div>
        <RoommateReviewList/>
      </div>
    </SettingStyle>
  )
}

export default UserPage

const SettingStyle = styled.div`
  background-color: white;
  .userinfolifestyles {
    background-color: ${COLOR.gray50};
  }
  .user-info {
    border-bottom: 1px solid ${COLOR.gray200};
  }

  .information-title {
    font-size: ${FONT.title3SB17};
  }

`