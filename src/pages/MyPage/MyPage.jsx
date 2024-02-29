import React, {useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// 컴포넌트
import RoommateReviewList from '../../components/UserPage/RoommateReviewList'

// 이미지
import Profile from '../../assets/images/profile-image.svg'
import UserInfoAndLifeStyles from 'components/UserPage/UserInfoAndLifeStyles';
import ProfileImageContainer from 'components/UserPage/ProfileImageContainer';
import RoommateAndDeliveryStatus from 'components/UserPage/RoommateAndDeliveryStatus';
import BookmarkList from 'components/UserPage/BookmarkList';

const MyPage = () => {
  const [profileImage, setProfileImage] = useState(Profile)
  console.log(profileImage)
  return (
    <>
      <ProfileImageContainer profileImage={profileImage}/>
      <div className='flex flex-col bg-[#F3F5F7] gap-[10px] border-b border-[#DEDEDE]'>
        <UserInfoAndLifeStyles type={'mypage'}/>
        <RoommateAndDeliveryStatus/>
        <BookmarkList/>
        <RoommateReviewList/>
      </div>
    </>
  )
}

export default MyPage