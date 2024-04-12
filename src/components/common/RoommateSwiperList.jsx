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
  const fetchData = () => {
    //type: new/best/mypost
  }
  return (
    <SettingStyle className='bg-white'>
      <Swiper
      spaceBetween={12}
      slidesPerView={2}
      loop={true}
      className="mySwiper pt-[5px]">
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
      {type === 'new' || 'post' &&
      <div className='px-[25px] mt-[16px]'>
        <Link to='/mypage/roommate-applylist' className={`more flex justify-center items-center rounded-[10px] border border-[${COLOR.gray200}] h-[40px]`}>
          더보기
          <img src={Next} alt='see more icon'/>
        </Link>
      </div>
      }
    </SettingStyle>
  )
}

export default RoommateSwiperList


const SettingStyle = styled.div`
  background-color: white;

  .more {
    font-size: ${FONT.caption2M14};
  }

`