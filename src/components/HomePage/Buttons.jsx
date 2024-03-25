import React from 'react'

//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'
//images
import News from '@assets/images/news.svg'
import StopWatch from '@assets/images/stopwatch.svg'
import BestFriend from '@assets/images/bestfriend.svg'
import FoodDelivery from '@assets/images/fooddelivery.svg'
import { Link } from 'react-router-dom'

const Buttons = () => {
  return (
    <SettingStyle className='flex justify-between'>
      <div>
        <div className={`icon-btn cursor-pointer flex justify-center items-center rounded-[15px] w-[77px] h-[70px]`}>
          <img src={News} alt="dormiory news icon"/>
        </div>
        <span className='icon-text'>기숙사 소식</span>
      </div>
      <Link to='/home/ending-soon'>
        <div className={`icon-btn cursor-pointer flex justify-center items-center rounded-[15px] w-[77px] h-[70px]`}>
          <img src={StopWatch} alt="ending soon icon"/>
        </div>
        <span className='icon-text'>마감임박</span>
      </Link>
      <div>
        <div className={`icon-btn cursor-pointer flex justify-center items-center rounded-[15px] w-[77px] h-[70px]`}>
          <img src={BestFriend} alt="best roommate icon"/>
        </div>
        <span className='icon-text'>베스트 룸메</span>
      </div>
      <div>
        <div className={`icon-btn cursor-pointer flex justify-center items-center rounded-[15px] w-[77px] h-[70px]`}>
          <img src={FoodDelivery} alt="popular delivery icon"/>
        </div>
        <span className='icon-text'>인기배달</span>
      </div>
    </SettingStyle>
  )
}

export default Buttons

const SettingStyle = styled.div`
  background-color: white;
  .icon-btn {
    background-color: ${COLOR.gray50};
  }
  .icon-text {
    font-size: ${FONT.caption3M12};
    &:hover {
      text-decoration: underline;
    }
  }

`