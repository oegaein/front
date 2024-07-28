import React from 'react';
import { useNavigate } from 'react-router-dom';
//components
import Buttons from '@components/HomePage/Buttons';
import RoommateScrollList from '@common/RoommateScrollList';
import AddRoommateButton from '@common/button/AddRoommateButton';
import Header from '@common/header/Header';

//styles
import styled from 'styled-components';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';

import Alarm from '@assets/images/common/alarm.svg';

const BestRoommatesPage = () => {
	const navigate = useNavigate();
	return (
		<SettingStyle className="flex flex-col gap-[10px]">
			<AddRoommateButton />
			<div>
				<div className="px-[28px] bg-white">
					<Header
						backPath="/home"
						rightContent={Alarm}
						rightEvent={() => {
							navigate('/alarm');
						}}
					>
						<span className="header">베스트 룸메이트</span>
					</Header>
				</div>
				<div className="p-[25px] bg-white">
					<Buttons />
				</div>
			</div>
			<RoommateScrollList type="best" />
		</SettingStyle>
	);
};

export default BestRoommatesPage;

const SettingStyle = styled.div`
	background-color: ${COLOR.gray50};
	.header {
		font: ${FONT.title3B19};
	}
`;
