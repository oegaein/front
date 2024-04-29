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


const UserLifeStyles = ({userInfo}) => {
  const location = useLocation()
  const path = location.pathname
  console.log(path)
  return (
    <SettingStyle>
      <div>
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

export default UserLifeStyles

const SettingStyle = styled.div`
`