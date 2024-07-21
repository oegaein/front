import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import DotIcon from '@assets/images/common/DotIcon.svg';
import Threedots from '@assets/images/common/Threedots.svg';
import OptionModal from '@common/modal/OptionModal';
import ConfirmModal from '@common/modal/ConfirmModal';
import useMyInfoStore from '@store/myInfoStore';
import {
	deleteCommentsAPI,
	deleteRepliesAPI,
	putReplyAPI,
} from 'services/api/CommentsAPI';
import useAuthStore from '@store/authStore';
import { BlockUserAPI } from 'services/api/ProfileAPI';

export const SimpleProfile = ({ Img, nickname, mr, width, height, weight }) => {
	return (
		<>
			<ImgWrapper mr={mr} width={width} height={height}>
				<img src={Img} alt="Profile" className="img" />
			</ImgWrapper>
			<Nickname weight={weight}>{nickname}</Nickname>
		</>
	);
};

export const BasicProfile = ({
	Img,
	nickname,
	userID = -1,
	content,
	mr,
	width,
	height,
	ver,
	commentID = -1,
	isReply = false,
}) => {
	const setAccessToken = useAuthStore((state) => state.setAccessToken);
	const myname = useMyInfoStore.getState().myInfo.name;
	const [threedots, setThreedots] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [confirmContent, setConfirmContent] = useState({
		id: -1,
		msg: '',
		btn: '',
		func: () => {},
	});

	const EditFunc = async () => {
		alert('수정!');
	};

	const DeleteFunc = () => {
		setConfirm(true);
		setConfirmContent((prev) => ({
			...prev,
			msg: '댓글을 삭제할까요?',
			btn: '삭제',
			func: async () => {
				if (isReply) {
					const res = await deleteRepliesAPI(commentID);
					console.log(res);
				} else {
					const res = await deleteCommentsAPI(commentID);
					console.log(res);
				}
				window.location.reload();
			},
		}));
	};

	const BlockFunc = () => {
		setConfirm(true);
		setConfirmContent((prev) => ({
			...prev,
			msg: `${nickname}님을 차단할까요?`,
			btn: '차단',
			func: () => {
				BlockUserAPI(userID, setAccessToken);
			},
		}));
	};

	const commentOptions = [
		{
			content: '수정하기',
			func: EditFunc,
		},
		{
			content: '삭제하기',
			func: DeleteFunc,
		},
	];
	const yourOption = [
		{
			content: '차단하기',
			func: BlockFunc,
		},
	];

	return (
		<>
			{threedots && (
				<OptionModal
					options={nickname === myname ? commentOptions : yourOption}
					isOpen={threedots}
					setIsOpen={setThreedots}
				/>
			)}
			{confirm && (
				<ConfirmModal
					content={confirmContent}
					isOpen={confirm}
					setIsOpen={setConfirm}
				/>
			)}
			<div className="flex w-full">
				<img
					src={Img}
					alt="Profile"
					className={`img mr-[${mr}] rounded-full`}
					width={width}
					height={height}
				/>
				<div className="flex flex-col items-start w-full">
					{ver === 'profile' ? (
						<div className="flex items-center">
							<Nickname weight="caption">{nickname}</Nickname>
							<img src={DotIcon} alt="dotIcon" />
							<Link to={'/profile'}>
								<span className="cation2 color-purple">프로필 보기</span>
							</Link>
						</div>
					) : (
						<div className="flex justify-between items-center w-full">
							<Nickname weight="bold" className="mr-3">
								{nickname}
							</Nickname>
							<img
								src={Threedots}
								alt="threedots"
								className="cursor-pointer"
								onClick={() => setThreedots(true)}
							/>
						</div>
					)}
					<div className="flex">
						<p className="cation2 color-gray800 text-start">{content}</p>
					</div>
				</div>
			</div>
		</>
	);
};

export const ImgWrapper = styled.div`
	margin-right: ${({ mr }) => mr || '20px'};
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	border-radius: 50%;
	background-color: ${COLOR.gray100};
	display: inline-flex;
	align-items: center;

	.img {
		border-radius: 50%;
		width: ${({ width }) => width};
		height: ${({ height }) => height};
	}
`;

const Nickname = styled.p`
	font: ${({ weight }) =>
		weight === 'bold' ? FONT.body4SB15 : FONT.caption2M14};
`;
