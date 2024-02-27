import React from 'react'
import ChatIcon from '../../assets/images/chat.svg'
import RoommateIcon from '../../assets/images/roommateIcon.svg'
import HomeIcon from '../../assets/images/home-icon.svg'
import DeliveryIcon from '../../assets/images/motorbike-icon.svg'
import MypageIcon from '../../assets/images/user-icon.svg'

const Navbar = () => {
  return (
    <div className='flex absolute bottom-0 justify-around items-center h-[66px] bg-white text-[#707070] text-[10px] w-full'>
          <div className='flex flex-col items-center'>
            <div className='h-[27px]'>
              <img src={ChatIcon}/>
            </div>
            <span>채팅</span>
          </div>
          <div className='flex flex-col items-center'>
          <div className='h-[27px]'>
              <img src={RoommateIcon}/>
            </div>
            <span>룸메이트</span>
          </div>
          <div className='flex flex-col items-center'>
          <div className='h-[27px]'>
              <img src={HomeIcon}/>
            </div>
            <span>홈</span>
          </div>
          <div className='flex flex-col items-center'>
          <div className='h-[27px]'>
              <img src={DeliveryIcon}/>
            </div>
            <span>공동배달</span>
          </div>
          <div className='flex flex-col items-center'>
          <div className='h-[27px]'>
              <img src={MypageIcon}/>
            </div>
            <span>마이페이지</span>
          </div>
        </div>
  )
}

export default Navbar