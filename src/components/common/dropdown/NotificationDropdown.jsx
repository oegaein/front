import { useEffect, useState } from 'react';
import styled from 'styled-components';
import NotificationIcon from '@assets/images/common/Notification.svg';
import LineArrowDown from '@assets/images/common/LineArrowDown.svg';
import FONT from '@styles/fonts';

const NotificationDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isOpen]);

	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<>
			<NotificationDropdownStyle>
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center">
						<img
							src={NotificationIcon}
							alt="Notification"
							style={{ marginRight: '10px' }}
						/>
						<p className="noti_title">채팅방 이용 전 필수로 읽어주세요!</p>
					</div>
					<button onClick={toggleDropdown}>
						<img src={LineArrowDown} alt="더 보기" />
					</button>
				</div>
				{isOpen && (
					<ContentStyle>
						<p>1️⃣ 채팅 메세지는 최신순으로 100개까지만 보여집니다.</p>
						<p>
							2️⃣ 최종 결정 후 오른쪽 상단에 있는 '마감하기' 버튼을 눌러 매칭을
							확정해주세요!
						</p>
					</ContentStyle>
				)}
			</NotificationDropdownStyle>
		</>
	);
};

export default NotificationDropdown;

const NotificationDropdownStyle = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 15px 25px;
	border-radius: 10px;
	background-color: white;
	box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.05);

	.noti_title {
		font: ${FONT.body5M15};
		font-weight: 500;
	}
`;

const ContentStyle = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 20px;
	width: 100%;
	background-color: white;
	text-align: left;
	font: ${FONT.caption2M14};
`;
