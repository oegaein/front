import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useLocation } from 'react-router-dom';
import RoommateSwiperItem from '../RoommatePage/RoommateSwiperItem';
import { useMatchingPosts } from '@hooks/useMatchingPosts';
//styles
import styled from 'styled-components';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';
//images
import Next from '@assets/images/next.svg'

const RoommateSwiperList = ({type}) => {
  //type: new/best/mypost
  const {data, isLoading, error } = useMatchingPosts(type)
  console.log(data)
  if (isLoading) return <div>데이터 로딩중</div>
  if (error) return <div>에러 발생 {error.message}</div>
  return (
    <SettingStyle className='bg-white pb-[16px]'>
      <Swiper
      spaceBetween={12}
      slidesPerView={2}
      loop={true}
      className="mySwiper pt-[5px]">
        {/* 데이터 20개까지 보여주기 */}
        {data.data && data.data.map((post, index)=>(
        <SwiperSlide>
          <RoommateSwiperItem post={post} index={index}/>
        </SwiperSlide>
        ))}
      </Swiper>
      {(type === 'new' || type === 'mypost') && data.length > 20 ?
      <div className='px-[25px] mt-[16px]'>
        <Link to={type === 'new' ? '/roommate' : type === 'mypost' ? '/mypage/roommate-applylist' : null}
        className={`more flex justify-center items-center rounded-[10px] border border-[${COLOR.gray200}] h-[40px]`}>
          더보기
          <img src={Next} alt='see more icon'/>
        </Link>
      </div>
      : null
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