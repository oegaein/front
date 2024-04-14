import React, {useState} from 'react'
import styled from 'styled-components'

//styles
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

//images
import Yoo from '../../assets/images/유재석.svg'
import axios from 'axios'

const Roommate = ({post, index}) => {
  const [isRegistered, setIsRegistered] = useState(false)
  const clickRegisterBtn = () => {
    //api 요청 로직 
    setIsRegistered(prevState=>!prevState)
  }
  const handleClickPost = async () => {
    try {
      const response = await axios.get(`/api/v1/matchingposts/${index}`)
      console.log(response)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <SettingStyle key={index} className={`flex bg-white border border-[${COLOR.gray100}] rounded-[20px] p-[14px]`}>
      <img className='w-[100px] h-[100px] mr-[12px]' src={Yoo}/>
      <div className='w-full flex flex-col justify-between'>
        <div>
          <div className='flex items-center justify-between'>
            <div>
              <span className='room mr-[10px]'>{post.dong} {post.roomSize}</span>
              <span className='mates-number'>모집인원 1명</span>
            </div>
            <span className='dday'>D-4</span>
          </div>
          <div className='text-left mt-[7px]'>
            <p className='roommate-title max-w-[205px] 
            whitespace-nowrap overflow-hidden text-ellipsis'
            onClick={handleClickPost}
            >
              {post.title}
            </p>
            <div>
              <span className='name mr-[6px]'>{post.name}</span>
              <span className='gender'>여성</span>
            </div>
          </div>
        </div>
        <div className='text-right'>
          {isRegistered ?
          <button onClick={clickRegisterBtn} className='register-btn registered'>신청취소</button>
        :  
          <button onClick={clickRegisterBtn} className='register-btn'>매칭신청</button>
        }
        </div>
      </div>
    </SettingStyle>
  )
}

export default Roommate

const SettingStyle = styled.div`
  .room {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.purple1};
  }
  .mates-number {
    font-size: ${FONT.caption3M12};
  }
  .dday {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.gray500};
  }
  .roommate-title {
    font-size: ${FONT.caption1SB14};
  }
  .name {
    font-size: ${FONT.caption2M14};
  }
  .gender {
    font-size: ${FONT.caption3M12};
    color: ${COLOR.gray500};
  }

  .register-btn {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.purple1};
    &.registered {
      color: ${COLOR.red}
    }
  }
`