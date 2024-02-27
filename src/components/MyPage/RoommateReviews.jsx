import React from 'react'
import More from '../../assets/images/more.svg'
import Yoo from '../../assets/images/유재석.svg'
import Dots from '../../assets/images/dots.svg'
import Star from '../../assets/images/star.svg'
const RoommateReviews = () => {
  return (
    <div className='relative py-[20px] border-b border-[#DEDEDE]'>
          <h1 className='px-[33px] text-left font-bold mb-[20px]'>받은 룸메이트 후기 2</h1>
          <button className='absolute top-[20px] right-[22px]'>
            <img src={More}/>
          </button>
          <div className='flex px-[33px] border-b border-[#DEDEDE]'>
            <img src={Yoo} className='w-[58px] h-[58px] mr-[13px]'/>
            <div className='text-left'>
              <div className='flex justify-between mb-[2px]'>
                <div>
                  <span className='mr-[13px] text-[14px]'>유재석</span>
                  <span className='text-[12px]'>컴퓨터공학과 20학번</span>
                </div>
                <button>
                  <img src={Dots} className='w-[16px] h-[16px]'/>
                </button>
              </div>
              <p className='text-[11px] text-[#707070]'>2023년 1학기 B동</p>
              <div className='flex gap-[2px] text-[12px] items-center'>
                <img src={Star}/>
                <img src={Star}/>
                <img src={Star}/>
                <img src={Star}/>
                <img src={Star}/>
                <span className='ml-[4px]'>5</span>
              </div>
              <div className='h-[68px] py-[13px] text-[11px]'>
                한 학기 동안 문제없이 잘 생활했습니다!
                다음에도 기회 되면 같은 방 하고 싶어요
              </div>
            </div>

          </div>
        </div>
  )
}

export default RoommateReviews