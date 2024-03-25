import Lottie from 'lottie-react';
import { LifeStyleLandingLottie } from '@assets/index';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import React from 'react';
import styled from 'styled-components';
import LifeStyleLandingImg from '@assets/images/basicInfo/LifeStyleLanading.svg';

const LifeStyleLanding = () => {
	return (
		<>
			<Container>
				<p className="header">나의 라이프 스타일을 알려주세요</p>
				<p className="desc">
					라이프스타일 설정을 하면
					<br />
					나와 잘 맞는 룸메를 찾을 확률이 올라가요!
				</p>
				<img src={LifeStyleLandingImg} />
				<Lottie animationData={LifeStyleLandingLottie} />
				<div className="w-full h-[40px]"></div>
			</Container>
		</>
	);
};

export default LifeStyleLanding;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	padding: 63px 0px;
	width: 100%;

	.header {
		margin-bottom: 30px;
		font: ${FONT.title2B19};
		text-align: left;
	}

	.desc {
		margin-bottom: 103px;
		font: ${FONT.caption2M14};
		color: ${COLOR.gray500};
		text-align: left;
	}
`;
