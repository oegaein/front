import React from 'react';
import FONT from '@styles/fonts';
import styled from 'styled-components';
import Alarm from '@assets/images/common/alarm.svg';
import COLOR from '@styles/color';
import { Link } from 'react-router-dom';

const Chat = () => {
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
				<div className="flex justify-between p-[25px] w-full border-b border-solid border-[#E8EBED]">
					<p className="title">채팅</p>
					<img src={Alarm} alt="alarm" />
				</div>
				<div className="flex flex-col p-[25px]">
					{chatList.map((item, index) => (
						<Link to={'/chat/chatroom'}>
							<div className="flex h-[65px] mb-[14px]">
								<div className="mr-[10px] w-[65px] h-[65px] rounded-[50%] bg-gray-100">
									<img src={item.img} width={'65px'} height={'65px'} />
								</div>
								<div className="flex flex-col justify-center w-4/5">
									<div className="flex justify-between">
										<p className="name">{item.name}</p>
										<p className="time">{item.time}</p>
									</div>
									<div className="flex justify-between">
										<p className="content">{item.content}</p>
										<div className="w-[15px] h-[15px] rounded-[50%] bg-[#8A7FF9]">
											<p className="culMsg">{item.culMsg}</p>
										</div>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</ChatStyle>
		</>
	);
};

export default Chat;

const ChatStyle = styled.div`
	padding: 41px 0px;

	.title {
		font: ${FONT.title2B19};
	}

	.name {
		font: ${FONT.body4SB15};
	}

	.time {
		font: ${FONT.caption3M12};
		color: ${COLOR.gray500};
	}

	.content {
		font: ${FONT.caption2M14};
		color: ${COLOR.gray500};
	}

	.culMsg {
		font: ${FONT.caption4M12};
		color: ${COLOR.white};
	}
`;
