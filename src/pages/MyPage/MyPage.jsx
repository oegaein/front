import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMatchingPosts } from 'hooks/useMatchingPosts';
import { useNavigate } from 'react-router-dom';
import { API } from '@utils/api';
import useAuthStore from '@store/authStore';
import useMyInfoStore from '@store/myInfoStore';
import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';
import { useMutation, useQueryClient  } from '@tanstack/react-query';

//components
import Header from '@common/header/Header';
import ConfirmModal from '@common/modal/ConfirmModal';
// styles
import styled from 'styled-components';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';

// images
import Notification from '@assets/images/notification 1.svg';
import Heart from '@assets/images/heart (10) 1.svg';
import Review from '@assets/images/review 1.svg';
import Next from '@assets/images/next.svg';
import Dots from '@assets/images/dots-black.svg';
import RoommateSwiperList from '@common/RoommateSwiperList';
import LikeItem from '@components/LikePage/LikeItem';
import SelectMenuBar from '@common/menu/SelectMenuBar';
import Home from '@assets/images/home.svg'
import Setting from '@assets/images/settings.svg'
import { useQuery } from '@tanstack/react-query';
const MyPage = () => {
	const setAccessToken = useAuthStore(state => state.setAccessToken)
	const myInfo = useMyInfoStore.getState().myInfo
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

	const navigate = useNavigate()
	const [likeData, setLikeData] = useState([])
	const [uploadPostType, setUploadPostType] = useState('roommate');
	const [likeType, setLikeType] = useState('roommate');
	useEffect(()=>{
		const fetchLikeData = async () => {
			try {
				const response = await makeAuthorizedRequest('/api/v1/member/like')
				console.log('like', response.data.data)
				setLikeData(response.data.data)
			} catch(error) {
				console.error(error);
			}
		}
		fetchLikeData()
	}, [])

	return (
		<SettingStyle className="flex flex-col gap-[10px]">
			<section className="bg-white px-[25px] pb-[24px]">
				<div className=" bg-white">
          <Header backPath="/" leftContent={Home} rightContent={Setting} rightEvent={() => {
              navigate('/alarm');
            }}>
          </Header>
        </div>
				<div className="flex justify-between pt-[20px]">
					<div className="flex text-left gap-[20px]">
						<div>
							<img className="w-[45px] h-[45px] rounded-[50%]" src={myInfo?.photoUrl} />
						</div>
						<div>
							<p className="myname">{myInfo?.name}</p>
							<p className="small-text">{myInfo?.introduction}</p>
						</div>
					</div>
					<div>
						<Link to="/user/my-profile" className="color-purple1 font-caption2m14">
							프로필 보기
						</Link>
					</div>
				</div>
				<div className="small-text px-[42px] pt-[48px] flex justify-between">
					<Link
						to="/notification"
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
				<h1 className="heading-text">룸메이트 신청 요청</h1>
				<div className="pt-[16px] flex flex-col gap-[16px]">
					{comeMatchingRequests ? (
						comeMatchingRequests.data.map((post, index) => (
							<ComeMatchingRequest post={post} index={index} reFetchComeMatchingRequests={reFetchComeMatchingRequests}/>
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
						state={myMatchingPosts}
						className="flex items-center justify-between username whitespace-nowrap"
					>
						더보기 <img src={Next} />
					</Link>
				</div>
				<div className='pt-[24px]'>
					<SelectMenuBar
					menuList={['룸메이트']}
					pickedMenuId={setUploadPostType}
					/>
					<div className="px-[25px] mt-[16px]">
						{myMatchingPosts?.data?.length > 0 ? (
							myMatchingPosts.data.slice(0, 3).map((post, index) => (
								<MyMatchingRequest post={post} index={index} />
							))
						) : (
							<div>내가 올린 글이 존재하지 않습니다.</div>
						)}
						{/* <MyMatchingRequest /> */}
					</div>
				</div>
			</section>
			<section className="bg-white py-[24px] text-left">
				<div className="flex justify-between px-[25px] mb-[16px]">
					<h1 className="heading-text">내 룸메이트 신청 목록</h1>
					<Link
						to="/mypage/roommate-applylist"
						className="flex items-center justify-between username whitespace-nowrap"
					>
						더보기 <img src={Next} />
					</Link>
				</div>
				<RoommateSwiperList type="mypost" />
			</section>
			<section className="bg-white pt-[24px]">
				<div className="flex justify-between px-[25px]">
					<h1 className="heading-text">좋아요</h1>
					<Link
						to="/mypage/like"
						className="flex items-center justify-between username whitespace-nowrap"
					>
						더보기 <img src={Next} />
					</Link>
				</div>
				<div className='pt-[24px]'>
					<SelectMenuBar
					menuList={['룸메이트']}
					pickedMenuId={setLikeType}
					/>
					<div className="likelist flex flex-col gap-[1px]">
						{likeData.map((like)=> <LikeItem like={like} />)}
						
					</div>
				</div>
			</section>
		</SettingStyle>
	);
};

export default MyPage;

const ComeMatchingRequest = ({ post, index, reFetchComeMatchingRequests }) => {
	const queryClient = useQueryClient();
	const [confirm, setConfirm] = useState(false)
	const [confirmContent, setConfirmContent] = useState({});

	const acceptMutation = useMutation(
		{
			mutationFn: (id) => makeAuthorizedRequest(`/api/v1/matchingrequests/${id}/accept`, 'patch'),
			onSuccess: (data) => {
				if (data.data.matching_request_id) {
					reFetchComeMatchingRequests()
				}
				console.log('수락', data);
			},
			onError: (error) => {
				console.log(error);
			}
		}
	);
	const rejectMutation = useMutation({
		mutationFn: (id) => makeAuthorizedRequest(`/api/v1/matchingrequests/${id}/reject`, 'patch'),
		onSuccess: (data) => {
			if (data.data.matching_request_id) {
				reFetchComeMatchingRequests()
			}
			console.log('거절', data);
		},
		onError: (error) => {
			console.log(error);
		}
	});
	
	const handleClickAcceptBtn = (id) => {
		setConfirm(true)
		setConfirmContent({
			id: -1,
			msg: `${post.name}님의 요청을 수락할까요?`,
			btn: '수락',
			func: () => {acceptMutation.mutate(id)},
		})
	};
	const handleClickRejectBtn = async (id) => {
		setConfirm(true)
		setConfirmContent({
			id: -1,
			msg: `${post.name}님의 요청을 거절할까요?`,
			btn: '거절',
			func: () => {rejectMutation.mutate(id);},
		})
	};
	return (
		<div className="flex justify-between">
			{confirm && (
				<ConfirmModal
					content={confirmContent}
					isOpen={confirm}
					setIsOpen={setConfirm}
				/>
			)}
			<div className="flex gap-[20px]">
				<div>
					<img
						src={post.photoUrl}
						className="rounded-[50%] w-[45px] h-[45px]"
					/>
				</div>
				<div>
					<Link to="/user/1" className="username flex">
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
	);
};

const MyMatchingRequest = ({ post, index }) => {
	return (
		<div className="mypost px-[15px] py-[20px]">
			<div className="flex justify-between">
				<div className="flex items-center justify-between gap-[10px]">
					<span className="color-purple1 font-caption2m14">{post.dong} {post.roomSize}</span>
					<span className="font-caption3m12">모집인원 {post.targetNumberOfPeople}명</span>
				</div>
				<div className="flex gap-[14px]">
					<div className="font-caption2m14 color-gray500">11분전</div>
					<button>
						<img src={Dots} />
					</button>
				</div>
			</div>

			<div className="flex justify-between mt-[28px]">
				<div className="flex justify-between gap-[13px]">
					<div>
						<img className="rounded-[50%] w-[45px] h-[45px]" />
					</div>
					<div className="text-left overflow-hidden">
						<p className="font-caption1sb14 whitespace-nowrap overflow-hidden text-ellipsis">
							{post.title}
						</p>
						<p className="font-caption2m14">
							{post.name}{' '}
							<span className="font-caption3m12 color-gray400">{post.gender}</span>
						</p>
					</div>
				</div>
				<div className="self-end whitespace-nowrap">
					<button className="color-purple1 font-caption2m14">{post.matchingStatus}</button>
				</div>
			</div>
		</div>
	);
};

const SettingStyle = styled.main`
	background-color: ${COLOR.gray50};
	.color-purple1 {
		color: ${COLOR.purple1};
	}
	.color-gray500 {
		color: ${COLOR.gray500};
	}
	.color-gray400 {
		color: ${COLOR.gray400};
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
	.myname {
		font-size: ${FONT.body3M16};
	}
	.username {
		font-size: ${FONT.caption2M14};
	}
	.heading-text {
		font-size: ${FONT.title3SB17};
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
	.notification-title {
		flex: 1;
		font-size: ${FONT.caption2M14};
		color: ${COLOR.gray500};
		border-bottom: 2px solid ${COLOR.gray100};
		padding-bottom: 16px;
		cursor: pointer;
		&:hover {
			border-bottom: 2px solid ${COLOR.purple1};
			color: black;
		}
	}
	.selected-title {
		border-bottom: 2px solid ${COLOR.purple1};
		color: black;
	}
	.noresults {
		font-size: ${FONT.caption2M14};
		color: ${COLOR.gray500};
	}
	.mypost {
		border: 1px solid ${COLOR.gray100};
		border-radius: 10px;
	}
	.likelist {
		background-color: ${COLOR.gray100};
	}
`;
