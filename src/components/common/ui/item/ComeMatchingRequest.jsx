import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { timeAgo } from '@utils/TimeAgo';
//components
import ConfirmModal from '@common/modal/ConfirmModal';

// styles
import styled from 'styled-components';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';

//images
import Next from '@assets/images/next.svg';

const ComeMatchingRequest = ({ post, index, reFetchComeMatchingRequests }) => {
	const queryClient = useQueryClient();
	const [confirm, setConfirm] = useState(false);
	const [confirmContent, setConfirmContent] = useState({});

	const acceptMutation = useMutation({
		mutationFn: (id) =>
			makeAuthorizedRequest(`/api/v1/matchingrequests/${id}/accept`, 'patch'),
		onSuccess: (data) => {
			if (data.status === 200) {
				reFetchComeMatchingRequests();
			}
			console.log('수락', data);
		},
		onError: (error) => {
			console.log(error);
		},
	});
	const rejectMutation = useMutation({
		mutationFn: (id) =>
			makeAuthorizedRequest(`/api/v1/matchingrequests/${id}/reject`, 'patch'),
		onSuccess: (data) => {
			if (data.status === 200) {
				reFetchComeMatchingRequests();
			}
			console.log('거절', data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const handleClickAcceptBtn = (id) => {
		setConfirm(true);
		setConfirmContent({
			id: -1,
			msg: `${post.name}님의 요청을 수락할까요?`,
			btn: '수락',
			func: () => {
				acceptMutation.mutate(id);
			},
		});
	};
	const handleClickRejectBtn = async (id) => {
		setConfirm(true);
		setConfirmContent({
			id: -1,
			msg: `${post.name}님의 요청을 거절할까요?`,
			btn: '거절',
			func: () => {
				rejectMutation.mutate(id);
			},
		});
	};
	return (
		<SettingStyle className="flex flex-col gap-[10px]">
			{confirm && (
				<ConfirmModal
					content={confirmContent}
					isOpen={confirm}
					setIsOpen={setConfirm}
				/>
			)}
			<Link
				to={`/post-detail/${post.matchingPostId}`}
				style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
			>
				<div className="flex justify-between">
					<p className="font-caption1sb14">{post.title}</p>
					<div className="font-caption2m14 color-gray500">
						{timeAgo(post.createdAt)}
					</div>
				</div>
				<div className="flex justify-between">
					<div className="flex items-center justify-between gap-[10px]">
						<span className="color-purple1 font-caption2m14">
							{post.dong} {post.roomSize}
						</span>
						<span className="font-caption3m12">
							모집인원 {post.targetNumberOfPeople}명
						</span>
					</div>
				</div>
			</Link>
			<div className="flex justify-between">
				<div className="flex gap-[20px]">
					<div>
						<img
							src={post.photoUrl}
							className="rounded-[50%] w-[45px] h-[45px]"
						/>
					</div>
					<div>
						<Link to={`/user/${post.id}`} className="username flex">
							{post.name} <img src={Next} />
						</Link>
						<p className="small-text">{post.introduction}</p>
					</div>
				</div>
				<div className="flex gap-[5px]">
					<button
						onClick={() => handleClickAcceptBtn(post.matchingRequestId)}
						className="button allowed"
					>
						수락
					</button>
					<button
						onClick={() => handleClickRejectBtn(post.matchingRequestId)}
						className="button declined"
					>
						거절
					</button>
				</div>
			</div>
		</SettingStyle>
	);
};

export default ComeMatchingRequest;

const SettingStyle = styled.div`
	.color-purple1 {
		color: ${COLOR.purple1};
	}
	.color-gray500 {
		color: ${COLOR.gray500};
	}
	.font-caption2m14 {
		font: ${FONT.caption2M14};
	}
	.font-caption3m12 {
		font: ${FONT.caption3M12};
	}
	.font-caption1sb14 {
		font: ${FONT.caption1SB14};
	}
	.post-title:hover {
		text-decoration: underline;
	}
	.username {
		font: ${FONT.caption2M14};
	}
	.small-text {
		font-size: ${FONT.caption2M14};
		color: ${COLOR.gray600};
	}
	.button {
		border: 1px solid ${COLOR.gray100};
		font-size: ${FONT.caption2M14};
		width: 43px;
		height: 26px;
		border-radius: 5px;
		&.allowed {
			color: ${COLOR.gray600};
		}
		&.declined {
			color: ${COLOR.red};
		}
	}
`;
