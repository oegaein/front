import BasicInfoButton from '@common/button/BasicInfoButton';
import Cleaning from '@components/basicInfo/Cleaning';
import Introduce from '@components/basicInfo/Introduce';
import Lifepattern from '@components/basicInfo/Lifepattern';
import Mbti from '@components/basicInfo/Mbti';
import Nickname from '@components/basicInfo/Nickname';
import Outing from '@components/basicInfo/Outing';
import Profile from '@components/basicInfo/Profile';
import Sleephabits from '@components/basicInfo/Sleephabits';
import Smoking from '@components/basicInfo/Smoking';
import Sound from '@components/basicInfo/Sound';
import COLOR from '@styles/color';
import React, { useState } from 'react';
import styled from 'styled-components';
import FONT from '@styles/fonts';
import SettingHeader from '@common/header/SettingHeader';
import LifeStyleLanding from './LifeStyleLanding';

const BasicInfoSetting = () => {
	const [activeButton, setActiveButton] = useState(true);
	const [count, setCount] = useState(1);
	const [info, setInfo] = useState({
		nickname: '',
		gender: '',
		studentId: 0,
		birth: '',
		introduce: '',
		mbti: '',
		sleephabits: '',
		lifepattern: '',
		smoking: null,
		cleaning: '',
		outing: '',
		sound: '',
	});

	console.log(info);

	const step = [
		{ id: 1, btn: '다음', title: '닉네임을 입력해 주세요' },
		{ id: 2, btn: '다음', title: '프로필을 완성해 주세요' },
		{ id: 3, btn: '완료', title: '나를 한 줄로 소개해 주세요' },
		{ id: 4, btn: '시작하기', title: '' },
		{ id: 5, btn: '다음', title: '나의 MBTI를 입력해 주세요' },
		{ id: 6, btn: '다음', title: '평소 수면 습관을 체크 해주세요' },
		{ id: 7, btn: '다음', title: '평소 생활 패턴을 알려주세요' },
		{ id: 8, btn: '다음', title: '흡연 여부를 선택해 주세요' },
		{ id: 9, btn: '다음', title: '평소 청소 주기를 선택해 주세요' },
		{ id: 10, btn: '다음', title: '외출을 얼마나 자주 하시나요?' },
		{ id: 11, btn: '완료', title: '소리에 예민하신 편인가요?' },
	];

	const handleBack = () => {
		setCount((prev) => prev - 1);
		setActiveButton(true);
	};

	const handleNext = () => {
		setCount((prev) => prev + 1);
		setActiveButton(true);
	};

	const handleNickname = (value) => {
		setInfo((prevInfo) => ({
			...prevInfo,
			nickname: value,
		}));
	};

	const handleProfile = (value) => {
		setInfo((prevInfo) => ({
			...prevInfo,
			gender: value.gender,
			studentId: value.studentId,
			birth: value.birth,
		}));
	};

	const handleIntroduce = (value) => {
		setInfo((prevInfo) => ({
			...prevInfo,
			introduce: value,
		}));
	};

	const handleMbti = (value) => {
		setInfo((prevInfo) => ({
			...prevInfo,
			mbti: value,
		}));
	};

	const handleSleephabits = (value) => {
		setInfo((prevInfo) => ({
			...prevInfo,
			sleephabits: value,
		}));
	};

	const handleSmoking = (value) => {
		setInfo((prevInfo) => ({
			...prevInfo,
			smoking: value,
		}));
	};

	const handleLifepattern = (value) => {
		setInfo((prevInfo) => ({
			...prevInfo,
			lifepattern: value,
		}));
	};

	const handleCleaning = (value) => {
		setInfo((prevInfo) => ({
			...prevInfo,
			cleaning: value,
		}));
	};

	const handleOuting = (value) => {
		setInfo((prevInfo) => ({
			...prevInfo,
			outing: value,
		}));
	};

	const handleSound = (value) => {
		setInfo((prevInfo) => ({
			...prevInfo,
			sound: value,
		}));
	};

	return (
		<>
			<SettingStyle>
				{count === 4 ? (
					<LifeStyleLanding />
				) : (
					<>
						{count >= 1 && count <= 3 ? (
							<SettingHeader backPath={false} eventName={handleBack} />
						) : (
							<SettingHeader
								backPath={false}
								eventName={handleBack}
								rightBtn={handleNext}
							/>
						)}
						<section className="flex flex-col items-center mb-6">
							<div className="countbox">{count}</div>
							<p className="category">
								{count >= 1 && count <= 3 ? '기본 정보' : '라이프 스타일'}
							</p>
							<p className="direction">{step[count - 1].title}</p>
						</section>
						<section className="flex flex-col items-center w-full">
							{count === 1 && (
								<Nickname
									onGetValue={handleNickname}
									setButton={setActiveButton}
								/>
							)}
							{count === 2 && (
								<Profile
									onGetValue={handleProfile}
									setButton={setActiveButton}
								/>
							)}
							{count === 3 && (
								<Introduce
									onGetValue={handleIntroduce}
									setButton={setActiveButton}
								/>
							)}
							{count === 5 && (
								<Mbti onGetValue={handleMbti} setButton={setActiveButton} />
							)}
							{count === 6 && (
								<Sleephabits
									onGetValue={handleSleephabits}
									setButton={setActiveButton}
								/>
							)}
							{count === 7 && (
								<Lifepattern
									onGetValue={handleLifepattern}
									setButton={setActiveButton}
								/>
							)}
							{count === 8 && (
								<Smoking
									onGetValue={handleSmoking}
									setButton={setActiveButton}
								/>
							)}
							{count === 9 && (
								<Cleaning
									onGetValue={handleCleaning}
									setButton={setActiveButton}
								/>
							)}
							{count === 10 && (
								<Outing onGetValue={handleOuting} setButton={setActiveButton} />
							)}
							{count === 11 && (
								<Sound onGetValue={handleSound} setButton={setActiveButton} />
							)}
						</section>
					</>
				)}
				<BasicInfoButton
					text={step[count - 1].btn}
					path={count === 11 ? '/home' : ''}
					eventName={handleNext}
					disabled={count === 4 ? false : activeButton}
				/>
			</SettingStyle>
		</>
	);
};

export default BasicInfoSetting;

const SettingStyle = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 62px 30px 45px 30px;

	.countbox {
		margin-bottom: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background-color: ${COLOR.purple2};
		font-size: 15px;
	}

	.category {
		font: ${FONT.caption1SB14};
		margin-bottom: 32px;
	}

	.direction {
		font: ${FONT.body2SB16};
	}
`;
