import Header from '@common/header/Header';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useAuthStore from '@store/authStore';

import * as SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

import ExitIcon from '@assets/images/chat/Exit.svg';
import SendIcon from '@assets/images/chat/Send.svg';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';
import {
	chatSeverURL,
	deleteChatRoom,
	getChatHistory,
	getMatchingEnd,
} from 'services/api/ChatAPI';
import { ImgWrapper } from '@common/ui/Profile';
import useMyInfoStore from '@store/myInfoStore';
import ConfirmModal from '@common/modal/ConfirmModal';
import NotificationDropdown from '@common/dropdown/NotificationDropdown';

const Chatroom = () => {
	const messageEndRef = useRef(null);
	const clientRef = useRef(null);
	const accessToken = useAuthStore.getState().accessToken;
	const myId = useMyInfoStore.getState().myInfo.id;
	const navigate = useNavigate();
	const { subscribeID } = useParams();

	const [chats, setChat] = useState([]);
	const [room, setRoom] = useState({
		roomName: '',
		memberCount: 0,
		matchingPostId: -1,
		matchingStatus: '',
		memberId: -1,
	});
	const [message, setMessage] = useState('');
	const [confirm, setConfirm] = useState(false);
	const [confirmContent, setConfirmContent] = useState({});

	const connectClient = () => {
		const socket = new SockJS(`${chatSeverURL}/oegaein`);

		clientRef.current = new Client({
			webSocketFactory: () => socket,
			debug: (str) => {
				console.log(str);
			},
			connectHeaders: {
				Authorization: `Bearer ${accessToken}`,
				roomId: subscribeID,
			},
			reconnectDelay: 5000,
			heartbeatIncoming: 300000,
			heartbeatOutgoing: 300000,

			onConnect: (frame) => {
				clientRef.current.subscribe(`/topic/${subscribeID}`, (message) => {
					setChat((prevChat) => [...prevChat, JSON.parse(message.body)]);
				});
			},

			onStompError: (frame) => {
				console.error('Broker reported error: ' + frame.headers['message']);
				console.error('Additional details: ' + frame.body);
			},

			onWebSocketClose: () => {
				console.log('WebSocket connection closed');
			},
		});

		clientRef.current.activate();
	};

	const checkChat = async () => {
		const result = await getChatHistory(subscribeID);
		console.log(result);
		setRoom((prev) => ({
			...prev,
			roomName: result.roomName,
			memberCount: result.memberCount,
			matchingPostId: result.matchingPostId,
			matchingStatus: result.matchingStatus,
			memberId: result.memberId,
		}));

		setChat(result.data);
	};

	useEffect(() => {
		connectClient();
		checkChat();

		return () => {
			clientRef.current.deactivate();
		};
	}, []);

	useEffect(() => {
		if (messageEndRef.current) {
			messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
		console.log(chats);
	}, [chats]);

	const inputMessage = (e) => {
		setMessage(e.target.value);
	};

	const sendHandler = () => {
		if (clientRef.current.connected) {
			clientRef.current.publish({
				destination: '/pub/message',
				body: JSON.stringify({
					message: message,
					messageStatus: 'MESSAGE',
				}),
			});
			setMessage('');
		} else {
			console.error('STOMP connection is not active.');
		}
	};

	const onDisconnect = async () => {
		clientRef.current.deactivate();
		setConfirm(true);
		setConfirmContent((prev) => ({
			...prev,
			msg: '채팅방에서 나가시겠습니까?',
			btn: '나가기',
			func: async () => {
				const result = await deleteChatRoom(subscribeID);
				console.log(result);
				navigate('/chat');
			},
		}));
	};

	const handleRightBtn = () => {
		if (room.memberId === myId) {
			if (room.matchingStatus !== '매칭 완료') {
				setConfirm(true);
				setConfirmContent((prev) => ({
					...prev,
					msg: '매칭을 마감하시겠습니까?',
					btn: '확인',
					func: async () => {
						const res = await getMatchingEnd(room.matchingPostId);
						console.log(res);
						checkChat();
						// setRoom({ matchingStatus: '매칭 완료' });
					},
				}));
			} else {
				return;
			}
		} else {
			navigate(`/post-detail/${room.matchingPostId}`);
		}
	};

	const onEnter = (e) => {
		if (message !== '' && e.keyCode === 13) {
			sendHandler();
		}
	};

	const isMyChat = (name) => {
		return name === myId;
	};

	const prevSender = (current, prev) => {
		return current === prev;
	};

	const nextSender = (current, next) => {
		return current === next;
	};

	const getDate = (current, prev) => {
		if (!prev) return formatDate(current);
		if (current?.slice(0, 10) !== prev?.slice(0, 10))
			return formatDate(current);
		return null;
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		return `${year}년 ${month}월 ${day}일`;
	};

	return (
		<>
			{confirm && (
				<ConfirmModal
					content={confirmContent}
					isOpen={confirm}
					setIsOpen={setConfirm}
				/>
			)}
			<ChatContainer>
				<section className="headerContainer">
					<div className="px-[15px]">
						<Header
							backPath={'/chat'}
							backEvent={onDisconnect}
							rightContent={ConfirmMatching(
								room.matchingStatus,
								room.memberId === myId,
							)}
							rightEvent={() => {
								handleRightBtn();
							}}
						>
							<div className="flex justify-center">
								<p className="header mr-2">{room.roomName}</p>
								<p className="people">{room.memberCount}</p>
							</div>
						</Header>
					</div>
					<NotificationDropdown />
				</section>
				<section className="chatRoom">
					{chats.map((chat, index) => {
						const prevChat = chats[index - 1];
						const dateSeparator = getDate(
							chat.date,
							prevChat ? prevChat.date : null,
						);

						return (
							<>
								{dateSeparator && (
									<DateSeparator>{dateSeparator}</DateSeparator>
								)}
								{chat.senderId === null ? (
									<AlertStyle>
										<div className="alert_box">
											<p>{chat.message}</p>
										</div>
									</AlertStyle>
								) : (
									<ChattingStyle key={index} isMyChat={isMyChat(chat.senderId)}>
										<ImgVisible
											className={isMyChat(chat.senderId) ? 'noneDisplay' : ''}
											visible={
												index > 0 &&
												prevSender(chat.senderName, chats[index - 1].senderName)
											}
										>
											<ImgWrapper mr={'10px'} width={'50px'} height={'50px'}>
												<img
													src={chat.photoUrl}
													alt="profile"
													className="img"
												/>
											</ImgWrapper>
										</ImgVisible>
										<div className="flex flex-col">
											<div
												className={
													isMyChat(chat.senderId) ||
													(index > 0 &&
														prevSender(
															chat.senderName,
															chats[index - 1].senderName,
														))
														? 'noneDisplay '
														: 'name'
												}
											>
												{chat.senderName}
											</div>
											<div
												className={`chat ${isMyChat(chat.senderId) ? 'myChat' : 'yourChat'} ${
													index > 0 &&
													prevSender(
														chat.senderName,
														chats[index - 1].senderName,
													)
														? nextSender(
																chat.senderName,
																chats[index + 1]?.senderName,
															)
															? 'middleMsg'
															: 'endMsg'
														: ''
												}`}
											>
												{chat.message}
											</div>
										</div>
									</ChattingStyle>
								)}
							</>
						);
					})}
					<div ref={messageEndRef}></div>
				</section>
				<InputStyle>
					<div className="input_box">
						<input
							className="input"
							type="text"
							placeholder={
								room.memberCount > 1
									? '메세지 보내기...'
									: '메세지를 보낼 수 없습니다.'
							}
							onChange={inputMessage}
							onKeyDown={onEnter}
							value={message}
							disabled={room.memberCount > 1 ? false : true}
						/>
						<button
							className={message.length === 0 ? 'noneDisplay' : ''}
							onClick={sendHandler}
						>
							<img src={SendIcon} alt="send" />
						</button>
					</div>
					<button onClick={onDisconnect}>
						<img src={ExitIcon} alt="exit" />
					</button>
				</InputStyle>
				<br />
			</ChatContainer>
		</>
	);
};

export default Chatroom;

const ConfirmMatching = (status, isMyPost) => {
	return (
		<BtnStyle status={status === '매칭 완료'}>
			{isMyPost ? (
				status === '매칭 완료' ? (
					<p>매칭 마감</p>
				) : (
					<p>마감하기</p>
				)
			) : (
				<p>글 보기</p>
			)}
		</BtnStyle>
	);
};

const ChatContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	overflow: hidden;
	touch-action: none;

	.container {
		display: flex;
		padding: 25px 25px 10px 25px;
		width: 100%;
		border-bottom: 1px solid ${COLOR.gray100};
		margin-bottom: 10px;
	}
	.headerContainer {
		display: flex;
		flex-direction: column;
		padding: 10px 10px;
		width: 393px;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: ${COLOR.white};
		margin-bottom: 10px;
	}

	.header {
		font: ${FONT.title4SB17};
		max-width: 140px;
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.people {
		font: ${FONT.title4SB17};
		color: ${COLOR.gray400};
	}
	.chatRoom {
		width: 100%;
		padding: 130px 25px 0px 25px;
		overflow-y: auto;
	}
	.noneDisplay {
		display: none;
	}
`;

const ChattingStyle = styled.div`
	display: flex;
	width: 100%;
	margin-bottom: 4px;
	flex-direction: row-reverse;
	flex-direction: ${({ isMyChat }) => (isMyChat ? 'row-reverse' : 'row')};

	.name {
		display: flex;
		justify-content: flex-start;
		margin-bottom: 2px;
		font: ${FONT.caption3M12};
		color: ${COLOR.gray800};
	}

	.chat {
		position: relative;
		display: inline-block;
		min-width: 34px;
		max-width: 100%;
		padding: 12px 15px;
		font: ${FONT.body5M15};
	}

	.myChat {
		background-color: ${COLOR.purple2};
		padding-right: 15px;
		border-radius: 20px 20px 3px 20px;
	}

	.yourChat {
		background-color: ${COLOR.purple3};
		padding-left: 15px;
		border-radius: 20px 20px 20px 3px;
	}

	.middleMsg {
		border-radius: ${({ isMyChat }) =>
			isMyChat ? '20px 5px 5px 20px' : '5px 20px 20px 5px'};
	}

	.endMsg {
		border-radius: ${({ isMyChat }) =>
			isMyChat ? '20px 5px 20px 20px' : '5px 20px 20px 20px'};
	}
`;

const BtnStyle = styled.div`
	border-radius: 20px;
	padding: 8px 11px;
	background-color: ${(props) =>
		props.status ? COLOR.gray100 : COLOR.purple1};
	cursor: ${(props) => (props.status ? 'auto' : 'pointer')};

	> p {
		font: ${FONT.caption2M14};
		color: ${(props) => (props.status ? COLOR.black : COLOR.white)};
	}
`;

const InputStyle = styled.div`
	display: flex;
	justify-content: center;
	background-color: white;

	padding: 25px 25px;
	position: fixed;
	bottom: 0;
	width: 393px;

	.input_box {
		display: flex;
		justify-content: space-between;
		margin-right: 17px;
		width: 90%;
		height: 58px;
		padding: 14px;
		background-color: ${COLOR.purple2};
		border-radius: 10px;
	}

	.input {
		width: 85%;
		background-color: transparent;
	}

	.input:focus {
		outline: none;
	}
`;

const ImgVisible = styled.div`
	width: 50px;
	height: 50px;
	margin-right: 10px;
	opacity: ${({ visible }) => (visible ? 0 : 1)};
`;

const DateSeparator = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin: 20px 0px 10px 0px;
	font: ${FONT.caption2M14};
	color: ${COLOR.gray800};
`;

const AlertStyle = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	margin-bottom: 10px;

	.alert_box {
		display: flex;
		justify-content: center;
		align-items: center;
		width: fit-content;
		height: 30px;
		padding: 8px 10px;
		background-color: ${COLOR.gray50};
		border-radius: 100px;
		font: ${FONT.caption3M12};
		color: ${FONT.black};
	}
`;
