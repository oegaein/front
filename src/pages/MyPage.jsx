import React from 'react'

import RoommateReviews from '../components/MyPage/RoommateReviews'

import Background from '../assets/images/mypage.svg'
import Profile from '../assets/images/프사.svg'
import Heart from '../assets/images/heart.svg'
import Dots from '../assets/images/dots.svg'
import ProfileLevel from '../assets/images/profile-level.svg'
import BigStar from '../assets/images/star-big.svg'
import Mbti from '../assets/images/mbti.svg'
import SpeechBubble from '../assets/images/speech-bubble.svg'
import Morning from '../assets/images/morning.svg'
import Nosmoking from '../assets/images/stop-smoking.svg'
import Clean from '../assets/images/household.svg'
import House from '../assets/images/house.svg'
import Ear from '../assets/images/ear.svg'
const MyPage = () => {
  return (
    <>
      <div className='relative h-[335px]' style={{backgroundImage: `url(${Background})`}}>
        <div className='w-full h-[50px]'></div>
        <div className='flex justify-between px-[24px]'>
          <div className='text-[16px] text-white'><span className='text-[20px] font-bold'>차은우</span> 님의 프로필</div>
          <div className='flex items-center'>
            <button className='mr-[6px]'><img src={Heart}/></button>
            <button><img src={Dots}/></button>
          </div>
        </div>
        <p className='absolute left-[52px] top-[112px] text-white text-[13px]'>맛집 투어 좋아해요~</p>
        <img className='z-10 absolute translate-y-[calc(-50%-95px)] left-[31.5px] top-[100%] h-[175px] w-[175px] rounded-[50%]' src={Profile}/>
        <div className='z-20 absolute left-[175px] bottom-[13px] w-[45px] h-[45px] flex justify-center items-center' style={{backgroundImage: `url(${ProfileLevel})`}}>
          <span className='text-white text-[12px]'>80%</span>
        </div>
      </div>
      <div className='border-b border-[#DEDEDE] pt-[40px]'>
        <div>
          <p className='mb-[20px]'>MY 룸메 평점</p>
          <span className='font-bold'>4</span>
          <div className='flex justify-center gap-[7px] mt-[14px]'>
            <img src={BigStar}/>
            <img src={BigStar}/>
            <img src={BigStar}/>
            <img src={BigStar}/>
            <img src={BigStar}/>
          </div>
        </div>
        <div className='px-[33px] pt-[35px]'>
          <h1 className='text-left font-bold'>기본 정보</h1>
          <div className='flex flex-col px-[10px] py-[25px] gap-[15px]'>
            <div className='flex'>
              <div className='font-bold w-[95px] text-left'>성별</div>
              <div>남성</div>
            </div>
            <div className='flex'>
              <div className='font-bold w-[95px] text-left'>나이</div>
              <div>26</div>
            </div>
            <div className='flex'>
              <div className='font-bold w-[95px] text-left'>학번</div>
              <div>18 학번</div>
            </div>
            <div className='flex'>
              <div className='font-bold w-[95px] text-left'>전공</div>
              <div>폴란드어과</div>
            </div>
            <div className='flex'>
              <div className='font-bold w-[95px] text-left'>생년월일</div>
              <div>1999년 5월 4일</div>
            </div>
            <div className='flex'>
              <div className='font-bold w-[95px] text-left'>기숙사 동</div>
              <div>None</div>
            </div>
          </div>
        </div>
        <div className='px-[33px] py-[20px] border-b border-[#DEDEDE]'>
          <h1 className='mb-[25px]'>성향 및 라이프 스타일</h1>
          <div className='flex justify-between mb-[35px]'>
            <div className='flex flex-col items-center w-[57px] gap-[9px]'>
              <div className='flex items-center h-[44px]'>
                <img src={Mbti}/>
              </div>
              <span className='text-[13px]'>INFJ</span>
            </div>
            <div className='flex flex-col items-center w-[57px] gap-[9px]'>
              <div className='flex items-center h-[44px]'>
                <img src={SpeechBubble}/>
              </div>
              <span className='text-[13px]'>잠꼬대형</span>
            </div>
            <div className='flex flex-col items-center w-[57px] gap-[9px]'>
              <div className='flex items-center h-[44px]'>
                <img src={Morning}/>
              </div>
              <span className='text-[13px]'>아침형</span>
            </div>
            <div className='flex flex-col items-center w-[57px] gap-[9px]'>
              <div className='flex items-center h-[44px]'>
                <img src={Nosmoking}/>
              </div>
              <span className='text-[13px]'>비흡연</span>
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col items-center w-[57px] gap-[9px]'>
              <div className='flex items-center h-[44px]'>
                <img src={Clean}/>
              </div>
              <span className='text-[13px]'>매일 청소</span>
            </div>
            <div className='flex flex-col items-center w-[57px] gap-[9px]'>
              <div className='flex items-center h-[44px]'>
                <img src={House}/>
              </div>
              <span className='text-[13px]'>집순이</span>
            </div>
            <div className='flex flex-col items-center w-[57px] gap-[9px]'>
              <div className='flex items-center h-[44px]'>
                <img src={Ear}/>
              </div>
              <span className='text-[13px]'>청각예민형</span>
            </div>
            <div className='flex flex-col items-center w-[57px]'></div>
          </div>
        </div>
        <RoommateReviews/>
      </div>
    </>
  )
}

export default MyPage