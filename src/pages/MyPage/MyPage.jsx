import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMatchingPosts } from 'hooks/useMatchingPosts';
import { useNavigate } from 'react-router-dom';
// import { API } from '@utils/api';
import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';

//components
import Header from '@common/header/Header';
import ConfirmModal from '@common/modal/ConfirmModal';
import OptionModal from '@common/modal/OptionModal';
// styles
import styled from 'styled-components';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';

// images
import Notification from '@assets/images/notification 1.svg';
import Heart from '@assets/images/heart (10) 1.svg';
import Review from '@assets/images/review 1.svg';
import Next from '@assets/images/next.svg';
import Home from '@assets/images/home.svg';
import Setting from '@assets/images/settings.svg';

//components
import RoommateSwiperList from '@common/RoommateSwiperList';
import LikeItem from '@components/LikePage/LikeItem';
import SelectMenuBar from '@common/menu/SelectMenuBar';
import ComeMatchingRequest from '@common/ui/item/ComeMatchingRequest';
import MyPost from '@common/ui/item/MyPost';
import DeliveryNotification from '@common/ui/item/DeliveryNotification';

const MyPage = () => {
	const myInfo = useMyInfoStore.getState().myInfo;
	//나에게 온 매칭신청 목록 조회
	const {
		data: comeMatchingRequests,
		refetch: reFetchComeMatchingRequests,
		isLoading: isLoadingCome,
		error: isErrorCome,
	} = useMatchingPosts('come-matchingrequests');
	//내가 신청한 매칭 신청 목록 조회
	const {
		data: myMatchingRequests,
		isLoading: isLoadingMy,
		error: isErrorMy,
	} = useMatchingPosts('my-matchingrequests');
	//내가 신청한 매칭 신청 목록 조회
	const {
		data: myMatchingPosts,
		isLoading: isLoadingMyUpload,
		error: isErrorMyUpload,
	} = useMatchingPosts('mypost');

	const navigate = useNavigate();
	const [myInfo, setMyInfo] = useState()
	const [likeData, setLikeData] = useState([]);
	const [uploadPostType, setUploadPostType] = useState('룸메이트');
	const [likeType, setLikeType] = useState('룸메이트');
	const [confirm, setConfirm] = useState(false);
	const [confirmContent, setConfirmContent] = useState({});
	const [option, setOption] = useState(false);
	const [optionModalOptions, setOptionModalOptions] = useState({});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const fetchMyInfoData = async () => {
		try {
			const response  = await makeAuthorizedRequest(`/api/v1/member/my-profile`)
			console.log('myinfo', response)
			setMyInfo(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchMyInfoData()
		window.scrollTo(0, 0);
		const fetchLikeData = async () => {
			try {
				const response = await makeAuthorizedRequest('/api/v1/member/like');
				console.log('like', response.data.data);
				setLikeData(response.data.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchLikeData();
	}, []);

	return (
		<SettingStyle className="flex flex-col gap-[10px]">
			{confirm && (
				<ConfirmModal
					content={confirmContent}
					isOpen={confirm}
					setIsOpen={setConfirm}
				/>
			)}
			{option && (
				<OptionModal
					options={optionModalOptions}
					isOpen={option}
					setIsOpen={setOption}
				/>
			)}
			<section className="bg-white px-[25px] pb-[24px]">
				<div className=" bg-white">
					<Header
						backPath="/"
						leftContent={Home}
						rightContent={Setting}
						rightEvent={() => {
							navigate('/alarm');
						}}
					></Header>
				</div>
				<div className="flex justify-between pt-[20px]">
					<div className="flex text-left gap-[20px]">
						<div>
							<img
								className="w-[45px] h-[45px] rounded-[50%]"
								src={myInfo?.photo_url}
							/>
						</div>
						<div>
							<p className="myname">{myInfo?.name}</p>
							<p className="small-text">{myInfo?.introduction}</p>
						</div>
					</div>
					<div>
						<Link
							to="/user/my-profile"
							className="color-purple1 font-caption2m14"
						>
							프로필 보기
						</Link>
					</div>
				</div>
				<div className="small-text px-[42px] pt-[48px] flex justify-between">
					<Link
						to="/alarm"
						className="flex flex-col justify-center items-center"
					>
						<img
							className="mb-[14px]"
							src={Notification}
							alt="알림 페이지로 가기"
						/>
						<span>알림</span>
					</Link>
					<Link to="/mypage/like" className="flex flex-col items-center">
						<img className="mb-[14px]" src={Heart} alt="알림 페이지로 가기" />
						<span>좋아요</span>
					</Link>
					<Link to={`/user/1/reviews`} className="flex flex-col items-center">
						<img className="mb-[14px]" src={Review} alt="알림 페이지로 가기" />
						<span>후기</span>
					</Link>
				</div>
			</section>

			<section className="bg-white px-[25px] py-[24px] text-left">
				<div className="flex justify-between">
					<h1 className="heading-text">내게 온 룸메이트 신청</h1>
					<Link
						to="/mypage/come-matchingrequests"
						className="flex items-center justify-between username whitespace-nowrap"
					>
						더보기 <img src={Next} />
					</Link>
				</div>
				<div className="pt-[16px] flex flex-col gap-[30px]">
					{comeMatchingRequests?.data?.length > 0 ? (
						comeMatchingRequests.data
							.slice(0, 3)
							.map((post, index) => (
								<ComeMatchingRequest
									post={post}
									index={index}
									reFetchComeMatchingRequests={reFetchComeMatchingRequests}
								/>
							))
					) : (
						<div className="text-center">나에게 온 신청 요청이 없습니다.</div>
					)}
				</div>
			</section>
			{/* 글 2개까지 보이기, 3개 이상부터는 더보기 버튼 */}
			<section className="bg-white py-[24px]">
				<div className="flex justify-between px-[25px]">
					<h1 className="heading-text">내가 올린 글</h1>
					<Link
						to="/mypage/mypost"
						className="flex items-center justify-between username whitespace-nowrap"
					>
						더보기 <img src={Next} />
					</Link>
				</div>
				<div className="pt-[24px]">
					<SelectMenuBar
						menuList={['룸메이트', '공동배달']}
						pickedMenuId={setUploadPostType}
					/>
					{uploadPostType === '룸메이트' ? (
						<div className="flex flex-col gap-[10px] px-[25px] mt-[16px]">
							{myMatchingPosts?.data?.length > 0 ? (
								myMatchingPosts.data
									.slice(0, 2)
									.map((post, index) => (
										<MyPost
											post={post}
											index={index}
											setConfirm={setConfirm}
											setConfirmContent={setConfirmContent}
											setOption={setOption}
											setOptionModalOptions={setOptionModalOptions}
										/>
									))
							) : (
								<div>내가 올린 글이 존재하지 않습니다.</div>
							)}
						</div>
					) : (
						<div className="flex justify-center items-center w-full p-6">
							<DeliveryNotification />
						</div>
					)}
				</div>
			</section>
			<section className="bg-white py-[24px] text-left">
				<div className="flex justify-between px-[25px] mb-[16px]">
					<h1 className="heading-text">내가 신청한 룸메이트</h1>
					<Link
						to="/mypage/roommate-applylist"
						className="flex items-center justify-between username whitespace-nowrap"
					>
						더보기 <img src={Next} />
					</Link>
				</div>
				<RoommateSwiperList type="my-matchingrequests" />
			</section>
			<section className="bg-white pt-[24px]">
				<div className="flex justify-between px-[25px]">
					<h1 className="heading-text">좋아요한 룸메이트</h1>
					<Link
						to="/mypage/like"
						className="flex items-center justify-between username whitespace-nowrap"
					>
						더보기 <img src={Next} />
					</Link>
				</div>
				<div className="pt-[24px]">
					<SelectMenuBar
						menuList={['룸메이트', '공동배달']}
						pickedMenuId={setLikeType}
					/>
					{likeType === '룸메이트' ? (
						<div className="likelist flex flex-col gap-[1px]">
							{likeData?.length > 0 ? (
								likeData.slice(0, 2).map((like) => <LikeItem like={like} />)
							) : (
								<div className="bg-white pt-[15px]">
									좋아하는 룸메이트가 없습니다.
									<br />
									다른 사람의 좋아요를 눌러보세요!
								</div>
							)}
						</div>
					) : (
						<div className="flex justify-center items-center w-full p-6">
							<DeliveryNotification />
						</div>
					)}
				</div>
			</section>
		</SettingStyle>
	);
};

export default MyPage;

const SettingStyle = styled.main`
	background-color: ${COLOR.gray50};
	.color-purple1 {
		color: ${COLOR.purple1};
	}
	.myname {
		font-size: ${FONT.body3M16};
	}
	.username {
		font-size: ${FONT.caption2M14};
	}
	.heading-text {
		font-size: ${FONT.title4SB17};
	}
	.small-text {
		font-size: ${FONT.caption2M14};
		color: ${COLOR.gray600};
	}
	.likelist {
		background-color: ${COLOR.gray100};
	}
`;
