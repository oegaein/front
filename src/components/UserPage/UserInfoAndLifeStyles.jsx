import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'

//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

//images
import Mbti from '@assets/images/mbti.svg'
import SpeechBubble from '@assets/images/speech-bubble.svg'
import Morning from '@assets/images/morning.svg'
import Nosmoking from '@assets/images/stop-smoking.svg'
import Clean from '@assets/images/household.svg'
import House from '@assets/images/house.svg'
import Ear from '@assets/images/ear.svg'

//components
import UserPageInfo from './UserPageInfo'


const UserInfoAndLifeStyles = () => {
  const [rating, setRating] = useState(5)
  const location = useLocation()
  const path = location.pathname
  console.log(path)
  return (
    <SettingStyle>
      <div className='user-info pt-[103px] pb-[24px]'>
        <h1 className='information-title text-left px-[25px] mb-[16px]'>기본 정보</h1>
        <UserPageInfo/>
      </div>
      <div className='p-[25px]'>
        <h1 className='pb-[19px] text-left font-bold'>성향 및 라이프 스타일</h1>
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
    </SettingStyle>
  )
}

export default UserInfoAndLifeStyles

const SettingStyle = styled.div`
  background-color: white;
  .user-info {
    border-bottom: 1px solid ${COLOR.gray200};

  }
  .rating-title {
    font-size: ${FONT.title3SB17};
  }
  .rating-number {
    font-size: ${FONT.body1M17};
  }
  .information-title {
    font-size: ${FONT.title3SB17};
  }
  .information-container {
    border-bottom: 1px solid ${COLOR.gray200};
  }
  .information-label {
    font-size: ${FONT.body2SB16};
  }
  .information-value {
    font-size: ${FONT.body5M15};
  }
`