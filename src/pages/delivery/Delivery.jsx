import React from 'react';
import Header from '@common/header/Header';
import Alarm from '@assets/images/common/alarm.svg';
import styled from 'styled-components';
import DeliveryNotification from '@common/ui/item/DeliveryNotification';
import { useNavigate } from 'react-router-dom';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';

const Delivery = () => {
	const navigate = useNavigate();
	return (
		<>
			<DeliveryStyle>
				<div className="header_container">
					<Header
						rightContent={Alarm}
						rightEvent={() => {
							navigate('/alarm');
						}}
					>
						<p className="header">공동배달</p>
					</Header>
				</div>
				<div className="flex justify-center items-center w-full h-[50vh]">
					<DeliveryNotification />
				</div>
			</DeliveryStyle>
		</>
	);
};

export default Delivery;

const DeliveryStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	.header_container {
		display: flex;
		padding: 0px 25px;
		width: 100%;
		border-bottom: 1px solid ${COLOR.gray100};
	}

	.header {
		font: ${FONT.title3B19};
	}
`;
