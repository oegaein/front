import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import Menu from '../../assets/images/menu1.svg'
import Hamburger from '../../assets/images/hamburger.svg'
import Res1 from '../../assets/images/안녕모현.svg'
import Star from '../../assets/images/star.svg'
import Yoo from '../../assets/images/유재석.svg'

const RoommateAndDeliveryStatus = () => {
  return (
    <div className='bg-white'>
      <div>
        <div className='border-b border-[#DEDEDE] pt-[30px]'>
          <div className='flex justify-between px-[30px] mb-[18px]'>
            <h1 className='font-bold text-left'>룸메이트 신청 현황</h1>
            <div className='flex'>
              <button>
                <img src={Menu} alt='menu-button'/>
              </button>
              <button className='ml-[7px]'>
                <img src={Hamburger} alt='edit-button'/>
              </button>
            </div>
          </div>
          <Swiper
          spaceBetween={12}
          slidesPerView={2}
          loop={true}
          className="mySwiper mb-[28px]">
            <SwiperSlide>
            <button className='border w-[185px] h-[131px] rounded-[20px] bg-white p-[15px] ml-[12px]'>
            <div className='flex items-center justify-between text-[12px] text-[#7F6FD8] mb-[12px]'>
              <div className='flex'>
                <span>룸메 평점</span>
                <div className='flex gap-0.5 ml-[8px]'>
                  <img src={Star}/>
                  <img src={Star}/>
                  <img src={Star}/>
                  <img src={Star}/>
                  <img src={Star}/>
                </div>
              </div>
              <span className='text-[#BEBBCF]'>D-7</span>
            </div>
              <div className='flex items-center'>
                <img className='w-[60px] h-[60px]' src={Yoo} alt='user-image'/>
                <div className='text-[11px] ml-[18px]'>
                  <p>컴퓨터공학과</p>
                  <p>20학번 유재석</p>
                </div>
              </div>
              <div className='text-[11px] text-right'>
                <button className='text-[#BEBBCF]'>거절</button>
                <button className='text-[#7F6FD8] ml-[6px]'>수락</button>
              </div>
            </button>
            </SwiperSlide>
            <SwiperSlide>
            <button className='border w-[185px] h-[131px] rounded-[20px] bg-white p-[15px] ml-[12px]'>
            <div className='flex items-center justify-between text-[12px] text-[#7F6FD8] mb-[12px]'>
              <div className='flex'>
                <span>룸메 평점</span>
                <div className='flex gap-0.5 ml-[8px]'>
                  <img src={Star}/>
                  <img src={Star}/>
                  <img src={Star}/>
                  <img src={Star}/>
                  <img src={Star}/>
                </div>
              </div>
              <span className='text-[#BEBBCF]'>D-7</span>
            </div>
              <div className='flex items-center'>
                <img src={Yoo} alt='user-image'/>
                <div className='text-[11px] ml-[18px]'>
                  <p>컴퓨터공학과</p>
                  <p>20학번 유재석</p>
                </div>
              </div>
              <div className='text-[11px] text-right'>
                <button className='text-[#BEBBCF]'>거절</button>
                <button className='text-[#7F6FD8] ml-[6px]'>수락</button>
              </div>
            </button>
            </SwiperSlide>
            <SwiperSlide>
            <button className='border w-[185px] h-[131px] rounded-[20px] bg-white p-[15px] ml-[12px]'>
            <div className='flex items-center justify-between text-[12px] text-[#7F6FD8] mb-[12px]'>
              <div className='flex'>
                <span>룸메 평점</span>
                <div className='flex gap-0.5 ml-[8px]'>
                  <img src={Star}/>
                  <img src={Star}/>
                  <img src={Star}/>
                  <img src={Star}/>
                  <img src={Star}/>
                </div>
              </div>
              <span className='text-[#BEBBCF]'>D-7</span>
            </div>
              <div className='flex items-center'>
                <img src={Yoo} alt='user-image'/>
                <div className='text-[11px] ml-[18px]'>
                  <p>컴퓨터공학과</p>
                  <p>20학번 유재석</p>
                </div>
              </div>
              <div className='text-[11px] text-right'>
                <button className='text-[#BEBBCF]'>거절</button>
                <button className='text-[#7F6FD8] ml-[6px]'>수락</button>
              </div>
            </button>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className='py-[20px]'>
          <h1 className='text-left font-bold px-[30px] mb-[13px]'>공동배달 현황</h1>
          <Swiper
          spaceBetween={12}
          slidesPerView={2}
          loop={true}
          className="mySwiper mb-[28px]">
            <SwiperSlide>
              <button className='border w-[192px] h-[179px] rounded-[20px] bg-white p-[20px] ml-[12px]'>
                <div className='h-[50%]' style={{backgroundImage: `url(${Res1})`}}></div>
                <div className='flex items-center'>
                  <img src={Yoo} alt='user-image'/>
                  <div className='text-[11px] ml-[12px]'>
                    <p>컴퓨터공학과</p>
                    <p>20학번 유재석</p>
                  </div>
                </div>
                <p className='text-right text-[11px] text-[#7F6FD8]'>매칭신청</p>
              </button>
            </SwiperSlide>
            <SwiperSlide>
            <button className='border w-[192px] h-[179px] rounded-[20px] bg-white p-[20px] ml-[12px]'>
                <div className='flex items-center justify-between text-[12px] text-[#7F6FD8] mb-[12px]'>
                  <span>룸메 평점</span>
                  <div className='flex gap-0.5'>
                    <img src={Star}/>
                    <img src={Star}/>
                    <img src={Star}/>
                    <img src={Star}/>
                    <img src={Star}/>
                  </div>
                  <span className='text-[#BEBBCF]'>D-7</span>
                </div>
                <p className='text-[13px] mb-[13px]'>마음 잘 맞는 룸메 구해요!</p>
                <div className='flex items-center'>
                  <img src={Yoo}/>
                  <div className='text-[11px] ml-[12px]'>
                    <p>컴퓨터공학과</p>
                    <p>20학번 유재석</p>
                  </div>
                </div>
                <p className='text-right text-[11px] text-[#7F6FD8]'>매칭신청</p>
              </button>
            </SwiperSlide>
            <SwiperSlide>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default RoommateAndDeliveryStatus