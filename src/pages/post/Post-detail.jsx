import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '@common/header/Header';
import { Subtitle } from '@styles/basicInfo/Text';
import { DropdownWrapper } from '@common/dropdown/BasicDropdown';
import { BasicProfile, SimpleProfile } from '@common/ui/Profile';
import PreviewComment from '@components/comment/PreviewComment';
import OptionModal from '@common/modal/OptionModal';
import ConfirmModal from '@common/modal/ConfirmModal';
import BasicButton from '@common/button/BasicButton';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';
import Threedots from '@assets/images/common/Threedots.svg';
import Panda from '@assets/images/common/Panda.png';
import HomeIcon from '@assets/images/common/HomeIcon.svg';
import ArrowRightIcon from '@assets/images/common/ArrowRightIcon.svg';
import BasicArrowUpIcon from '@assets/images/common/BasicArrowUpIcon.svg';
import Checkbox from '@assets/images/common/Checkbox.svg';
import CommentIcon from '@assets/images/common/comment.svg';
import ShareIcon from '@assets/images/common/share.svg';
import { getMatchingPostAPI } from 'services/api/MatchingPostAPI';
import { postMatchingRequestAPI } from 'services/api/MatchingRequestAPI';
import UserPageInfo from '@components/UserPage/UserPageInfo';
import UserLifeStyles from '@components/UserPage/UserLifeStyles';
import { timeAgo } from '@utils/TimeAgo';
import useAuthStore from '@store/authStore';

const myInfo = {
	name: '김예은',
};

const PostDetail = () => {
	const setAccessToken = useAuthStore((state) => state.setAccessToken);
	const { postId } = useParams();
	const navigate = useNavigate();
	const [data, setData] = useState(null);
	const [moreOpen, setMoreOpen] = useState(false);
	const [threedots, setThreedots] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [confirmContent, setConfirmContent] = useState({
		id: -1,
		msg: '',
		btn: '',
		func: () => {},
	});
	const [matching, setMatching] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const result = await getMatchingPostAPI(postId, setAccessToken);
			console.log(result);
			setData(result);
		};
		fetchData();
	}, [postId]);

	if (!data) {
		return <div>로딩 중...</div>;
	}

	const EditFunc = () => {
		navigate('/post-edit');
	};

	const DeleteFunc = () => {
		setConfirm(true);
		setConfirmContent((prev) => ({
			...prev,
			msg: '게시글을 삭제할까요?',
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
			msg: `${data.author_name}님을 차단할까요?`, // 작성자 이름
			btn: '차단',
			id: 1,
			func: () => {
				alert('차단 API');
			},
		}));
	};

	const calculateMarginRight = (name) => {
		let marginRight = 100;
		marginRight -= (name.length - 1) * 5;
		if (marginRight < 0) {
			marginRight = 0;
		}
		return marginRight;
	};

	const changeDate = (date) => {
		let yyyy = date.slice(0, 4);
		let mm = date.slice(5, 7);
		let dd = date.slice(8, 10);
		return `${yyyy}년 ${mm}월 ${dd}일`;
	};

	const postOptions = [
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
					options={data.author_name === myInfo.name ? postOptions : yourOption}
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
			<PostDetailStyle>
				<div className="container justify-between sticky top-0 bg-white z-20">
					<Header
						backPath={'/home'}
						rightContent={Threedots}
						rightEvent={() => {
							setThreedots(true);
						}}
					>
						<div className="flex justify-start items-center">
							<Link to="/home">
								<img
									src={HomeIcon}
									alt="home"
									className={`mr-[${calculateMarginRight(data.author_name)}px]`}
								/>
							</Link>
							<SimpleProfile
								Img={data.author_profile?.photo_url}
								nickname={data.author_name}
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
						<p>{data.title}</p>
						<span className="cation2 color-gray">
							{timeAgo(data.created_at)}
						</span>
					</div>
					<Box />
					<div className="container flex-col">
						<div className="flex justify-between w-full mb-4">
							<div className="flex">
								<SimpleProfile
									Img={data.author_profile?.photo_url}
									nickname={data.author_name}
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
						<UserPageInfo userInfo={data.author_profile} />
					</div>
					{moreOpen && (
						<div className="container flex flex-col w-full bg-gray-50">
							<p className="body2 w-full mb-4 text-start">
								성향 및 라이프스타일
							</p>
							<UserLifeStyles userInfo={data.author_profile} />
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
							<p className="caption2 text-left">{data.content}</p>
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
								<PurpleBox>{data.dong}</PurpleBox>
								<PurpleBox>{data.room_size}</PurpleBox>
							</div>
						</div>
						<div className="flex flex-col mb-4">
							<div className="flex justify-center items-center mb-4">
								<img src={Checkbox} className="mr-1" />
								<Subtitle style={{ margin: '0px' }}>모집 인원</Subtitle>
							</div>
							<PurpleBox className="w-16">
								{data.target_number_of_people}명
							</PurpleBox>
						</div>
						<div className="flex flex-col">
							<div className="flex justify-center items-center mb-4">
								<img src={Checkbox} className="mr-1" />
								<Subtitle style={{ margin: '0px' }}>마감 기한</Subtitle>
							</div>
							<p className="body5 text-left">{changeDate(data.deadline)}</p>
						</div>
					</div>
					<div className="container">
						<BasicProfile
							Img={data.author_profile?.photo_url}
							nickname={data.author_name}
							content={data.author_profile.gender}
							mr="20px"
							width="45px"
							height="45px"
							ver="profile"
						/>
					</div>
					<Box />
				</section>
				<section className="comment">
					<PreviewComment
						postId={data.id}
						comments={data.comments}
						count={data.comments_count}
					/>
				</section>
				<section className="container items-center justify-between sticky bottom-0 bg-white z-20">
					<button
						onClick={() => {
							navigate(`/comment-detail/${data.id}`, {
								state: { postId: data.id },
							});
						}}
						style={{ display: 'flex', alignItems: 'center' }}
					>
						<img
							src={CommentIcon}
							alt="commentIcon"
							style={{ marginRight: '5px' }}
						/>
						<p className="cation2 gray400">댓글</p>
					</button>
					<button className="flex items-center" onClick={() => alert('공유')}>
						<img
							src={ShareIcon}
							alt="shareIcon"
							style={{ marginRight: '5px' }}
						/>
					</button>
					<BasicButton
						text={matching ? '신청완료' : '매칭신청'}
						eventName={() => {
							setMatching(true);
							postMatchingRequestAPI(postId, setAccessToken);
						}}
						disabled={matching}
						size="65%"
					/>
				</section>
			</PostDetailStyle>
		</>
	);
};

export default PostDetail;

const PostDetailStyle = styled.div`
	display: flex;
	flex-direction: column;

	.cation2 {
		font: ${FONT.caption2M14};
	}

	.body2 {
		font: ${FONT.body2SB16};
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
