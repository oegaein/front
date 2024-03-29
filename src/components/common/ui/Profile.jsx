import React from 'react';
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
				<img src={Img} alt="Profile" width={width} height={height} />
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
	target,
}) => {
	const handleThreedots = () => {
		alert('Threedots');
	};
	return (
		<>
			<div className="flex w-full">
				<ImgWrapper mr={mr} width={width} height={height}>
					<img src={Img} alt="Profile" width={width} height={height} />
				</ImgWrapper>
				<div className="flex flex-col w-full">
					{ver === 'profile' ? (
						<div className="flex items-center p-[2px]">
							<Nickname weight="caption">{nickname}</Nickname>
							<img src={DotIcon} alt="dotIcon" />
							<Link to={'/profile'}>
								<span className="cation2 color-purple">프로필 보기</span>
							</Link>
						</div>
					) : (
						<div className="flex justify-between items-center p-[2px]">
							<Nickname weight="caption">{nickname}</Nickname>
							<img
								src={Threedots}
								alt="threedots"
								className="cursor-pointer"
								onClick={handleThreedots}
							/>
						</div>
					)}
					<div className="flex">
						{target && <p className="target">@{target}</p>}
						<p className="cation2 color-gray800 text-start">{content}</p>
					</div>
				</div>
			</div>
		</>
	);
};

const ImgWrapper = styled.div`
	margin-top: 2px;
	margin-right: ${({ mr }) => mr || '20px'};
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	border-radius: 50%;
	background-color: ${COLOR.gray100};
	display: inline-flex;
	align-items: center;
`;

const Nickname = styled.p`
	font: ${({ weight }) =>
		weight === 'bold' ? FONT.title3SB17 : FONT.caption2M14};
`;
