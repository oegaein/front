import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Header from '@common/header/Header'

import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

import Next from '@assets/images/next.svg'
import Dots from '@assets/images/dots-black.svg'
import Profile from '@assets/images/profile-image.svg'


const MyPostPage = () => {
  const [uploadPostType, setUploadPostType] = useState('roommate')

  const handleClickUploadPost = (type) => {
    setUploadPostType(type)
  }
  return (
    <SettingStyle className='bg-white pb-[24px]'>
      <div className="px-[28px]">
				<Header backPath="/mypage" rightContent=" " rightEvent={() => {}}>
					<span className='font-bold'>내가 올린 글</span>
				</Header>
			</div>
      <div>
        <div className='flex'>
          <div onClick={()=>handleClickUploadPost('roommate')}className={`notification-title ${uploadPostType === 'roommate' && 'selected-title'}`}>룸메이트</div>
          <div onClick={()=>handleClickUploadPost('delivery')}className={`notification-title ${uploadPostType === 'delivery' && 'selected-title'}`}>공동배달</div>
        </div>
        <NoResults/>
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

            <div className='flex justify-between mt-[28px]'>
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
    </SettingStyle>
  )
}

export default MyPostPage

const NoResults = () => {
  return (
    <p className='noresults mt-[138px]'>내가 올린 글이 없어요.</p>
  )
}

const SettingStyle = styled.main`
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