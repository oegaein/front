import React, { useEffect, useState } from 'react';
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
import { getChatListAPI } from 'services/api/ChatAPI';

const Chat = () => {
	const setAccessToken = useAuthStore((state) => state.setAccessToken);
	const navigate = useNavigate();
	const [menu, setMenu] = useState('룸메이트');
	const [chatList, setChatList] = useState([{}]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await getChatListAPI(setAccessToken);
			setChatList(result);
			console.log(result);
		};
		fetchData();
	}, []);

	return (
		<>
			<ChatStyle>
				<div className="flex w-full px-[25px]">
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
						{chatList === 'undefined' ? (
							<p className="mt-10">새로운 채팅이 없습니다.</p>
						) : (
							chatList?.map(
								(chat, index) => (
									// chat.last_message_content !== null && (
									<Link
										key={chat.id}
										to={`/chat/chatroom/${chat.room_id}`}
										state={{ subscribeID: chat.room_id }}
									>
										<ChatList>
											<div className="w-[65px] h-[65px] mr-[11px]">
												<ImgWrapper mr={'11px'} width={'65px'} height={'65px'}>
													<img
														src={chat.photo_url}
														alt="profile"
														className="img"
													/>
												</ImgWrapper>
											</div>
											<div className="info_wrapper">
												<div className="flex justify-between items-center mb-1">
													<div className="flex items-center">
														<p className="title">{chat.room_name}</p>
														<p className="time">{chat.member_count}</p>
													</div>
													<p className="time">
														{timeAgo(chat.last_message_date)}
													</p>
												</div>
												<div className="flex justify-between items-center">
													<p className="msg">{chat.last_message_content}</p>
													<div
														className={
															chat.un_read_message_count === 0
																? 'nonDisplay'
																: 'culBox'
														}
													>
														{chat.un_read_message_count}
													</div>
												</div>
											</div>
										</ChatList>
									</Link>
								),
								// ),
							)
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
		font: ${FONT.title4SB17};
	}

	.nonDisplay {
		display: none;
		color: white;
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
		font: ${FONT.title4SB17};
		margin-right: 7px;
		max-width: 200px;
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.time {
		font: ${FONT.caption3M12};
		color: ${COLOR.gray500};
	}

	.msg {
		font: ${FONT.caption2M14};
		color: ${COLOR.gray500};
		max-width: 220px;
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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
