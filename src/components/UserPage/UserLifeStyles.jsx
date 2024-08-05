import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

//styles
import styled from 'styled-components';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';

//images
import Mbti from '@assets/images/mbti.svg';
import SpeechBubble from '@assets/images/speech-bubble.svg';
import Morning from '@assets/images/morning.svg';
import Clean from '@assets/images/household.svg';
import House from '@assets/images/house.svg';
import Ear from '@assets/images/ear.svg';
import NotSmoking from '@assets/images/basicInfo/NotSmoking.svg';
//components

const UserLifeStyles = ({ userInfo }) => {
	const location = useLocation();
	const path = location.pathname;
	return (
		<SettingStyle>
			<div>
				<div className="grid grid-cols-4 gap-[35px] mb-[35px]">
					{userInfo.mbti && (
						<div className="flex flex-col items-center gap-[9px]">
							<div className="flex items-center h-[44px]">
								<img src={Mbti} />
							</div>
							<span className="text-[13px]">{userInfo.mbti}</span>
						</div>
					)}
					{userInfo.life_pattern && (
						<div className="flex flex-col items-center gap-[9px]">
							<div className="flex items-center h-[44px]">
								<img src={Morning} />
							</div>
							<span className="text-[13px]">{userInfo.life_pattern}</span>
						</div>
					)}
					{userInfo.smoking && (
						<div className="flex flex-col items-center gap-[9px]">
							<div className="flex items-center h-[44px]">
								<img src={NotSmoking} className="h-[44px]" />
							</div>
							<span className="text-[13px]">{userInfo.smoking}</span>
						</div>
					)}
					{userInfo.cleaning_cycle && (
						<div className="flex flex-col items-center gap-[9px]">
							<div className="flex items-center h-[44px]">
								<img src={Clean} />
							</div>
							<span className="text-[13px]">
								{userInfo.cleaning_cycle} 청소
							</span>
						</div>
					)}
					{userInfo.outing && (
						<div className="flex flex-col items-center gap-[9px]">
							<div className="flex items-center h-[44px]">
								<img src={House} />
							</div>
							<span className="text-[13px]">{userInfo.outing}</span>
						</div>
					)}
					{userInfo.sound_sensitivity && (
						<div className="flex flex-col items-center gap-[9px]">
							<div className="flex items-center h-[44px]">
								<img src={Ear} />
							</div>
							<span className="text-[13px]">{userInfo.sound_sensitivity}</span>
						</div>
					)}
					{userInfo.sleeping_habit && userInfo.sleeping_habit[0] && (
						<div className="flex flex-col items-center gap-[9px]">
							<div className="flex items-center h-[44px]">
								<img src={SpeechBubble} />
							</div>
							<div className="flex flex-col gap-[2px]">
								{userInfo.sleeping_habit.map((habit, index) => (
									<span key={index} className="text-[13px]">
										{habit}
									</span>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</SettingStyle>
	);
};

export default UserLifeStyles;

const SettingStyle = styled.div`
	.user-info-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.user-info-card {
		width: calc(25% - 20px);
		margin-bottom: 20px;
	}
`;
