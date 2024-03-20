import React, {useState} from 'react'

//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

//images
import BigStar from '../../assets/images/star-big.svg'
import Mbti from '../../assets/images/mbti.svg'
import SpeechBubble from '../../assets/images/speech-bubble.svg'
import Morning from '../../assets/images/morning.svg'
import Nosmoking from '../../assets/images/stop-smoking.svg'
import Clean from '../../assets/images/household.svg'
import House from '../../assets/images/house.svg'
import Ear from '../../assets/images/ear.svg'


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
      <div>
        <p className='rating-title mb-[17px]'>MY 룸메 평점</p>
        <span className='rating-number'>5</span>
        <div className='flex justify-center gap-[2.8px] mt-[5px]'>
          {renderStars()}
        </div>
      </div>
      <div className='information-container px-[30px] pt-[32px]'>
        <h1 className='information-title text-left font-bold'>기본 정보</h1>
        <div className='flex flex-col px-[10px] pt-[16px] pb-[24px] gap-[12px]'>
          <div className='flex'>
            <div className='information-label font-bold w-[95px] text-left'>성별</div>
            <div className='information-value'>남성</div>
          </div>
          <div className='flex'>
            <div className='information-label font-bold w-[95px] text-left'>나이</div>
            <div className='information-value'>26</div>
          </div>
          <div className='flex'>
            <div className='information-label font-bold w-[95px] text-left'>학번</div>
            <div className='information-value'>18 학번</div>
          </div>
          <div className='flex'>
            <div className='information-label font-bold w-[95px] text-left'>전공</div>
            <div className='information-value'>폴란드어과</div>
          </div>
          <div className='flex'>
            <div className='information-label font-bold w-[95px] text-left'>생년월일</div>
            <div className='information-value'>1999년 5월 4일</div>
          </div>
          <div className='flex'>
            <div className='information-label font-bold w-[95px] text-left'>기숙사 동</div>
            <div className='information-value'>None</div>
          </div>
        </div>
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