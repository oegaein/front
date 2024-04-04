import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useLocation } from 'react-router-dom';

import BestRoommate from '../RoommatePage/BestRoommate';

//styles
import styled from 'styled-components';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';
//images
import Premium from '@assets/images/premium-quality.svg'
import Next from '@assets/images/next.svg'

const RoommateSwiperList = ({type}) => {
  const location = useLocation();
  const path = location.pathname

  return (
    <SettingStyle className='bg-white pb-[24px]'>
      {type === 'best' ? <BestRoommateTitle path={path}/> : <NewRoommateTitle/>}
      <Swiper
      spaceBetween={12}
      slidesPerView={2}
      loop={true}
      className="mySwiper mt-[5px]">
        <SwiperSlide>
          <BestRoommate/>
        </SwiperSlide>
        <SwiperSlide>
          <BestRoommate/>
        </SwiperSlide>
        <SwiperSlide>
          <BestRoommate/>
        </SwiperSlide>
      </Swiper>
      {type === 'new' &&
      <div className='px-[25px] mt-[16px]'>
        <Link to='/roommate' className={`more flex justify-center items-center rounded-[10px] border border-[${COLOR.gray200}] h-[40px]`}>
          더보기
          <img src={Next} alt='see more icon'/>
        </Link>
      </div>
      }
    </SettingStyle>
  )
}

export default RoommateSwiperList

const BestRoommateTitle = ({path}) => {
  return (
    <div className='px-[25px] pt-[25px]'>
      <div className='flex justify-between items-center pb-[10px]'>
        <div className='flex'>
          <h1 className='heading text-left font-bold mr-[3px]'>베스트 룸메이트</h1>
          <img src={Premium} alt='best roommates icon'/>
        </div>
        <Link to='/home/best-roommates' className='more flex'>
          더보기
          <img src={Next} alt='see more icon'/>
        </Link>
      </div>
      {path === '/home' ?
        <p className='roommateMent pb-[10px]'>이전 룸메이트로부터 좋은 평가를 받았어요</p>
        : null
      }
    </div>
  )
}

const NewRoommateTitle = ({path}) => {
  return (
    <div className='px-[25px] pt-[25px]'>
      <div className='flex justify-between items-center pb-[10px]'>
        <div className='flex'>
          <h1 className='heading text-left font-bold mr-[3px]'>새로 올라온 룸메이트</h1>
        </div>
      </div>
    </div>
  )
}

const SettingStyle = styled.div`
  background-color: white;

  .roommateMent {
    color: ${COLOR.gray500};
    font-size: ${FONT.caption2M14};
    text-align: left;
  }
  .heading {
    font-size: ${FONT.title3SB17};
  }
  .more {
    font-size: ${FONT.caption2M14};
  }
  .seemore-btn {

  }
`