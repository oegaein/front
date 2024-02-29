import React from 'react'

import Background from '../../assets/images/mypage.svg'
import Heart from '../../assets/images/heart.svg'
import Dots from '../../assets/images/dots.svg'
import ProfileLevel from '../../assets/images/profile-level.svg'

const ProfileImageContainer = ({profileImage}) => {
  return (
    <>
      <div className='relative h-[335px]' style={{backgroundImage: `url(${Background})`}}>
        <div className='w-full h-[50px]'></div>
        <div className='flex justify-between px-[24px]'>
          <div className='text-[16px] text-white'><span className='text-[20px] font-bold'>차은우</span> 님의 프로필</div>
          <div className='flex items-center'>
            <button className='mr-[6px]'><img src={Heart}/></button>
            <button><img src={Dots}/></button>
          </div>
        </div>
        <p className='absolute left-[52px] top-[112px] text-white text-[13px]'>맛집 투어 좋아해요~</p>
        <img className='z-10 absolute translate-y-[calc(-50%-95px)] left-[31.5px] top-[100%] h-[175px] w-[175px] rounded-[50%]' src={profileImage} alt='profile-image'/>
        <div className='z-20 absolute left-[175px] bottom-[13px] w-[45px] h-[45px] flex justify-center items-center' style={{backgroundImage: `url(${ProfileLevel})`}}>
          <span className='text-white text-[12px]'>80%</span>
        </div>
      </div>
    </>
  )
}

export default ProfileImageContainer