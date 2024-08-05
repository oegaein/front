import React from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import { DeliveryLottie } from '@assets/index';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';

const DeliveryNotification = () => {
	return (
		<>
			<NotificationStyle>
				<Lottie animationData={DeliveryLottie} />
				<p className="notifi_top">공동배달 서비스를 준비 중입니다...💨</p>
				<p className="notifi_bottom">빠른 시일 내로 찾아뵐게요!</p>
			</NotificationStyle>
		</>
	);
};

export default DeliveryNotification;

const NotificationStyle = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: fit-content;

	.notifi_top {
		font: ${FONT.body2SB16};
		margin-bottom: 10px;
	}

	.notifi_bottom {
		font: ${FONT.body5M15};
		color: ${COLOR.gray400};
	}
`;
