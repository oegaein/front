import Header from '@common/header/Header';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NicknameEdit from '@components/UserPage/edit/Nickname-edit';
import ProfileEdit from '@components/UserPage/edit/ProfileEdit';
import { Subtitle } from '@styles/basicInfo/Text';
import BasicDropdown from '@common/dropdown/BasicDropdown';
import IntroduceEdit from '@components/UserPage/edit/IntroduceEdit';
import { major_options, MBTI_options } from 'mocks/data/profile-setting';
import { Box } from '@pages/post/Post-detail';
import LifestyleEdit from '@components/UserPage/edit/LifestyleEdit';
import BasicButton from '@common/button/BasicButton';
import { EditProfileAPI } from 'services/api/ProfileAPI';
import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';
import useMyInfoStore from '@store/myInfoStore';

const MyProfileEdit = () => {
	const setMyInfo = useMyInfoStore((state) => state.setMyInfo);
	const [info, setInfo] = useState({
		name: '',
		gender: '',
		student_no: 0,
		birthdate: '',
		major: '',
		introduction: '',
		mbti: null,
		sleeping_habit: [],
		life_pattern: null,
		smoking: null,
		cleaning_cycle: null,
		outing: null,
		sound_sensitivity: null,
	});
	const [disable, setDisable] = useState(false);
	const [nameValid, setNameValid] = useState(true);
	const [birthValid, setBirthValid] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const response = await makeAuthorizedRequest(`/api/v1/member/my-profile`);
			setInfo(response.data);
		};
		fetchData();
	}, []);

	useEffect(() => {
		console.log(info);
		if (
			nameValid &&
			info.gender !== '' &&
			info.student_no !== 0 &&
			birthValid &&
			info.introduction !== ''
		) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	}, [info, nameValid, birthValid]);

	const handleInfo = (index, value) => {
		setInfo((prevInfo) => ({
			...prevInfo,
			[index]: value,
		}));
	};

	const handleProfile = (value) => {
		setInfo((prevInfo) => ({
			...prevInfo,
			gender: value.gender,
			student_no: value.studentId,
			birthdate: value.birth,
		}));
	};

	const handleMajor = (value) => {
		setInfo((prevInfo) => ({
			...prevInfo,
			major: value,
		}));
	};

	const handleMBTI = (value) => {
		setInfo((prevInfo) => ({
			...prevInfo,
			mbti: value,
		}));
	};

	const handleSubmit = async () => {
		const response = await EditProfileAPI(info);
		if (response.status === 200) {
			const response = await makeAuthorizedRequest(`/api/v1/member/my-profile`);
			setMyInfo(response.data);
		}
	};

	return (
		<>
			<EditProfileStyle>
				<div className="container">
					<Header backPath="/mypage" rightContent=" " rightEvent={() => {}}>
						<p>프로필 수정</p>
					</Header>
				</div>
				<div className="img">
					<img src={info.photo_url} alt="user_photo" />
				</div>
				<section className="w-full">
					<div className="w-full px-[25px]">
						<div className="nickname mb">
							<NicknameEdit
								onGetValue={handleInfo}
								defaultValue={info.name}
								setNameValid={setNameValid}
							/>
						</div>
						<div className="profile mb">
							<ProfileEdit
								onGetValue={handleProfile}
								defaultValue={[info.gender, info.student_no, info.birthdate]}
								setBirthValid={setBirthValid}
							/>
						</div>
						<div className="major mb">
							<Subtitle>
								전공 <span className="red">*</span>
							</Subtitle>
							<BasicDropdown
								choice="전공"
								label="전공을 선택해주세요."
								options={major_options}
								setSelected={handleMajor}
								defaultValue={info.major}
							/>
						</div>
						<div className="introduction mb">
							<IntroduceEdit
								onGetValue={handleInfo}
								defaultValue={info.introduction}
							/>
						</div>
					</div>
					<Box />
					<div className="w-full p-[25px]">
						<div className="mbti mb">
							<Subtitle>MBTI</Subtitle>
							<BasicDropdown
								choice="MBTI"
								label="MBTI를 선택해주세요."
								options={MBTI_options}
								setSelected={handleMBTI}
								defaultValue={info.mbti}
							/>
						</div>
						<div className="lifestyle mb">
							<Subtitle>수면 습관</Subtitle>
							<LifestyleEdit
								lists={['코골이형', '이갈이형', '잠꼬대형', '무소음형']}
								keyProp={'sleeping_habit'}
								onGetValue={handleInfo}
								defaultValue={info.sleeping_habit}
								multi={true}
							/>
							<Subtitle>생활 패턴</Subtitle>
							<LifestyleEdit
								lists={['아침형', '저녁형']}
								keyProp={'life_pattern'}
								onGetValue={handleInfo}
								defaultValue={info.life_pattern}
							/>
							<Subtitle>흡연 여부</Subtitle>
							<LifestyleEdit
								lists={['흡연', '비흡연']}
								keyProp={'smoking'}
								onGetValue={handleInfo}
								defaultValue={info.smoking}
							/>
							<Subtitle>청소 주기</Subtitle>
							<LifestyleEdit
								lists={['매일', '주 1회 이상', '월 1회 이상', '생각날 때 가끔']}
								keyProp={'cleaning_cycle'}
								onGetValue={handleInfo}
								defaultValue={info.cleaning_cycle}
							/>
							<Subtitle>외출 빈도</Subtitle>
							<LifestyleEdit
								lists={['집순이', '밖순이']}
								keyProp={'outing'}
								onGetValue={handleInfo}
								defaultValue={info.outing}
							/>
							<Subtitle>소리 민감 정도</Subtitle>
							<LifestyleEdit
								lists={['예민한 편', '둔감한 편']}
								keyProp={'sound_sensitivity'}
								onGetValue={handleInfo}
								defaultValue={info.sound_sensitivity}
							/>
						</div>
						<BasicButton
							text={'수정하기'}
							path={'/mypage'}
							eventName={handleSubmit}
							disabled={disable}
						/>
					</div>
				</section>
			</EditProfileStyle>
		</>
	);
};

export default MyProfileEdit;

const EditProfileStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;

	.container {
		display: flex;
		width: 100%;
		padding: 0px 25px;
		border-bottom: 1px solid ${COLOR.gray100};

		p {
			font: ${FONT.title4SB17};
		}
	}

	.img {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 215px;

		img {
			width: 114px;
			height: 114px;
			border-radius: 50%;
		}
	}

	.mb {
		margin-bottom: 24px;
	}
`;
