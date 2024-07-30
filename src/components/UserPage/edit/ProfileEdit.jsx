import React, { useState, useEffect } from 'react';
import { Subtitle } from '@styles/basicInfo/Text';
import COLOR from '@styles/color';
import styled from 'styled-components';
import BasicDropdown from '@common/dropdown/BasicDropdown';
// import DatePickerFunc from '@utils/DatePickerFunc';
import FemailImg from '@assets/images/basicInfo/Femail.svg';
import MailImg from '@assets/images/basicInfo/Male.svg';
import FONT from '@styles/fonts';
import { NumInput } from '@components/basicInfo/BasicSettingInput';

const SIoptions = [
	'24학번',
	'23학번',
	'22학번',
	'21학번',
	'20학번',
	'19학번',
	'18학번',
	'17학번',
	'16학번',
	'15학번',
];

const ProfileEdit = ({ onGetValue, defaultValue }) => {
	const gender = [
		{ id: '여성', img: FemailImg },
		{ id: '남성', img: MailImg },
	];
	const [selectedGender, setSelectedGender] = useState(0);
	const [selectedStudentId, setSelectedStudentId] = useState(0);
	const [selectedBirth, setSelectedBirth] = useState('');

	const handleGenderChange = (index) => {
		setSelectedGender(index);
	};

	useEffect(() => {
		if (
			selectedGender !== 0 &&
			selectedStudentId !== 0 &&
			selectedBirth !== ''
		) {
			const values = {
				gender: gender[selectedGender].id,
				studentId: selectedStudentId,
				birth: selectedBirth,
			};
			onGetValue(values);
		}
	}, [selectedGender, selectedStudentId, selectedBirth]);

	const handleSelectedSI = (value) => {
		const numOnly = parseInt(value.match(/\d+/)[0]);
		setSelectedStudentId(numOnly);
	};

	return (
		<>
			<div className="w-full flex flex-col">
				<Subtitle>성별 *</Subtitle>
				<div className="flex justify-around items-center">
					{gender.map((item, index) => (
						<GenderBox
							key={index}
							checked={selectedGender === index}
							onClick={() => handleGenderChange(index)}
						>
							<label htmlFor={`gender_${index}`}>
								<input
									type="radio"
									id={`gender_${index}`}
									name="gender"
									value={item}
								/>
								<img src={item.img} alt={`${item}_img`} className="mb-3" />
								{item.id}
							</label>
						</GenderBox>
					))}
				</div>
				<Subtitle>학번 *</Subtitle>
				<BasicDropdown
					choice="학번"
					label="학번을 선택해주세요."
					options={SIoptions}
					setSelected={handleSelectedSI}
					defaultValue={`${defaultValue[1]}학번`}
				/>
				<Subtitle>생년월일 *</Subtitle>
				<NumInput
					setSelected={setSelectedBirth}
					defaultValue={defaultValue[2]}
				/>
			</div>
		</>
	);
};

export default ProfileEdit;

const GenderBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 48%;
	height: 107px;
	margin-bottom: 24px;
	padding: 9px;
	background-color: ${(props) => (props.checked ? COLOR.purple3 : COLOR.white)};
	border: ${(props) => (props.checked ? 'none' : `1px solid ${COLOR.gray100}`)};
	border-radius: 10px;
	cursor: pointer;

	input[type='radio'] {
		display: none;
	}

	label {
		font: ${FONT.body5M15};
		cursor: pointer;
		color: ${COLOR.black};
	}
`;
