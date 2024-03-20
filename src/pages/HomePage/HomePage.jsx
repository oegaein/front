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
import News from '@assets/images/news.svg'
import StopWatch from '@assets/images/stopwatch.svg'
import BestFriend from '@assets/images/bestfriend.svg'
import FoodDelivery from '@assets/images/fooddelivery.svg'

const HomePage = () => {
  const [input, setInput] = useState('')
  const handleChange = (e) => {
    setInput(e.target.value)
  }
  return (
    <SettingStyle className='flex flex-col gap-[10px] pb-[11px] scroll-smooth'>
      <div>
        <SearchAndNotice handleChange={handleChange}/>
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
          <div className='flex justify-between'>
            <div className=''>
              <div className={`flex justify-center items-center rounded-[15px] bg-[${COLOR.gray50}] w-[77px] h-[70px]`}>
                <img src={News} alt="dormiory news icon"/>
              </div>
              <span className='icon-text'>기숙사 소식</span>
            </div>
            <div>
              <div className={`flex justify-center items-center rounded-[15px] bg-[${COLOR.gray50}] w-[77px] h-[70px]`}>
                <img src={StopWatch} alt="deadline imminent icon"/>
              </div>
              <span className='icon-text'>마감임박</span>
            </div>
            <div>
              <div className={`flex justify-center items-center rounded-[15px] bg-[${COLOR.gray50}] w-[77px] h-[70px]`}>
                <img src={BestFriend} alt="best roommate icon"/>
              </div>
              <span className='icon-text'>베스트 룸메</span>
            </div>
            <div>
              <div className={`flex justify-center items-center rounded-[15px] bg-[${COLOR.gray50}] w-[77px] h-[70px]`}>
                <img src={FoodDelivery} alt="popular delivery icon"/>
              </div>
              <span className='icon-text'>인기배달</span>
            </div>
          </div>
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
  .icon-text {
    font-size: ${FONT.caption3M12};
  }
`