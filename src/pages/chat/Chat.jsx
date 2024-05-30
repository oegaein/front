import React, { useState } from 'react';
import FONT from '@styles/fonts';
import styled from 'styled-components';
import Alarm from '@assets/images/common/alarm.svg';
import COLOR from '@styles/color';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@common/header/Header';
import useAuthStore from '@store/authStore';
import SelectMenuBar from '@common/menu/SelectMenuBar';
import { timeAgo } from '@utils/TimeAgo';
import { ImgWrapper } from '@common/ui/Profile';

const Chat = () => {
	const setAccessToken = useAuthStore((state) => state.setAccessToken);
	const navigate = useNavigate();
	const [menu, setMenu] = useState('룸메이트');

	const chatList = [
		{
			id: 1,
			img: Alarm,
			name: '차은우',
			content: '괜찮으시면 저랑 룸메해요!',
			time: '21:05',
			culMsg: 2,
		},
		{
			id: 2,
			img: Alarm,
			name: '김예은',
			content: '괜찮으시면 저랑 어찌구!',
			time: '20:05',
			culMsg: 1,
		},
	];
	return (
		<>
			<ChatStyle>
				<div className="container">
					<Header
						backPath={'/home'}
						rightContent={Alarm}
						rightEvent={() => {
							navigate('/alarm');
						}}
					>
						<p className="header">채팅</p>
					</Header>
				</div>
				<SelectMenuBar
					menuList={['룸메이트', '공동배달']}
					pickedMenuId={setMenu}
				/>
				{menu === '룸메이트' ? (
					<div className="container flex flex-col">
						{chatList.length === 0 ? (
							<p className="mt-10">새로운 채팅이 없습니다.</p>
						) : (
							chatList?.map((chat, index) => (
								<Link key={index} to={'/chat/chatroom'}>
									<ChatList>
										<div className="w-[65px] h-[65px] mr-[11px]">
											<ImgWrapper mr={'11px'} width={'65px'} height={'65px'}>
												<img src={chat.img} alt="profile" className="img" />
											</ImgWrapper>
										</div>
										<div className="info_wrapper">
											<div className="flex justify-between items-center mb-1">
												<div className="flex items-center">
													<p className="title">{chat.name}</p>
													<p className="time">{chat.culMsg}</p>
												</div>
												<p className="time">{timeAgo(chat.time)}</p>
											</div>
											<div className="flex justify-between items-center">
												<p className="msg">{chat.content}</p>
												<div className="culBox">{chat.culMsg}</div>
											</div>
										</div>
									</ChatList>
								</Link>
							))
						)}
					</div>
				) : (
					<div></div>
				)}
			</ChatStyle>
		</>
	);
};

export default Chat;

const ChatStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	.container {
		display: flex;
		padding: 25px;
		width: 100%;
	}

	.header {
		font: ${FONT.title3SB17};
	}
`;

const ChatList = styled.div`
	display: flex;
	width: 100%;
	justify-content: start;
	margin-bottom: 16px;

	.info_wrapper {
		display: flex;
		flex-direction: column;
		padding-top: 7px;
		width: 90%;
	}

	.title {
		font: ${FONT.title3SB17};
		margin-right: 7px;
	}

	.time {
		font: ${FONT.caption3M12};
		color: ${COLOR.gray500};
	}

	.msg {
		font: ${FONT.caption2M14};
		color: ${COLOR.gray500};
	}

	.culBox {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color: ${COLOR.purple1};
		font: ${FONT.caption4M12};
		color: ${COLOR.white};
	}
`;
