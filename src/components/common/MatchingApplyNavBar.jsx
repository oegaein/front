import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postMatchingRequestAPI } from 'services/api/MatchingRequestAPI';
import useMyInfoStore from '@store/myInfoStore';
import { toast } from 'react-toastify';

//styles
import styled from 'styled-components';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';

//images
import Share from '@assets/images/share.svg';
import BigRedHeart from '@assets/images/bigredheart.svg';
import BigEmptyHeart from '@assets/images/heart (10) 1.svg';
import Comment from '@assets/images/comment.svg';

const MatchingApplyNavBar = ({
	version,
	isLowerBarVisible,
	memberId,
	postId,
	userInfo,
	reFetchData,
	matchingStatus,
	matchingRequestId,
	setConfirm,
	setConfirmContent,
	authorName,
	title,
}) => {
	const [isLike, setIsLike] = useState(false);
	// const [firstRendering, setFirstRendering] = useState(true)
	const [isMyPost, setIsMyPost] = useState(false);
	const isLikeProps = userInfo?.is_like;
	const navigate = useNavigate();
	const location = useLocation();
	const queryClient = useQueryClient();

	const myInfo = useMyInfoStore.getState().myInfo;
	// /user or /post-detail

	//조건 변수 정의
	const isUserPage = location.pathname.substring(0, 5) === '/user';
	const isPostDetailPage = !isUserPage;
	//const [isMyApplyPost, setIsMyApplyPost] = useState(matchingRequestId);
	const isMyApplyPost = matchingRequestId;
	const isMatchingPending = matchingStatus === '매칭 대기';
	const isMatchingClosed =
		matchingStatus === '매칭 완료' || matchingStatus === '매칭 마감';
	useEffect(() => {
		// myProps가 undefined가 아닌 경우에만 state 업데이트
		setIsLike(isLikeProps);
	}, [isLikeProps]);
	useEffect(() => {
		if (myInfo?.id === memberId) {
			setIsMyPost(true);
		}
	}, [isMyPost]);

	useEffect(() => {
		// 카카오 SDK 초기화
		if (!window.Kakao.isInitialized()) {
			window.Kakao.init('090826f305f3c07c40d74086a30a34cb');
		}
	}, []);

	const goToDetailComments = () => {
		navigate(`/comment-detail/${postId}`);
	};
	const goToUserPostPage = () => {
		navigate(`/user/${memberId}/posts`);
	};
	const fetchLikeMutation = useMutation({
		mutationFn: (id) =>
			makeAuthorizedRequest('/api/v1/member/like', 'post', { receiver_id: id }),
		onSuccess: (data) => {
			if (data.status === 201) {
				setIsLike(true);
			}
		},
		onError: () => {},
	});
	const cancelLikeMutation = useMutation({
		mutationFn: (id) =>
			makeAuthorizedRequest('/api/v1/member/like', 'delete', {
				receiver_id: id,
			}),
		onSuccess: (data) => {
			if (data.status === 204) {
				setIsLike(false);
			}
		},
		onError: () => {},
	});
	const fetchLikeData = () => {
		fetchLikeMutation.mutate(memberId);
	};
	const fetchDeleteLikeData = () => {
		cancelLikeMutation.mutate(memberId);
	};

	//매칭마감
	const terminateMutation = useMutation({
		mutationFn: (matchingPostId) =>
			makeAuthorizedRequest(`/api/v1/matchingposts/${matchingPostId}`, 'patch'),
		onSuccess: (data) => {
			if (data.status === 200) {
				// queryClient.invalidateQueries(['matchingPosts', 'mypost'])
				toast.success('매칭을 마감하였습니다.');
				reFetchData();
			}
		},
		onError: () => {},
	});
	//매칭마감 버튼
	const handleClickTerminateBtn = async () => {
		// e.stopPropagation()
		setConfirm(true);
		setConfirmContent({
			id: -1,
			msg: `룸메이트 매칭을 마감할까요?`,
			btn: '마감',
			func: () => {
				terminateMutation.mutate(postId);
			},
		});
	};
	//매칭신청
	const fetchMatchingRequest = async () => {
		try {
			const response = await postMatchingRequestAPI(postId);
			if (response.status === 201) {
				//setIsMyApplyPost(true)
				reFetchData();
				toast.success('매칭 신청이 완료되었습니다.');
			}
		} catch (err) {}
	};
	//카카오톡 공유하기
	const clickShareBtn = () => {
		if (window.Kakao) {
			const kakao = window.Kakao;
			kakao.Share.sendDefault({
				objectType: 'feed',
				content: {
					title: '이 룸메 어떠세요?',
					description: `${version === 'comment' ? title : userInfo.introduction}`,
					imageUrl: 'https://i.ibb.co/dts410Q/oegaeinlogo.png',
					link: {
						mobileWebUrl: 'https://developers.kakao.com',
						webUrl: 'https://developers.kakao.com',
					},
				},
				itemContent: {
					profileText: `${version === 'comment' ? authorName : userInfo.name} 님의 글 | 외개인`,
					profileImageUrl: `${userInfo?.photo_url}`,
					// titleImageText: 'www.hufs.ac.kr',
					// titleImageCategory: '공유한 친구: 김혁수',
				},
				buttons: [
					{
						title: '룸메이트 보러가기',
						link: {
							mobileWebUrl: 'https://developers.kakao.com',
							webUrl: `${window.location.origin}${location.pathname}`,
						},
					},
				],
			});
		}
	};
	const renderButton = () => {
		if (isUserPage) {
			return (
				<button
					onClick={goToUserPostPage}
					className="filter-btn whitespace-nowrap"
				>
					매칭신청
				</button>
			);
		}

		if (isPostDetailPage) {
			if (isMyPost) {
				if (isMatchingPending) {
					return (
						<button
							onClick={handleClickTerminateBtn}
							className="filter-btn whitespace-nowrap"
						>
							마감하기
						</button>
					);
				} else if (isMatchingClosed) {
					return (
						<div className="filter-btn whitespace-nowrap registered">
							매칭 마감
						</div>
					);
				}
			} else if (isMyApplyPost) {
				return (
					<div className="filter-btn whitespace-nowrap applied">신청완료</div>
				);
			} else {
				if (isMatchingPending) {
					return (
						<button
							onClick={fetchMatchingRequest}
							className="filter-btn whitespace-nowrap"
						>
							매칭신청
						</button>
					);
				} else if (isMatchingClosed) {
					return (
						<div className="filter-btn whitespace-nowrap registered">
							매칭 마감
						</div>
					);
				}
			}
		}

		return null; // 기본적으로 아무것도 렌더링하지 않음
	};

	return (
		<SettingStyle
			className={`bg-white z-50 fixed bottom-0 flex items-center justify-between gap-[15px] h-[91px] w-[393px] px-[26px]
      transition-transform duration-300 ${isLowerBarVisible ? 'translate-y-0' : 'translate-y-full'}`}
		>
			<div className="flex gap-[21px]">
				{version === 'userPage' && (
					<>
						{isLike ? (
							<button
								onClick={fetchDeleteLikeData}
								className="whitespace-nowrap w-[22px]"
							>
								<img src={BigRedHeart} />
							</button>
						) : (
							<button
								onClick={fetchLikeData}
								className="whitespace-nowrap w-[22px]"
							>
								<img src={BigEmptyHeart} />
							</button>
						)}
					</>
				)}
				{version === 'comment' && (
					<button
						onClick={goToDetailComments}
						className="whitespace-nowrap w-[22px]"
					>
						<img src={Comment} />
					</button>
				)}
				<button onClick={clickShareBtn} className="whitespace-nowrap">
					<img src={Share} />
				</button>
			</div>
			{renderButton()}
		</SettingStyle>
	);
};

export default MatchingApplyNavBar;

const SettingStyle = styled.div`
	.filter-btn {
		font-size: ${FONT.buttonSB15};
		color: white;
		background-color: ${COLOR.purple1};
		height: 52px;
		line-height: 52px;
		flex: 1;
		border-radius: 10px;
		&:hover {
			opacity: 0.5;
		}
		&.registered {
			color: ${COLOR.red};
			background-color: ${COLOR.gray50};
		}
		&.gray500 {
			color: ${COLOR.gray500};
		}
		&.applied {
			background-color: ${COLOR.gray50};
			color: black;
		}
	}
`;
