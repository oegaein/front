import React, {useState} from 'react'
import Lottie from 'react-lottie';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import animationData1 from '@assets/lottie/온보딩1/girl.json'
import animationData2 from '@assets/lottie/온보딩1/fight.json'
import animationData3 from '@assets/lottie/온보딩1/community.json'
import animationData4 from '@assets/lottie/온보딩1/delivery.json'

const OnboardingPage = () => {

  const defaultOptions = {
    a: {
      loop: true,
      autoplay: true,
      animationData: animationData1,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    },
    b: {
      loop: true,
      autoplay: true,
      animationData: animationData2,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    },
    c: {
      loop: true,
      autoplay: true,
      animationData: animationData3,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    },
    d: {
      loop: true,
      autoplay: true,
      animationData: animationData4,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    },
    
  };
  return (
    <>
      <Swiper 
      pagination={{clickable: true}} 
      modules={[Pagination, Autoplay]} 
      // autoplay={{ delay: 3000, disableOnInteraction: false }}
      spaceBetween={0}
      // loop={false}
      className="mySwiper">
        <SwiperSlide>
          <div className='flex items-center justify-center h-[207px]' style={{backgroundColor: '#8A7FF9'}}>
            <p className='text-white mt-[25px]'><span className='text-xl'>복잡하고 번거로운</span> 룸메이트 구하는 과정</p>
          </div>
          <div className='mt-12 mb-12  flex flex-col justify-center'>
          <div className='h-[477px]'>
            <div className='h-[312px] mb-[60px] px-[25px] flex flex-col justify-center items-center'>
              <div 
              className={`relative w-[100%] text-left px-[25px] py-[15px] rounded-[18px] bg-[${COLOR.purple2}] mb-[25px]
              after:content-[''] after:absolute after:w-0 after:h-0 after:border-t-[16px] after:border-x-[8px] after:border-solid after:border-t-[${COLOR.purple2}] after:border-r-transparent after:border-l-transparent after:border-b-transparent after:top-full after:left-[90px]`}>
                <p>제목: 신긱 룸메 구함</p>
                <p>나이, 코골이x, 흡연x, mbti, 청소 ...............</p>
              </div>
              <div className='w-[298px] h-[213px]'>
                <Lottie
                options={defaultOptions.a}
                />
              </div>
            </div>
            <p className='mb-[84px]'>프로필 설정 한 번으로 <span className='text-lg' style={{color: '#8A7FF9'}}>간단하게</span> 룸메이트 구하기!</p>
          </div>
            <Link to='/login' className='flex items-center justify-center rounded-[20px] w-[76px] h-[41px] self-center bg-[#EBDBFF]'>SKIP</Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='flex items-center justify-center h-52' style={{backgroundColor: '#8A7FF9'}}>
            <p className='text-white mt-[25px]'>하나부터 열까지 다 안 맞는 <span className='text-xl'>최악의</span> 룸메이트</p>
          </div>
          <div className='mt-12 mb-12 px-[38px] flex flex-col justify-center'>
            <div className='h-[477px]'>
              <div className='h-[312px] mb-[60px] flex justify-center items-center'>
                <Lottie
                options={defaultOptions.b}
                />
              </div>
              <p>취향, 성향, mbti까지 하나하나 살펴보고</p>
              <p>나랑 <span className='text-lg' style={{color: '#8A7FF9'}}>찰떡궁합 룸메이트</span> 찾기!</p>
            </div>
            <Link to='/login' className='flex items-center justify-center rounded-[20px] w-[76px] h-[41px] self-center' style={{backgroundColor: '#EBDBFF'}}>SKIP</Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='flex items-center justify-center h-52' style={{backgroundColor: '#8A7FF9'}}>
            <p className='text-white mt-[25px]'><span className='text-xl'>기숙사생</span>만의 커뮤니티 부족</p>
          </div>
          <div className='mt-12 mb-12 px-[38px] flex flex-col justify-center'>
            <div className='h-[477px]'>
              <div className='h-[312px] mb-[60px] flex justify-center items-center'>
                <Lottie
                options={defaultOptions.c}
                />
              </div>
              <p>기숙사에서 <span className='text-lg' style={{color: '#8A7FF9'}}>도움이 필요할 때, 정보를</span></p>
              <p><span className='text-lg' style={{color: '#8A7FF9'}}>얻고 싶을 때</span> 커뮤니티 활용하기!</p>
            </div>
            <Link to='/login' className='flex items-center justify-center rounded-[20px] w-[76px] h-[41px] self-center' style={{backgroundColor: '#EBDBFF'}}>SKIP</Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='flex flex-col items-center justify-center h-52' style={{backgroundColor: '#8A7FF9'}}>
            <p className='text-white mt-[25px]'>기숙사에서 혼자 시키기에는</p>
            <p className='text-white'>많은 양과 <span className='text-xl'>부담스러운 배달비</span></p>
          </div>
          <div className='mt-12 mb-12 px-[38px] flex flex-col justify-center'>
            <div className='h-[477px]'>
              <div className='h-[312px] mb-[60px] flex justify-center items-center'>
                <Lottie
                options={defaultOptions.d}
                />
              </div>
              <p>공동 배달로 음식도 나누고 <span className='text-lg' style={{color: '#8A7FF9'}}>배달비도 절약</span>하기!</p>
            </div>
            <Link to='/login' className='flex items-center justify-center rounded-[20px] w-[76px] h-[41px] self-center' style={{backgroundColor: '#EBDBFF'}}>SKIP</Link>
          </div>
        </SwiperSlide>

      </Swiper>
    </>
  )
}

export default OnboardingPage