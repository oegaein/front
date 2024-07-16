import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import DotIcon from '@assets/images/common/DotIcon.svg';
import Threedots from '@assets/images/common/Threedots.svg';

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
	content,
	mr,
	width,
	height,
	ver,
}) => {
	const [threedots, setThreedots] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [confirmContent, setConfirmContent] = useState({
		id: -1,
		msg: '',
		btn: '',
		func: () => {},
	});

	const EditFunc = () => {
		alert('댓글 수정!');
	};

	const DeleteFunc = () => {
		setConfirm(true);
		setConfirmContent((prev) => ({
			...prev,
			msg: '댓글을 삭제할까요?',
			btn: '삭제',
			id: 1,
			func: () => {
				alert('삭제 API');
			},
		}));
	};

	const BlockFunc = () => {
		setConfirm(true);
		setConfirmContent((prev) => ({
			...prev,
			msg: `${nickname}님을 차단할까요?`, // 작성자 이름
			btn: '차단',
			id: 1,
			func: () => {
				alert('차단 API');
			},
		}));
	};

	const myOption = [
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
			{/* {threedots && (
				<OptionModal
					options={yourOption}
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
			)} */}
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
						<div className="flex justify-between items-center p-[2px]">
							<Nickname weight="caption" className="mr-3">
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
		weight === 'bold' ? FONT.title3SB17 : FONT.caption2M14};
`;
