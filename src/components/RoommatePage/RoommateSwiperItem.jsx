import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest'
import { useQueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

const RoommateSwiperItem = ({post, type, index, setConfirm, setConfirmContent}) => {
//   매칭글 - 매칭 대기 | 매칭 마감 | 매칭 완료
// 매칭요청(내 룸메이트 신청 목록, 룸메이트 신청 요청 ) - 매칭 대기(대기중) | 매칭 수락(수락됨) | 매칭 거절(거절됨)

  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const registerMutation = useMutation(
		{
			mutationFn: (matchingPostId) => makeAuthorizedRequest('/api/v1/matchingrequests', 'post', {matchingPostId}),
			onSuccess: (data) => {
				if (data.status === 201) {
					queryClient.invalidateQueries(['matchingPosts', type])
				}
				console.log('매칭신청', data);
			},
			onError: (error) => {
				console.log(error);
			}
		}
	);
  const cancelMutation = useMutation(
		{
			mutationFn: (matchingPostId) => makeAuthorizedRequest(`/api/v1/matchingrequests/${matchingPostId}`, 'delete'),
			onSuccess: (data) => {
				if (data.status === 204) {
					queryClient.invalidateQueries(['matchingPosts', type])
				}
				console.log('매칭취소', data);
			},
			onError: (error) => {
				console.log(error);
			}
		}
	);

  const handleClickRegisterBtn = async (e, matchingPostId) => {
    e.stopPropagation()

    setConfirm(true)
		setConfirmContent({
			id: -1,
			msg: `'${post.name}'님께 매칭을 신청할까요?`,
			btn: '수락',
			func: () => {registerMutation.mutate(matchingPostId)},
		})
  }
  const handleClickCancelBtn = async (e, matchingPostId) => {
    e.stopPropagation()

    setConfirm(true)
		setConfirmContent({
			id: -1,
			msg: `'${post.name}'님과의 매칭을 취소할까요?`,
			btn: '확인',
			func: () => {cancelMutation.mutate(matchingPostId)},
		})
  }
  const handleClickPost = (matchingPostId) => {
    navigate(`/post-detail/${matchingPostId}`)
  }
  return (
    <SettingStyle onClick={()=>handleClickPost(post.matchingPostId)} key={post.matchingPostId} className={`w-[192px] h-[179px] border border-[${COLOR.gray100}] rounded-[20px] bg-white p-[17px] pb-[13px]`}>
      <div className='flex items-center justify-between mb-[10px]'>
        <span className='room'>{post.dong} {post.roomSize}</span>
        {post.matchingStatus === '매칭 대기' &&
        <span className='dday'>{post.dday === 0 ? 'D-Day' : `D-${post.dday}`}</span>        
        }
      </div>
      <p className='title text-left mb-[13px] h-[21px] 
      whitespace-nowrap overflow-hidden text-ellipsis'>
        {post.title}
      </p>
      <div className='flex items-center'>
        <img className='h-[60px] w-[60px] rounded-[50%]' src={post.photoUrl} alt='profile image'/>
        <div className='my-[auto] ml-[10px] text-left'>
          <p>
            <span className='name mr-[6px]'>{post.name.length > 3 ? `${post.name.substring(0, 3)}...` : post.name.substring(0, 3)}</span>
            <span className='gender'>{post.gender}</span>
          </p>
          <p className='number'>모집인원 {post.targetNumberOfPeople}명</p>
        </div>
      </div>
      <div className='text-right'>
      {
        type === 'my-matchingrequests' ? 
        //매칭대기 and requestId 
        post.matchingStatus === '매칭 대기' ?
        <div className='register text-right'>대기중</div>
        :
        post.matchingStatus === '매칭 수락' ?
        <div className='register text-right registered'>수락됨</div>
        :
        <div className='register text-right registered'>거절됨</div>
        //my-matchingrequests를 제외한 나머지 
        :
        post.matchingStatus === '매칭 완료' ?
        <div className='register text-right registered'>{post.matchingStatus}</div>
        :
        post.matchingStatus === '매칭 마감' ?
        <div  className='register text-right gray500'>{post.matchingStatus}</div>
        :
        //매칭 대기 
        <div className='register text-right'>{post.matchingStatus}</div>
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
    &.gray500 {
      color: ${COLOR.gray500};
    }

  }
`