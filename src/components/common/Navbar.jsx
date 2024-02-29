import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import ChatIcon from '../../assets/images/chat.svg'
import ChatIconClicked from '../../assets/images/chat-icon-clicked.svg'
import RoommateIcon from '../../assets/images/roommateIcon.svg'
import RoommateIconClicked from '../../assets/images/roommate-icon-clicked.svg'
import HomeIcon from '../../assets/images/home-icon.svg'
import HomeIconClicked from '../../assets/images/home-icon-clicked.svg'
import DeliveryIcon from '../../assets/images/motorbike-icon.svg'
import DeliveryIconClicked from '../../assets/images/delivery-icon-clicked.svg'
import MypageIcon from '../../assets/images/user-icon.svg'
import MypageIconClicked from '../../assets/images/user-icon-clicked.svg'


const Navbar = () => {
  const [activeLink, setActiveLink] = useState('home')
  return (
    <div className='z-10 flex sticky bottom-0 right-0 left-0 justify-around items-center h-[66px] bg-white text-[#707070] text-[10px] w-full'>
          <Link to='#' className='flex flex-col items-center' onClick={()=>setActiveLink('chat')}>
            <div className='h-[27px]'>
              <img src={activeLink === 'chat' ? ChatIconClicked : ChatIcon}/>
            </div>
            <span>채팅</span>
          </Link>
          <Link to='/roommate' className='flex flex-col items-center' onClick={()=>setActiveLink('roommate')}>
            <div className='h-[27px]'>
              <img src={activeLink === 'roommate' ? RoommateIconClicked : RoommateIcon}/>
            </div>
            <span>룸메이트</span>
          </Link>
          <Link to='/home' className='flex flex-col items-center' onClick={()=>setActiveLink('home')}>
            <div className='h-[27px]'>
              <img src={activeLink === 'home' ? HomeIconClicked : HomeIcon}/>
            </div>
            <span>홈</span>
          </Link>
          <Link className='flex flex-col items-center' onClick={()=>setActiveLink('delivery')}>
            <div className='h-[27px]'>
              <img src={activeLink === 'delivery' ? DeliveryIconClicked : DeliveryIcon}/>
            </div>
            <span>공동배달</span>
          </Link>
          <Link to='/mypage' className='flex flex-col items-center' onClick={()=>setActiveLink('mypage')}>
            <div className='h-[27px]'>
              <img src={activeLink === 'mypage' ? MypageIconClicked : MypageIcon}/>
            </div>
            <span>마이페이지</span>
          </Link>
        </div>
  )
}

export default Navbar