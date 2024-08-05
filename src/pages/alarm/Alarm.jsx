import Header from '@common/header/Header';
import SelectMenuBar from '@common/menu/SelectMenuBar';
import FONT from '@styles/fonts';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import COLOR from '@styles/color';
import Close from '@assets/images/close.svg';
import {
	deleteAlarmAPI,
	deleteAllAlarmAPI,
	getAlarmAPI,
} from 'services/api/AlarmAPI';
import useAuthStore from '@store/authStore';
import { timeAgo } from '@utils/TimeAgo';
import { Link } from 'react-router-dom';
import DeliveryNotification from '@common/ui/item/DeliveryNotification';

const Alarm = () => {
	const setAccessToken = useAuthStore((state) => state.setAccessToken);
	const [menu, setMenu] = useState('룸메이트');
	const [data, setData] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const result = await getAlarmAPI(setAccessToken);
			setData(result);
		};
		fetchData();
	}, []);

	const DeleteAllAlarm = () => {
		const fetchData = async () => {
			const result = await deleteAllAlarmAPI();
			setData(result);
		};
		fetchData();
	};

	const DeleteAlarm = (id) => {
		const fetchData = async () => {
			const result = await deleteAlarmAPI(id);
			setData(result);
		};
		fetchData();
	};

	const AlarmMsg = (type, name) => {
		if (type === '매칭 요청') {
			return `${name}님이 룸메이트 신청을 보냈어요.`;
		} else if (type === '매칭 수락') {
			return `${name}님이 신청을 수락했습니다.`;
		} else if (type === '매칭 거부') {
			return `${name}님이 신청을 거절했습니다.`;
		} else if (type === '매칭 완료') {
			return `${name}님 과의 매칭이 완료되었습니다.`;
		}
	};

	return (
		<>
			<AlarmContainer>
				<div className="container">
					<Header
						backPath="/home"
						rightContent="전부삭제"
						rightEvent={() => {
							DeleteAllAlarm();
						}}
					>
						<p>알림</p>
					</Header>
				</div>
				<SelectMenuBar
					menuList={['룸메이트', '공동배달']}
					pickedMenuId={setMenu}
				/>
				{menu === '룸메이트' ? (
					<div>
						{data === 'undefined' || data?.length === 0 ? (
							<p className="sub mt-10">새로운 알림이 없습니다.</p>
						) : (
							data?.map((alarm, index) => (
								<div
									className="flex w-full justify-between px-6 py-4"
									key={index}
								>
									<Link
										to={`/post-detail/${alarm.matching_post_id}`}
										className="flex w-full"
									>
										<div className="mr-[10px]">
											<img
												src={alarm.photo_url}
												width={'65px'}
												height={'65px'}
												className="rounded-full"
											/>
										</div>
										<div className="flex flex-col justify-center items-start">
											<p className="title">
												{AlarmMsg(alarm.roommate_alarm_type, alarm.name)}
											</p>
											<p className="sub">{alarm.title}</p>
											<p className="time mt-1">{timeAgo(alarm.created_at)}</p>
										</div>
									</Link>
									<button
										onClick={() => {
											DeleteAlarm(alarm.roommate_alarm_id);
										}}
										className="flex items-center"
									>
										<img src={Close} alt="close button" />
									</button>
								</div>
							))
						)}
					</div>
				) : (
					<div className="flex justify-center items-center w-full h-[50vh]">
						{/* {data.length === 0 ? (
							<p className="sub mt-10">새로운 알림이 없습니다.</p>
						) : ( */}
						<DeliveryNotification />
						{/* )} */}
					</div>
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
		padding: 0px 25px;
		width: 100%;

		p {
			font: ${FONT.title3B19};
		}
	}

	.title {
		padding-right: 12px;
		text-align: start;
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
