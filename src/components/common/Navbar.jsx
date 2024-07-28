import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
//styles
import styled from 'styled-components';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
//images
import ChatIcon from '../../assets/images/chat.svg';
import ChatIconClicked from '../../assets/images/chat-icon-clicked.svg';
import RoommateIcon from '../../assets/images/roommateIcon.svg';
import RoommateIconClicked from '../../assets/images/roommate-icon-clicked.svg';
import HomeIcon from '../../assets/images/home-icon.svg';
import HomeIconClicked from '../../assets/images/home-icon-clicked.svg';
import DeliveryIcon from '../../assets/images/motorbike-icon.svg';
import DeliveryIconClicked from '../../assets/images/delivery-icon-clicked.svg';
import MypageIcon from '../../assets/images/user-icon.svg';
import MypageIconClicked from '../../assets/images/user-icon-clicked.svg';
import { getChattingCountAPI } from 'services/api/ChatAPI';
import useInterval from '@utils/useInterval';
import useAuthStore from '@store/authStore';

const Navbar = () => {
	const setAccessToken = useAuthStore((state) => state.setAccessToken);
	const location = useLocation();
	const [chatCount, setChatCount] = useState(0);

	useInterval(async () => {
		const res = await getChattingCountAPI(setAccessToken);
		setChatCount(res);
	}, 10000);

	return (
		<SettingStyle className="flex fixed z-50 bottom-0 max-w-[393px] justify-around items-center h-[76px] bg-white w-full">
			<Link to="/chat" className="flex flex-col items-center">
				<div className="mb-[4.5px] relative">
					<img
						className="w-[26px] h-[26px]"
						src={location.pathname === '/chat' ? ChatIconClicked : ChatIcon}
						alt="채팅 페이지로 가기"
					/>
					{chatCount > 0 ? (
						<div className="chatting-counts absolute top-[-3px] left-[17px] rounded-[10px] px-[5px]">
							{chatCount}
						</div>
					) : null}
				</div>
				<span className={location.pathname === '/chat' ? 'purple' : undefined}>
					채팅
				</span>
			</Link>
			<Link to="/roommate" className="flex flex-col items-center">
				<div className="mb-[4.5px]">
					<img
						className="w-[26px] h-[26px]"
						src={
							location.pathname.substring(0, 9) === '/roommate'
								? RoommateIconClicked
								: RoommateIcon
						}
						alt="룸메이트 페이지로 가기"
					/>
				</div>
				<span
					className={
						location.pathname.substring(0, 9) === '/roommate'
							? 'purple'
							: undefined
					}
				>
					룸메이트
				</span>
			</Link>
			<Link to="/home" className="flex flex-col items-center">
				<div className="mb-[4.5px]">
					<img
						className="w-[26px] h-[26px]"
						src={
							location.pathname.substring(0, 5) === '/home'
								? HomeIconClicked
								: HomeIcon
						}
						alt="홈으로 가기"
					/>
				</div>
				<span
					className={
						location.pathname.substring(0, 5) === '/home' ? 'purple' : undefined
					}
				>
					홈
				</span>
			</Link>
			<Link className="flex flex-col items-center">
				<div className="mb-[4.5px]">
					<img
						className="w-[26px] h-[26px]"
						src={
							location.pathname === '/delivery'
								? DeliveryIconClicked
								: DeliveryIcon
						}
						alt="공동배달 페이지로 가기"
					/>
				</div>
				<span
					className={location.pathname === '/delivery' ? 'purple' : undefined}
				>
					공동배달
				</span>
			</Link>
			<Link to="/mypage" className="flex flex-col items-center">
				<div className="mb-[4.5px]">
					<img
						className="w-[26px] h-[26px]"
						src={
							location.pathname.substring(0, 7) === '/mypage'
								? MypageIconClicked
								: MypageIcon
						}
						alt="마이페이지로 가기"
					/>
				</div>
				<span
					className={
						location.pathname.substring(0, 7) === '/mypage'
							? 'purple'
							: undefined
					}
				>
					마이페이지
				</span>
			</Link>
		</SettingStyle>
	);
};

export default Navbar;

const SettingStyle = styled.div`
	font-size: ${FONT.caption4M12};
	border: 1px solid ${COLOR.gray100};
	.purple {
		color: ${COLOR.purple1};
	}
	.chatting-counts {
		font-size: ${FONT.caption4M12};
		font-size: 9px;
		color: white;
		background-color: ${COLOR.purple1};
	}
`;
