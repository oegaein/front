import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

//images
import { API } from '@utils/api'

const RoommateScrollItem = ({post}) => {
  const navigate = useNavigate()
  const handleClickRegisterBtn = async (matchingPostId) => {
    try {
      const response = await API.post('/api/v1/matchingrequests', {
        matchingPostId,
      })
      // 매칭신청이 완료되었다는 모달 필요
      
    } catch (error) {
      console.log(error)
    }
  }
  const handleClickCancelBtn = async (matchingPostId) => {
    try {
      const response = await API.delete(`/api/v1/matchingrequests/${matchingPostId}`)
      // 매칭취소가 완료되었다는 모달 필요
    } catch (error) {
      console.log(error)
    }
  }
  const handleClickPost = (matchingPostId) => {
    navigate(`/post-detail/${matchingPostId}`)
  }
  return (
    <SettingStyle onClick={()=>handleClickPost(post.matchingPostId)} key={post.matchingPostId} className={`flex bg-white border border-[${COLOR.gray100}] rounded-[20px] p-[14px]`}>
      <img className='w-[100px] h-[100px] mr-[12px] rounded-[50%]' src={post.photoUrl}/>
      <div className='w-full flex flex-col justify-between'>
        <div>
          <div className='flex items-center justify-between'>
            <div>
              <span className='room mr-[10px]'>{post.dong} {post.roomSize}</span>
              {/* 데이터 바인딩 필요 */}
              <span className='mates-number'>모집인원 {post.targetNumberOfPeople}명</span>
            </div>
            {post.matchingStatus === '매칭 대기' &&
            <span className='dday'>{post.dday === 0 ? 'D-Day' : `D-${post.dday}`}</span>        
            }          
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
              <span className='gender'>{post.gender}</span>
            </div>
          </div>
        </div>
        <div className='text-right'>
          {/* 매칭 대기, 매칭 완료, 매칭 마감 */}
          {post.matchingStatus === '매칭 대기' ?
          <button onClick={()=>handleClickRegisterBtn(post.matchingPostId)} className='register-btn'>매칭신청</button>
          : 
          post.matchingStatus === '매칭 완료' ?
          <button onClick={()=>handleClickCancelBtn(post.matchingPostId)} className='register-btn registered'>매칭완료</button>
          :
          <div className='register-btn registered'>매칭마감</div>
          }
        </div>
      </div>
    </SettingStyle>
  )
}

export default RoommateScrollItem

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