import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';
import { timeAgo } from '@utils/TimeAgo';
import {
	deleteMatchingPostAPI,
	getMatchingPostAPI,
} from 'services/api/MatchingPostAPI';
//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

import Dots from '@assets/images/dots-black.svg'
const MyPost = ({ post, index, setConfirm, setConfirmContent, setOption, setOptionModalOptions }) => {
	//   매칭글 - 매칭 대기 | 매칭 마감 | 매칭 완료
// 매칭요청(내 룸메이트 신청 목록, 룸메이트 신청 요청 ) - 매칭 대기 | 매칭 수락 | 매칭 거절 
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const confirmMutation = useMutation(
		{
			mutationFn: (matchingRequestId) => makeAuthorizedRequest(`/api/v1/matchingrequests/${matchingRequestId}/accept`, 'patch'),
			onSuccess: (data) => {
				if (data.status === 200) {
					queryClient.invalidateQueries(['matchingPosts', 'mypost'])
				}
				console.log('매칭확정', data);
			},
			onError: (error) => {
				console.log(error);
			}
		}
	);
	const handleClickConfirmBtn = async () => {
		// e.stopPropagation()
    setConfirm(true)
		setConfirmContent({
			id: -1,
			msg: `룸메이트 매칭을 확정할까요?`,
			btn: '확정',
			func: () => {confirmMutation.mutate(post.matchingPostId)},
		})
	}
	const editFunc = () => {
		navigate('/post-edit');	//우선 임의 경로로 처리함 
	}
	const deleteFunc = () => {
		setConfirm(true);
		setConfirmContent((prev) => ({
			...prev,
			msg: '게시글을 삭제할까요?',
			btn: '삭제',
			func: async () => {
				const res = await deleteMatchingPostAPI(post.matchingPostId);
				console.log('삭제', res);
				navigate('/mypage');
			},
		}));
	}
	const handleClickThreeDotsBtn = () => {
		setOption(true)
		setOptionModalOptions([
			{
				content: '수정하기',
				func: editFunc,
			},
			{
				content: '삭제하기',
				func: deleteFunc,
			},
		])

	}

	return (
		<SettingStyle className="px-[15px] py-[20px]">
			<div className="flex justify-between">
				<div className="flex items-center justify-between gap-[10px]">
					<span className="color-purple1 font-caption2m14">{post.dong} {post.roomSize}</span>
					<span className="font-caption3m12">모집인원 {post.targetNumberOfPeople}명</span>
				</div>
				<div className="flex gap-[14px]">
					<div className="font-caption2m14 color-gray500">{timeAgo(post.updatedAt, post.createdAt)}</div>
					<button onClick={handleClickThreeDotsBtn}>
						<img src={Dots} />
					</button>
				</div>
			</div>

			<div className="flex justify-between mt-[28px]">
				<div className="flex justify-between gap-[13px]">
					<div>
						<img className="rounded-[50%] w-[45px] h-[45px]" src={post.photoUrl} />
					</div>
					<div className="text-left overflow-hidden">
						<p className="font-caption1sb14 whitespace-nowrap overflow-hidden text-ellipsis">
							<Link className='post-title' to={`/post-detail/${post.matchingPostId}`}>
							{post.title}
							</Link>
						</p>
						<p className="font-caption2m14">
							{post.name}{' '}
							<span className="font-caption3m12 color-gray400">{post.gender}</span>
						</p>
					</div>
				</div>
				<div className="self-end whitespace-nowrap">
					{post.matchingStatus === '매칭 완료' ?
					<div className="color-red font-caption2m14">{post.matchingStatus}</div>
					:
					post.matchingStatus === '매칭 마감' ?
					<div className='color-gray500 font-caption2m14'>{post.matchingStatus}</div>
					:
					//매칭 대기 
					<div className='color-purple1 font-caption2m14'>{post.matchingStatus}</div>
					}
				</div>
			</div>
		</SettingStyle>
	);
};

export default MyPost

const SettingStyle = styled.div`
	border: 1px solid ${COLOR.gray100} !important;
	border-radius: 10px;
  .color-purple1 {
		color: ${COLOR.purple1};
	}
  .color-gray500 {
		color: ${COLOR.gray500};
	}
	.color-red {
		color: ${COLOR.red};
	}
  .font-caption2m14 {
		font-size: ${FONT.caption2M14};
	}
	.font-caption3m12 {
		font-size: ${FONT.caption3M12};
	}
  .font-caption1sb14 {
		font-size: ${FONT.caption1SB14};
	}
	.post-title:hover {
		text-decoration: underline;
	}
`
