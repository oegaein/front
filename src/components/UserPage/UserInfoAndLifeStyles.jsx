import React, {useState} from 'react'

//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

//images
import BigStar from '@assets/images/star-big.svg'
import Mbti from '@assets/images/mbti.svg'
import SpeechBubble from '@assets/images/speech-bubble.svg'
import Morning from '@assets/images/morning.svg'
import Nosmoking from '@assets/images/stop-smoking.svg'
import Clean from '@assets/images/household.svg'
import House from '@assets/images/house.svg'
import Ear from '@assets/images/ear.svg'

//components
import MyPageInfo from './MyPageInfo'
import UserPageInfo from './UserPageInfo'


const UserInfoAndLifeStyles = ({type}) => {
  const [rating, setRating] = useState(5)
  const renderStars = () => {
    let stars = []
    for (let i = 0; i < rating; i++) {
      stars.push(<img className='h-[16px] w-[16px]' src={BigStar}/>);
    }
    return stars;
  }
  return (
    <SettingStyle>
      {type === 'mypage' ? <MyPageInfo renderStars={renderStars}/> : <UserPageInfo/>}
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