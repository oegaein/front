import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { API } from '@utils/api';
import useAuthStore from '@store/authStore';
import useLowerBarVisible from '@hooks/useLowerBarVisible';
import Next from '@assets/images/next.svg';
import Dots from '@assets/images/header-dots.svg';
import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';
//styles
import styled from 'styled-components';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';

//components
import Header from '@common/header/Header';
import ProfileImageContainer from '@components/UserPage/ProfileImageContainer';
import RoommateReviewList from '@components/UserPage/RoommateReviewList';
import UserPageInfo from '@components/UserPage/UserPageInfo';
import UserLifeStyles from '@components/UserPage/UserLifeStyles';
import useMyInfoStore from '@store/myInfoStore';
import OptionModal from '@common/modal/OptionModal';
import ConfirmModal from '@common/modal/ConfirmModal';
import MatchingApplyNavBar from '@common/MatchingApplyNavBar';
import { BlockUserAPI } from 'services/api/ProfileAPI';

const UserPage = () => {
	const location = useLocation();
	console.log(location.pathname);
	const myname = useMyInfoStore.getState().myInfo.name;
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState({});
	const [threedots, setThreedots] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [confirmContent, setConfirmContent] = useState({
		id: -1,
		msg: '',
		btn: '',
		func: () => {},
	});
	const isLowerBarVisible = useLowerBarVisible();
	let { memberId } = useParams();
	const fetchUserInfoData = async () => {
		try {
			const response = await makeAuthorizedRequest(
				`/api/v1/member/profile/${memberId}`,
			);
			setUserInfo(response.data);
			console.log('fetchUserInfoData', response.data);
		} catch (error) {
			console.error(error);
		}
	};
	const fetchMyInfoData = async () => {
		try {
			const response = await makeAuthorizedRequest(`/api/v1/member/my-profile`);
			setUserInfo(response.data);
			console.log('fetchMyInfoData', response.data);
		} catch (error) {
			console.error(error);
		}
	};
	const handleClickDotsBtn = () => {
		setThreedots(true);
	};

	const EditFunc = () => {
		navigate('/my-profile/edit');
	};

	const BlockFunc = () => {
		setConfirm(true);
		setConfirmContent((prev) => ({
			...prev,
			msg: `${userInfo.name}님을 차단할까요?`,
			btn: '차단',
			func: async () => {
				// const res = await BlockUserAPI(data.author_profile.id);
				// console.log(res);
			},
		}));
	};

	const myOptions = [
		{
			content: '수정하기',
			func: EditFunc,
		},
	];
	const yourOption = [
		{
			content: '차단하기',
			func: BlockFunc,
		},
	];

	useEffect(() => {
		if (memberId === 'my-profile') {
			fetchMyInfoData();
		} else {
			fetchUserInfoData();
		}
	}, []);

	return (
		<>
			{threedots && (
				<OptionModal
					options={userInfo.name === myname ? myOptions : yourOption}
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
			<SettingStyle>
				<div className="header px-[28px]">
					<Header
						backPath="/roommate"
						rightContent={Dots}
						rightEvent={handleClickDotsBtn}
					>
						<span className="header-text">{userInfo.name} 님의 프로필</span>
					</Header>
				</div>
				<ProfileImageContainer
					introduction={userInfo.introduction}
					profileImage={userInfo.photo_url}
				/>
				<div className="userinfolifestyles flex flex-col gap-[10px] border-b border-[#DEDEDE]">
					<div className="bg-white">
						<div className="user-info pt-[103px] pb-[24px]  px-[25px]">
							<h1 className="information-title text-left mb-[16px]">
								기본 정보
							</h1>
							<UserPageInfo userInfo={userInfo} />
						</div>
						<div className="px-[25px] py-[24px]">
							<h1 className="pb-[19px] text-left font-bold">
								성향 및 라이프 스타일
							</h1>
							<UserLifeStyles userInfo={userInfo} />
						</div>
					</div>
					<div>
						<div className="bg-white pt-[24px] px-[24px] flex justify-between items-center">
							<h1 className="roommate-review-title">받은 룸메이트 후기 2</h1>
							<Link to="reviews" className="more flex">
								더보기
								<img src={Next} alt="see more icon" />
							</Link>
						</div>
						<div className="bg-white py-[16px]">
							<RoommateReviewList memberId={memberId} />
						</div>
					</div>
				</div>
				{memberId !== 'my-profile' && (
					<MatchingApplyNavBar
						version={'userPage'}
						isLowerBarVisible={isLowerBarVisible}
						id={memberId}
						userInfo={userInfo}
						fetchUserInfoData={fetchUserInfoData}
					/>
				)}
			</SettingStyle>
		</>
	);
};

export default UserPage;

const SettingStyle = styled.div`
	background-color: white;
	.header {
		background-color: ${COLOR.purple1};
		font: ${FONT.title3B19};
	}
	.header-text {
		color: white;
	}
	.userinfolifestyles {
		background-color: ${COLOR.gray50};
	}
	.user-info {
		border-bottom: 1px solid ${COLOR.gray200};
	}
	.information-title {
		font-size: ${FONT.title4SB17};
	}
	.roommate-review-title {
		font-size: ${FONT.title4SB17};
	}
	.reset-btn {
		font-size: ${FONT.buttonSB15};
		height: 52px;
		padding: 0 22px;
		border: 1px solid ${COLOR.gray200};
		border-radius: 10px;
		&:hover {
			opacity: 0.5;
		}
	}
`;
