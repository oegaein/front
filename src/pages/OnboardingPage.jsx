import React, {useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import Image1 from '../assets/images/OnboardingImage.png'
import Image2 from '../assets/images/fighting-couple.png'
import Image3 from '../assets/images/friendly-faces.png'
import Image4 from '../assets/images/OnboardingImage2.png'
const OnboardingPage = () => {
  return (
    <>
      {/* <div className='h-52' style={{backgroundColor: '#8A7FF9'}}>
        {slides[slideNumber].content}
      </div> */}
      <Swiper 
      pagination={{clickable: true}} 
      modules={[Pagination, Autoplay]} 
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      spaceBetween={0}
      loop={true}
      className="mySwiper">
        <SwiperSlide>
          <div className='flex items-center justify-center h-[207px]' style={{backgroundColor: '#8A7FF9'}}>
            <p className='text-white mt-[25px]'><span className='text-xl'>복잡하고 번거로운</span> 룸메이트 구하는 과정</p>
          </div>
          <div className='mt-12 mb-12 px-[38px] flex flex-col justify-center'>
          <div className='h-[477px]'>
            <div className='h-[312px] mb-[60px] flex justify-center items-center'>
              <img src={Image1}/>
            </div>
            <p className='mb-[84px]'>프로필 설정 한 번으로 <span className='text-lg' style={{color: '#8A7FF9'}}>간단하게</span> 룸메이트 구하기!</p>
          </div>
            <button className='rounded-[20px] w-[76px] h-[41px] self-center' style={{backgroundColor: '#EBDBFF'}}>SKIP</button>
          </div>
      </SwiperSlide>
        <SwiperSlide>
          <div className='flex items-center justify-center h-52' style={{backgroundColor: '#8A7FF9'}}>
            <p className='text-white mt-[25px]'>하나부터 열까지 다 안 맞는 <span className='text-xl'>최악의</span> 룸메이트</p>
          </div>
          <div className='mt-12 mb-12 px-[38px] flex flex-col justify-center'>
            <div className='h-[477px]'>
              <div className='h-[312px] mb-[60px] flex justify-center items-center'>
                <img src={Image2}/>
              </div>
              <p>취향, 성향, mbti까지 하나하나 살펴보고</p>
              <p>나랑 <span className='text-lg' style={{color: '#8A7FF9'}}>찰떡궁합 룸메이트</span> 찾기!</p>
            </div>
            <button className='rounded-[20px] w-[76px] h-[41px] self-center' style={{backgroundColor: '#EBDBFF'}}>SKIP</button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='flex items-center justify-center h-52' style={{backgroundColor: '#8A7FF9'}}>
            <p className='text-white mt-[25px]'><span className='text-xl'>기숙사생</span>만의 커뮤니티 부족</p>
          </div>
          <div className='mt-12 mb-12 px-[38px] flex flex-col justify-center'>
            <div className='h-[477px]'>
              <div className='h-[312px] mb-[60px] flex justify-center items-center'>
                <img src={Image3}/>
              </div>
              <p>기숙사에서 <span className='text-lg' style={{color: '#8A7FF9'}}>도움이 필요할 때, 정보를</span></p>
              <p><span className='text-lg' style={{color: '#8A7FF9'}}>얻고 싶을 때</span> 커뮤니티 활용하기!</p>
            </div>
            <button className='rounded-[20px] w-[76px] h-[41px] self-center' style={{backgroundColor: '#EBDBFF'}}>SKIP</button>
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
                <img src={Image4}/>
              </div>
              <p>공동 배달로 음식도 나누고 <span className='text-lg' style={{color: '#8A7FF9'}}>배달비도 절약</span>하기!</p>
            </div>
            <button className='rounded-[20px] w-[76px] h-[41px] self-center' style={{backgroundColor: '#EBDBFF'}}>SKIP</button>
          </div>
        </SwiperSlide>

      </Swiper>
    </>
  )
}

export default OnboardingPage