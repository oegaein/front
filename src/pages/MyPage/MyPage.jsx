import React, {useState} from 'react'
import { Link } from 'react-router-dom'
// styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

// images
import Profile from '../../assets/images/profile-image.svg'
import Notification from '@assets/images/notification 1.svg'
import Heart from '@assets/images/heart (10) 1.svg'
import Review from '@assets/images/review 1.svg'
import Next from '@assets/images/next.svg'
import Dots from '@assets/images/dots-black.svg'
import RoommateSwiperList from '@common/RoommateSwiperList'
import LikeItem from '@components/LikePage/LikeItem'
const MyPage = () => {
  const [profileImage, setProfileImage] = useState(Profile)
  const [uploadPostType, setUploadPostType] = useState('roommate')
  const handleClickUploadPost = (type) => {
    setUploadPostType(type)
  }
  return (
    <SettingStyle className='flex flex-col gap-[10px]'>
      <section className='bg-white px-[25px] py-[24px]'>
        <div className='flex justify-between'>
          <div className='flex text-left gap-[20px]'>
            <div>
              <img className='w-[45px] h-[45px] rounded-[50%]' src={Profile}/>
            </div>
            <div>
              <p className='myname'>happy푸바옹</p>
              <p className='small-text'>맛집 투어 좋아해요!</p>
            </div>
          </div>
          <div>
            <button>프로필 보기</button>
          </div>
        </div>
        <div className='small-text px-[42px] pt-[48px] flex justify-between'>
          <Link to='/notification' className='flex flex-col justify-center items-center'>
            <img className='mb-[14px]' src={Notification} alt='알림 페이지로 가기'/>
            <span>알림</span>
          </Link>
          <Link to='#' className='flex flex-col items-center'>
            <img className='mb-[14px]' src={Heart} alt='알림 페이지로 가기'/>
            <span>좋아요</span>
          </Link>
          <Link to={`/user/1/reviews`} className='flex flex-col items-center'>
            <img className='mb-[14px]' src={Review} alt='알림 페이지로 가기'/>
            <span>후기</span>
          </Link>
        </div>
      </section>

      <section className='bg-white px-[25px] py-[24px] text-left'>
        <h1 className='heading-text'>룸메이트 신청 요청</h1>
        <div className='pt-[16px] flex flex-col gap-[16px]'>
          <div className='flex justify-between'>
            <div className='flex gap-[20px]'>
              <div>
                <img src={Profile} className='rounded-[50%] w-[45px] h-[45px]'/>
              </div>
              <div>
                <Link to='/user/1' className='username flex'>룸메찾기힘들다 <img src={Next}/></Link>
                <p className='small-text'>운동하는거 좋아함</p>
              </div>
            </div>
            <div className='flex gap-[5px]'>
              <button className='button allowed'>수락</button>
              <button className='button declined'>거절</button>
            </div>
          </div>
          
          <div className='flex justify-between'>
            <div className='flex gap-[20px]'>
              <div>
                <img src={Profile} className='rounded-[50%] w-[45px] h-[45px]'/>
              </div>
              <div>
                <Link className='username flex'>룸메찾기힘들다 <img src={Next}/></Link>
                <p className='small-text'>운동하는거 좋아함</p>
              </div>
            </div>
            <div className='flex gap-[5px]'>
              <button className='button allowed'>수락</button>
              <button className='button declined'>거절</button>
            </div>
          </div>
        </div>
      </section>
      {/* 글 3개까지 보이기 */}
      <section className='bg-white py-[24px]'>
        <div className='flex justify-between px-[25px]'>
          <h1 className='heading-text'>내가 올린 글</h1>
          <Link className='flex items-center justify-between username whitespace-nowrap'>
            더보기 <img src={Next}/>
          </Link>
        </div>
        <div>
          <div className='flex mt-[24px]'>
            <div onClick={()=>handleClickUploadPost('roommate')}className={`notification-title ${uploadPostType === 'roommate' && 'selected-title'}`}>룸메이트</div>
            <div onClick={()=>handleClickUploadPost('delivery')}className={`notification-title ${uploadPostType === 'delivery' && 'selected-title'}`}>공동배달</div>
          </div>
          <div className='px-[25px] mt-[16px]'>
            <div className='mypost px-[15px] py-[20px]'>
              <div className='flex justify-between'>
                <div className='flex items-center justify-between gap-[10px]'>
                  <span className='color-purple1 font-caption2m14'>A동 4인실</span>
                  <span className='font-caption3m12'>모집인원 2명</span>
                </div>
                <div className='flex gap-[14px]'>
                  <div className='font-caption2m14 color-gray500'>11분전</div>
                  <button><img src={Dots}/></button>
                </div>
              </div>

              <div className='flex justify-between mt-[32px]'>
                <div className='flex justify-between gap-[13px]'>
                  <div>
                    <img src={Profile} className='rounded-[50%] w-[45px] h-[45px]'/>
                  </div>
                  <div className='text-left overflow-hidden'>
                    <p className='font-caption1sb14 whitespace-nowrap overflow-hidden text-ellipsis'>룸메찾기힘들다ddddddddddddddddd</p>
                    <p className='font-caption2m14'>happy푸바옹 <span className='font-caption3m12 color-gray400'>남성</span></p>
                  </div>
                </div>
                <div className='self-end whitespace-nowrap'>
                  <button className='color-purple1 font-caption2m14'>매칭확정</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-white py-[24px] text-left'>
        <h1 className='heading-text mb-[16px] px-[25px]'>내 룸메이트 신청 목록</h1>
        <RoommateSwiperList type='mypost'/>
      </section>
      <section className='bg-white pt-[24px]'>
        <div className='flex justify-between px-[25px]'>
          <h1 className='heading-text'>좋아요</h1>
          <Link to='/mypage/like' className='flex items-center justify-between username whitespace-nowrap'>
            더보기 <img src={Next}/>
          </Link>
        </div>
        <div>
          <div className='flex mt-[24px]'>
            <div onClick={()=>handleClickUploadPost('roommate')}className={`notification-title ${uploadPostType === 'roommate' && 'selected-title'}`}>룸메이트</div>
            <div onClick={()=>handleClickUploadPost('delivery')}className={`notification-title ${uploadPostType === 'delivery' && 'selected-title'}`}>공동배달</div>
          </div>
        </div>
        <div className='likelist flex flex-col gap-[1px]'>
          <LikeItem profileImage={Profile}/>
          <LikeItem profileImage={Profile}/>
        </div>
      </section>
    </SettingStyle>
  )
}

export default MyPage


const SettingStyle = styled.main`
  background-color: ${COLOR.gray50};
  .color-purple1 {
    color: ${COLOR.purple1};
  }
  .color-gray500 {
    color: ${COLOR.gray500};
  }
  .color-gray400 {
    color: ${COLOR.gray400};
  }
  .font-caption2m14 {
    font-size: ${FONT.caption2M14};
  }
  .font-caption3m12 {
    font-size: ${FONT.caption3M12};
  }
  .font-caption1sb14 {
    font-size: ${FONT.caption1SB14};
  }
  .myname {
    font-size: ${FONT.body3M16};
  }
  .username {
    font-size: ${FONT.caption2M14};
  }
  .heading-text {
    font-size: ${FONT.title3SB17};
  }
  .small-text {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.gray600};
  }
  .button {
    border: 1px solid ${COLOR.gray100};
    font-size: ${FONT.caption2M14};
    width: 43px;
    height: 26px;
    border-radius: 5px;
    &.allowed {
      color: ${COLOR.gray600};
    }
    &.declined {
      color: ${COLOR.red};
    }
  }
  .notification-title {
    flex: 1;
    font-size: ${FONT.caption2M14};
    color: ${COLOR.gray500};
    border-bottom: 2px solid ${COLOR.gray100};
    padding-bottom: 16px;
    cursor: pointer;
    &:hover {
      border-bottom: 2px solid ${COLOR.purple1};
      color: black;
    }
  }
  .selected-title {
    border-bottom: 2px solid ${COLOR.purple1};
    color: black;
  }
  .noresults {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.gray500};
  }
  .mypost {
    border: 1px solid ${COLOR.gray100};
    border-radius: 10px;
  }
  .likelist {
    background-color: ${COLOR.gray100};
  }
`