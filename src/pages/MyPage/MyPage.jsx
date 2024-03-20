import React, {useState} from 'react'
// components
import RoommateReviewList from '../../components/UserPage/RoommateReviewList'

// images
import Profile from '../../assets/images/profile-image.svg'
import UserInfoAndLifeStyles from 'components/UserPage/UserInfoAndLifeStyles';
import ProfileImageContainer from 'components/UserPage/ProfileImageContainer';
import RoommateAndDeliveryStatus from 'components/UserPage/RoommateAndDeliveryStatus';
import BookmarkList from 'components/UserPage/BookmarkList';

const MyPage = () => {
  const [profileImage, setProfileImage] = useState(Profile)
  console.log(profileImage)
  return (
    <div className='h-full'>
      <ProfileImageContainer profileImage={profileImage}/>
      <div className='flex flex-col mt-[121px] bg-[#F3F5F7] gap-[10px] border-b border-[#DEDEDE]'>
        <UserInfoAndLifeStyles type={'mypage'}/>
        <RoommateAndDeliveryStatus/>
        <BookmarkList/>
        <RoommateReviewList/>
      </div>
    </div>
  )
}

export default MyPage