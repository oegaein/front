import Header from '@common/header/Header';
import React, { useEffect, useState } from 'react';
// import './Chatting.css';
import * as SockJS from 'sockjs-client';
import Alarm from '@assets/images/common/alarm.svg';
import { useNavigate } from 'react-router-dom';
// import * as StompJs from '@stomp/stompjs';

const Chatroom = () => {
	const navigate = useNavigate();
	const [live, setLive] = useState(false);

	const [message, setMessage] = useState('');
	const [serverUrl, setServerUrl] = useState(
		'http://34.64.159.144:8080/topic/1',
	);
	const [chat, setChat] = useState([]);

	const [sockjs, setSockjs] = useState();
	const [receivedData, setReceivedData] = useState('');

	useEffect(() => {
		console.log(chat);
	}, [chat]);

	useEffect(() => {
		if (receivedData === '') return;
		setChat([...chat, { name: 'Server', message: receivedData }]);
	}, [receivedData]);

	const onClickConnectBtn = () => {
		const sock = new SockJS('http://34.64.159.144:8080/echo');
		sock.onmessage = function (e) {
			setReceivedData(e.data);
			console.log(e.data);
		};
		setSockjs(sock);
		setChat([...chat, { name: 'testUser', message: '님이 입장하셨습니다.' }]);
		setLive(true);
	};
	const onClickDisconnectBtn = () => {
		setLive(false);
	};
	const inputMessage = (e) => {
		setMessage(e.target.value);
	};
	const onEnter = (e) => {
		if (e.keyCode === 13) {
			sendMessage();
		}
	};
	const sendMessage = () => {
		if (message === '') return;
		setChat([...chat, { name: 'testUser', message: message }]);
		console.log(message);
		console.log(sockjs);
		sockjs.send(message);
		setMessage('');
	};
	const setChatServerURL = (e) => {
		setServerUrl(e.target.value);
	};
	const renderChat = () => {
		console.log(chat);
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<>
					{name}: <>{message}</>
				</>
			</div>
		));
	};
	return (
		<div className="chatting_container">
			{!live && (
				<>
					<div className="flex justify-between p-[25px] w-full border-b border-solid border-[#E8EBED] mb-10">
						<Header
							backPath={'/home'}
							rightContent={Alarm}
							rightEvent={() => {
								navigate('/alarm');
							}}
						>
							<p className="title">채팅</p>
						</Header>
					</div>
					<input
						className="chatting_urlInput w-4/5"
						type="text"
						placeholder="URL을 입력해주세요"
						onChange={setChatServerURL}
						value={serverUrl}
					/>
					<button className="chatting_connectBtn" onClick={onClickConnectBtn}>
						연결
					</button>
				</>
			)}
			{live && (
				<>
					<div className="chatting_Room">{renderChat()}</div>
					<div className="w-full fixed bottom-1">
						<input
							className="chatting_messageInput"
							type="text"
							placeholder="메세지를 입력해주세요"
							onChange={inputMessage}
							onKeyDown={onEnter}
							value={message}
						/>
						<button className="chatting_sendMessage" onClick={sendMessage}>
							전송
						</button>
					</div>
					<br />
					<button
						className="chatting_disConnectBtn"
						onClick={onClickDisconnectBtn}
					>
						연결 끊기
					</button>
				</>
			)}
		</div>
	);
};

export default Chatroom;
