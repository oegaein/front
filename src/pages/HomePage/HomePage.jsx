import React, {useState} from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { useLocation } from 'react-router-dom';
import { Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
// Import Swiper styles
import "swiper/css";

//components
import SearchAndNotice from '@components/common/SearchAndNotice'
import RoommateSwiperList from '@components/common/RoommateSwiperList'
//images
import Next from '@assets/images/next.svg'
import Buttons from '@components/HomePage/Buttons';

const HomePage = () => {


  return (
    <SettingStyle className='flex flex-col gap-[10px] pb-[11px] scroll-smooth'>
      <div>
        <SearchAndNotice/>
        <div className='bg-white p-[25px]'>
          <div className='flex justify-between items-center mb-[15px]'>
            <div className='flex'>
              <h1 className='heading text-left font-bold mr-[3px]'>오늘의 기숙사 소식</h1>
            </div>
            <a href='#' className='more flex'>
              더보기
              <img src={Next}/>
            </a>
          </div>
          <Swiper 
          direction={'vertical'}
          modules={[Pagination, Autoplay]} 
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className={`mySwiper mb-[16px] h-[73px] border border-[${COLOR.gray100}] rounded-[15px]`}>
            <SwiperSlide className={`flex flex-col justify-between px-[15px] pt-[11px] pb-[18px] text-left`}>
              <div className='flex justify-between'>
                <span className='dormitory-purple'>#공지</span>
                {/* 데이터 필요 */}
                <span className='dormitory-time'>2024-02-28</span> 
              </div>
              {/* 데이터 필요 */}
              <a href='#' className='dormitory-title text-ellipsis overflow-hidden whitespace-nowrap hover:underline'>[기숙사 식당 이용 안내]</a>
            </SwiperSlide>
            <SwiperSlide className={`flex flex-col justify-between px-[15px] pt-[11px] pb-[18px] text-left`}>
              <div className='flex justify-between'>
                <span className='dormitory-purple'>#공지</span>
                {/* 데이터 필요 */}
                <span className='dormitory-time'>2024-02-28</span>
              </div>
              {/* 데이터 필요 */}
              <a href='#' className='dormitory-title text-ellipsis overflow-hidden whitespace-nowrap hover:underline'>[기숙사 시설 이용 안내]</a>
            </SwiperSlide>
          </Swiper>
          <Buttons/>
        </div>
      </div>
      <RoommateSwiperList type={'best'}/>
      <RoommateSwiperList type={'new'}/>
      <div>새로 올라온 공동배달</div>
    </SettingStyle>
  )
}

export default HomePage

const SettingStyle = styled.div`
  background-color: ${COLOR.gray50};

  .heading {
    font-size: ${FONT.title3SB17};
  }
  .more {
    font-size: ${FONT.caption2M14};
  }
  .dormitory-purple {
    font-size: ${FONT.caption3M12};
    color: ${COLOR.purple1};
  }
  .dormitory-time {
    font-size: ${FONT.caption3M12};
    color: ${COLOR.gray500};
  }
  .dormitory-title {
    font-size: ${FONT.body4SB15};
  }
`