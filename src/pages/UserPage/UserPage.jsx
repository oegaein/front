import ProfileImageContainer from 'components/UserPage/ProfileImageContainer'
import UserInfoAndLifeStyles from 'components/UserPage/UserInfoAndLifeStyles'
import RoommateReviewList from 'components/UserPage/RoommateReviewList'
import InitialProfile from '@assets/images/initial-profile.svg'
import ProfileImage from '@assets/images/profile-image.svg'
import React from 'react'
import Header from '@common/header/Header'

const UserPage = () => {
  return (
    <>
      <div className="px-[28px]">
				<Header backPath="/roommate" rightContent=" " rightEvent={() => {}}>
					<span>차은우 님의 프로필</span>
				</Header>
			</div>
      <ProfileImageContainer/>
      <div className='flex flex-col bg-[#F3F5F7] gap-[10px] border-b border-[#DEDEDE]'>
        <UserInfoAndLifeStyles/>
        <RoommateReviewList/>
      </div>
    </>
  )
}

export default UserPage