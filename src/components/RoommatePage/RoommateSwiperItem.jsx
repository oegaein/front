import React from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from '@utils/api'
//images

//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'
const RoommateSwiperItem = ({post}) => {
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
    <SettingStyle onClick={()=>handleClickPost(post.matchingPostId)} key={post.matchingPostId} className={`w-[192px] h-[179px] border border-[${COLOR.gray100}] rounded-[20px] bg-white p-[17px] pb-[13px] ml-[12px]`}>
      <div className='flex items-center justify-between mb-[10px]'>
        <span className='room'>{post.dong} {post.roomSize}</span>
        {post.matchingStatus === '매칭 대기' &&
        <span className='dday'>{post.dday === 0 ? 'D-Day' : `D-${post.dday}`}</span>        
        }
      </div>
      <p className='title text-left mb-[13px] h-[25px] 
      whitespace-nowrap overflow-hidden text-ellipsis'>
        {post.title}
      </p>
      <div className='flex items-center'>
        <img className='h-[60px] w-[60px] rounded-[50%]' src={post.photoUrl} alt='profile image'/>
        <div className='my-[auto] ml-[10px] text-left'>
          <p>
            <span className='name mr-[6px]'>{post.name}</span>
            <span className='gender'>{post.gender}</span>
          </p>
          <p className='number'>모집인원 2명</p>
        </div>
      </div>
      <div className='text-right'>
      {
        post.matchingStatus === '매칭 대기' ?
        <button onClick={()=>handleClickRegisterBtn(post.matchingPostId)} className='register text-right'>매칭신청</button>
        :
        post.matchingStatus === '매칭 완료' ?
        <button onClick={()=>handleClickCancelBtn(post.matchingPostId)} className='register text-right registered'>매칭완료</button>
        :
        <div className='register text-right registered'>매칭마감</div>
      }
      </div>
    </SettingStyle>
  )
}

export default RoommateSwiperItem

const SettingStyle = styled.button`
  .room {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.purple1};
  }
  .dday {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.gray500};
  }
  .title {
    font-size: ${FONT.caption1SB14};
  }
  .name {
    font-size: ${FONT.caption2M14};
  }
  .gender {
    font-size: ${FONT.caption3M12};
    color: ${COLOR.gray500};
  }
  .number {
    font-size: ${FONT.caption3M12};
  }
  .register {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.purple1};
    &.registered {
      color: ${COLOR.red}
    }

  }
`