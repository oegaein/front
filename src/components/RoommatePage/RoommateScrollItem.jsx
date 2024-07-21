import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest'
import { useQueryClient, useMutation } from '@tanstack/react-query'

//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

//images
import { API } from '@utils/api'

const RoommateScrollItem = ({post, type, setConfirm, setConfirmContent}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const registerMutation = useMutation(
		{
			mutationFn: (matchingRequestId) => makeAuthorizedRequest('/api/v1/matchingrequests', 'post', {matchingRequestId}),
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
			mutationFn: (matchingRequestId) => makeAuthorizedRequest(`/api/v1/matchingrequests/${matchingRequestId}`, 'delete'),
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
    <SettingStyle onClick={()=>handleClickPost(post.matchingPostId)} key={post.matchingPostId} className={`flex bg-white border border-[${COLOR.gray100}] rounded-[20px] p-[14px]`}>
      <img className='w-[100px] h-[100px] mr-[12px] rounded-[50%]' src={post.photoUrl}/>
      <div className='w-full flex flex-col justify-between'>
        <div>
          <div className='flex items-center justify-between'>
            <div>
              <span className='room mr-[10px]'>{post.dong} {post.roomSize}</span>
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
          <button onClick={(e)=>handleClickRegisterBtn(e, post.matchingPostId)} className='register-btn'>매칭신청</button>
          : 
          post.matchingStatus === '매칭 완료' ?
          <button onClick={(e)=>handleClickCancelBtn(e, post.matchingPostId)} className='register-btn registered'>매칭완료</button>
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
  .roommate-title:hover {
    text-decoration: underline;
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