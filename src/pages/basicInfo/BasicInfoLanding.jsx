import React from 'react';
import styled from 'styled-components';
import backgroundImage from '@assets/images/basicInfo/basicInfoLanding.svg';
import BasicInfoButton from '@common/button/BasicInfoButton';

const BasicInfoLanding = () => {
	return (
		<>
			<GradientContainer>
				<img className="absolute left-0" src={backgroundImage} />
				<p>
					나랑 꼭 맞는 룸메이트를 찾기 위해서는
					<br />몇 가지 프로필 설정이 필요해요!
				</p>
			</GradientContainer>
			<div className="flex justify-center w-full absolute bottom-11">
				<BasicInfoButton text={'설정 하러 가기'} path={'/setting'} />
			</div>
		</>
	);
};

export default BasicInfoLanding;

const GradientContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	height: 100vh;
	background: linear-gradient(
		180deg,
		#8a7ff9 6.16%,
		#968cfb 25%,
		#a59ee9 48.26%,
		#c19de5 66.5%,
		#caa6de 80.16%,
		#d2a7d8 100%
	);

	> img {
		top: 5.2rem;
	}

	> p {
		font-size: 17px;
		margin-top: 40vh;
		text-align: center;
	}
`;
