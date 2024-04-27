import Header from '@common/header/Header';
import SelectMenuBar from '@common/menu/SelectMenuBar';
import FONT from '@styles/fonts';
import React, { useState } from 'react';
import styled from 'styled-components';
import Panda from '@assets/images/common/Panda.png';
import COLOR from '@styles/color';
import Close from '@assets/images/close.svg';

const AlarmList = [
	{
		id: 1,
		img: Panda,
		title: '차은우 님이 신청을 보냈어요',
		time: '30분 전',
		sub: '',
	},
	{
		id: 2,
		img: Panda,
		title: '고윤정 님이 신청을 보냈어요',
		time: '32분 전',
		sub: '',
	},
	{
		id: 3,
		img: Panda,
		title: '이 룸메이트 신청이 곧 마감돼요!',
		time: '33분 전',
		sub: '신긱 룸메 찾습니다!',
	},
];

const Alarm = () => {
	const [menu, setMenu] = useState('roommate');

	console.log('매뉴' + menu);
	return (
		<>
			<AlarmContainer>
				<div className="container">
					<Header
						backPath="/home"
						rightContent="전부삭제"
						rightEvent={() => {
							alert('전부 삭제');
						}}
					>
						<p>알림</p>
					</Header>
				</div>
				<SelectMenuBar
					menuList={['룸메이트', '공동배달', '기숙사소식']}
					pickedMenuId={setMenu}
				/>
				{menu === '룸메이트' ? (
					AlarmList.map((alarm, index) => (
						<div className="flex w-full justify-between px-6 py-4">
							<div className="flex">
								<div className="mr-[10px]">
									<img
										src={alarm.img}
										style={{ width: '65px', height: '65px' }}
									/>
								</div>
								<div className="flex flex-col justify-center items-start">
									<p className="title">{alarm.title}</p>
									{alarm.sub !== '' && <p className="sub">{alarm.sub}</p>}
									<p className="time">{alarm.time}</p>
								</div>
							</div>
							<button
								onClick={() => {
									alert('삭제!');
								}}
								className="flex items-center mb-5"
							>
								<img src={Close} alt="close button" />
							</button>
						</div>
					))
				) : menu === '공동배달' ? (
					AlarmList.map((alarm, index) => (
						<div className="flex w-full justify-between px-6 py-4">
							<div className="flex">
								<div className="mr-[10px]">
									<img
										src={alarm.img}
										style={{ width: '65px', height: '65px' }}
									/>
								</div>
								<div className="flex flex-col justify-center items-start">
									<p className="title">{alarm.title}</p>
									{alarm.sub !== '' && <p className="sub">{alarm.sub}</p>}
									<p className="time">{alarm.time}</p>
								</div>
							</div>
							<button className="flex items-center mb-5">x</button>
						</div>
					))
				) : menu === '기숙사소식' ? (
					AlarmList.map((alarm, index) => (
						<div className="flex w-full justify-between px-6 py-4">
							<div className="flex">
								<div className="mr-[10px]">
									<img
										src={alarm.img}
										style={{ width: '65px', height: '65px' }}
									/>
								</div>
								<div className="flex flex-col justify-center items-start">
									<p className="title">{alarm.title}</p>
									{alarm.sub !== '' && <p className="sub">{alarm.sub}</p>}
									<p className="time">{alarm.time}</p>
								</div>
							</div>
							<button className="flex items-center mb-5">x</button>
						</div>
					))
				) : (
					<div></div>
				)}
			</AlarmContainer>
		</>
	);
};

export default Alarm;

const AlarmContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	.container {
		display: flex;
		padding: 25px;
		width: 100%;

		p {
			font: ${FONT.title3SB17};
		}
	}

	.title {
		font: ${FONT.body5M15};
	}

	.sub {
		font: ${FONT.caption2M14};
		color: ${COLOR.gray500};
	}

	.time {
		font: ${FONT.caption3M12};
		color: ${COLOR.gray400};
	}
`;
