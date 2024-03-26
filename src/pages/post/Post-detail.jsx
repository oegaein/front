import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '@common/header/Header';
import { Subtitle } from '@styles/basicInfo/Text';
import { DropdownWrapper } from '@common/dropdown/BasicDropdown';
import { BasicProfile, SimpleProfile } from '@common/ui/Profile';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';
import Threedots from '@assets/images/common/Threedots.svg';
import Panda from '@assets/images/common/Panda.png';
import HomeIcon from '@assets/images/common/HomeIcon.svg';
import ArrowRightIcon from '@assets/images/common/ArrowRightIcon.svg';
import BasicArrowUpIcon from '@assets/images/common/BasicArrowUpIcon.svg';
import Checkbox from '@assets/images/common/Checkbox.svg';
import Comment from '@components/comment/Comment';

const mocks = {
	profile: {
		img: Panda,
		nickname: 'happy푸바옹',
		gender: '남',
		birth: '1999.05.25',
		studentId: '18학번',
		major: '폴란드어과',
		introduce: '맛집 투어 좋아해요!',
	},
	title: '신긱 룸메 찾습니다.',
	upload: 2,
	detail:
		'1. 저랑 나이대가 비슷하면 좋겠습니다\n2. 취침 시간: 12시-1시 사이에 보통 잠을 잡니다.\n3.제일 중요: 비흡연자를 찾습니다. \n\n 4인실이라 세 분 구하고 있습니다. 괜찮으시면 매칭 신청해주세요.',
	building: 'E동',
	room: '4인실',
	recruitNum: 3,
	deadline: {
		date: '2024년 7월 5일',
		time: '오후 1시 30분',
	},
};

const PostDetail = () => {
	const navigate = useNavigate();
	const [moreOpen, setMoreOpen] = useState(false);
	const handleThreedots = () => {
		alert('Threedots');
	};

	return (
		<>
			<PostDetailStyle>
				<div className="container justify-between sticky top-0 bg-white z-20">
					<Header
						backPath={'/home'}
						rightContent={Threedots}
						rightEvent={handleThreedots}
					>
						<div className="flex justify-start items-center w-5/6">
							<Link to="/home">
								<img src={HomeIcon} alt="home" className="mr-[60px]" />
							</Link>
							<SimpleProfile
								Img={mocks.profile.img}
								nickname={mocks.profile.nickname}
								mr={'6px'}
								width="25px"
								height="25px"
								weight="bold"
							/>
						</div>
					</Header>
				</div>
				<section className="post">
					<div className="container justify-between items-center">
						<p>{mocks.title}</p>
						<span className="cation2 color-gray">{mocks.upload}분 전</span>
					</div>
					<Box />
					<div className="container flex-col">
						<div className="flex justify-between w-full mb-4">
							<div className="flex">
								<SimpleProfile
									Img={mocks.profile.img}
									nickname={mocks.profile.nickname}
									mr="6px"
									width="25px"
									height="25px"
									weight="light"
								/>
							</div>
							<Link to={'/profile'}>
								<span className="cation2 color-purple">프로필 보기</span>
							</Link>
						</div>
						<div className="w-full">성별 어쩌구 들어올 곳</div>
					</div>
					{moreOpen && (
						<div className="bg-gray-50">
							<p>성향 및 라이프 스타일</p>
						</div>
					)}
					<div
						className="flex justify-center items-center p-4 cursor-pointer"
						onClick={() => {
							setMoreOpen((prev) => !prev);
						}}
					>
						{moreOpen ? (
							<div className="flex">
								<span className="cation2 mr-1">접어두기</span>
								<img src={BasicArrowUpIcon} alt="arrow" />
							</div>
						) : (
							<>
								<span className="cation2 mr-1">더보기</span>
								<img src={ArrowRightIcon} alt="arrow" />
							</>
						)}
					</div>
					<Box />
					<div className="container flex-col">
						<Subtitle>상세 내용</Subtitle>
						<DropdownWrapper
							style={{
								marginBottom: '0px',
								padding: '15px',
								whiteSpace: 'pre-wrap',
							}}
						>
							<p className="caption2 text-left">{mocks.detail}</p>
						</DropdownWrapper>
					</div>
					<Box />
					<div className="container flex-col">
						<div className="flex flex-col mb-4">
							<div className="flex justify-center items-center mb-4">
								<img src={Checkbox} className="mr-1" />
								<Subtitle style={{ margin: '0px' }}>
									희망하는 기숙사 동 & 호실 유형
								</Subtitle>
							</div>
							<div className="flex">
								<PurpleBox>{mocks.building}</PurpleBox>
								<PurpleBox>{mocks.room}</PurpleBox>
							</div>
						</div>
						<div className="flex flex-col mb-4">
							<div className="flex justify-center items-center mb-4">
								<img src={Checkbox} className="mr-1" />
								<Subtitle style={{ margin: '0px' }}>모집 인원</Subtitle>
							</div>
							<PurpleBox>{mocks.recruitNum}명</PurpleBox>
						</div>
						<div className="flex flex-col">
							<div className="flex justify-center items-center mb-4">
								<img src={Checkbox} className="mr-1" />
								<Subtitle style={{ margin: '0px' }}>마감 기한</Subtitle>
							</div>
							<p className="body5 text-left">
								{mocks.deadline.date} / {mocks.deadline.time}
							</p>
						</div>
					</div>
					<div className="container">
						<BasicProfile
							Img={mocks.profile.img}
							nickname={mocks.profile.nickname}
							content={mocks.profile.introduce}
							mr="20px"
							width="45px"
							height="45px"
							ver="profile"
						/>
					</div>
					<Box />
				</section>
				<section className="comment">
					<Comment />
				</section>
			</PostDetailStyle>
		</>
	);
};

export default PostDetail;

const PostDetailStyle = styled.div`
	display: flex;
	flex-direction: column;
	padding: 41px 0px;

	.cation2 {
		font: ${FONT.caption2M14};
	}

	.body5 {
		font: ${FONT.body5M15};
	}

	.color-gray {
		color: ${COLOR.gray400};
	}

	.color-gray800 {
		color: ${COLOR.gray800};
	}

	.color-purple {
		color: ${COLOR.purple1};
	}

	.container {
		display: flex;
		padding: 25px;
		width: 100%;
		border-bottom: 1px solid ${COLOR.gray100};

		> p {
			font: ${FONT.title3SB17};
		}
	}
`;

export const Box = styled.div`
	width: 100%;
	height: 10px;
	background-color: ${COLOR.gray100};
`;

export const PurpleBox = styled.div`
	margin-right: 14px;
	padding: 20px;
	background-color: ${COLOR.purple3};
	border-radius: 10px;
	font: ${FONT.body5M15};
`;
