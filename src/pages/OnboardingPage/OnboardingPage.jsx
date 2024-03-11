import React, {useState} from 'react'
import styled from 'styled-components';
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
      className="mySwiper h-[800px]">
        <SwiperSlide>
          <StyledOnboardingMent className={`h-[213px] text-left pt-[65px] px-[35px]`}>
            <p style={{color: COLOR.purple1}}>복잡하고 번거로운</p>
            <p>룸메이트 구하는 과정</p>
          </StyledOnboardingMent>
          <div className='mb-12 flex flex-col justify-center'>
            <div className='h-[477px]'>
              <div className='h-[312px] mb-[60px] px-[25px] flex flex-col justify-center items-center'>
                <StyledBubbleText 
                className={`flex flex-col justify-between h-[80px] relative w-[100%] text-left px-[25px] py-[15px] rounded-[18px] bg-[${COLOR.purple2}] mb-[25px]
                after:content-[''] after:absolute after:w-0 after:h-0 after:border-t-[16px] after:border-x-[8px] after:border-solid
                after:border-t-[${COLOR.purple2}] after:border-r-transparent after:border-l-transparent after:border-b-transparent after:top-full after:left-[90px]`}
                >
                  <p>제목: 신긱 룸메 구함</p>
                  <p>나이, 코골이x, 흡연x, mbti, 청소 ...............</p>
                </StyledBubbleText>
                <div className='w-[298px] h-[213px]'>
                  <Lottie
                  options={defaultOptions.a}
                  />
                </div>
              </div>
              <StyledSmallMent>프로필 설정 한 번으로 <span style={{color: COLOR.purple1}}>간단하게</span> 룸메이트 구하기!</StyledSmallMent>
            </div>
            <Link to='/login' className='flex items-center justify-center rounded-[20px] w-[76px] h-[41px] self-center bg-[#EBDBFF]'>SKIP</Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <StyledOnboardingMent className={`h-[213px] text-left pt-[65px] px-[35px]`}>
            <p>하나부터 열까지</p>
            <p>다 안 맞는 <span style={{color: COLOR.purple1}}>최악의 룸메이트</span></p>
          </StyledOnboardingMent>
          <div className='mb-12 px-[38px] flex flex-col justify-center'>
            <div className='h-[477px]'>
              <div className='h-[312px] mb-[60px] flex justify-center items-center'>
                <Lottie
                options={defaultOptions.b}
                />
              </div>
              <StyledSmallMent>
                취향, 성향, mbti까지 하나하나 살펴보고<br/>
                나랑 <span style={{color: COLOR.purple1}}>찰떡궁합 룸메이트 찾기!</span>
              </StyledSmallMent>
            </div>
            <Link to='/login' className='flex items-center justify-center rounded-[20px] w-[76px] h-[41px] self-center' style={{backgroundColor: '#EBDBFF'}}>SKIP</Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <StyledOnboardingMent className={`h-[213px] text-left pt-[96px] px-[35px]`}>
            <p>기숙사생만의 <span style={{color: COLOR.purple1}}>커뮤니티 부족</span></p>
          </StyledOnboardingMent>
          <div className='mb-12 px-[38px] flex flex-col justify-center'>
            <div className='h-[477px]'>
              <div className='h-[312px] mb-[60px] flex justify-center items-center'>
                <Lottie
                options={defaultOptions.c}
                />
              </div>
              <StyledSmallMent>기숙사에서 <span style={{color: COLOR.purple1}}>도움이 필요할 때, 정보를<br></br>얻고 싶을 때 </span>커뮤니티 활용하기!</StyledSmallMent>
            </div>
            <Link to='/login' className='flex items-center justify-center rounded-[20px] w-[76px] h-[41px] self-center' style={{backgroundColor: '#EBDBFF'}}>SKIP</Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <StyledOnboardingMent className={`h-[213px] text-left pt-[65px] px-[35px]`}>
            <p>혼자 주문하기에는</p>
            <p style={{color: COLOR.purple1}}>많은 양과 부담스러운 배달비</p>
          </StyledOnboardingMent>
          <div className='mb-12 px-[38px] flex flex-col justify-center'>
            <div className='h-[477px]'>
              <div className='h-[312px] mb-[60px] flex flex-col justify-center items-center'>
                <StyledDeiveryMent 
                  className={`flex flex-col justify-between border border-[${COLOR.purple1}] h-[80px] relative w-[100%] text-left p-[20px] rounded-[18px] mb-[25px]`}
                >      
                  <p>최소 주문 금액: 20,000원</p>
                  <p>배달팁: 4,800원</p>
                </StyledDeiveryMent>
                <Lottie
                options={defaultOptions.d}
                />
              </div>
              <StyledSmallMent>공동 배달로 음식도 <span style={{color: COLOR.purple1}}>나누고</span> 배달비도 <span style={{color: COLOR.purple1}}>절약하기</span>!</StyledSmallMent>
            </div>
            <Link to='/login' className='flex items-center justify-center rounded-[20px] w-[76px] h-[41px] self-center' style={{backgroundColor: '#EBDBFF'}}>SKIP</Link>
          </div>
        </SwiperSlide>

      </Swiper>
    </>
  )
}

export default OnboardingPage

const StyledOnboardingMent = styled.div`
  font: ${FONT.largetitleB23}
`
const StyledSmallMent = styled.div`
  font: ${FONT.body1M17}
`
const StyledBubbleText = styled.div`
  font: ${FONT.body4SB15}
`
const StyledDeiveryMent = styled.div`
  font: ${FONT.caption2M14}
`