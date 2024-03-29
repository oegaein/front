import ProfileImageContainer from 'components/UserPage/ProfileImageContainer'
import UserInfoAndLifeStyles from 'components/UserPage/UserInfoAndLifeStyles'
import RoommateReviewList from 'components/UserPage/RoommateReviewList'
import React from 'react'

const UserPage = () => {
  return (
    <>
      <ProfileImageContainer/>
      <div className='flex flex-col bg-[#F3F5F7] gap-[10px] border-b border-[#DEDEDE]'>
        <UserInfoAndLifeStyles/>
        <RoommateReviewList/>
      </div>
    </>
  )
}

export default UserPage