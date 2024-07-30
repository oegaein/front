import { Subtitle, UnderMsg } from '@styles/basicInfo/Text';
import COLOR from '@styles/color';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import FONT from '@styles/fonts';
import {
	BasicInput,
	EditNicknameInput,
} from '@components/basicInfo/BasicSettingInput';
import { GetDuplicate } from 'services/api/ProfileAPI';

const NicknameEdit = ({ onGetValue, defaultValue, setDisable }) => {
	const [input, setInput] = useState('');
	const [duplicated, setDuplicated] = useState(true);
	const [alertMsg, setAlertMsg] = useState('');

	const handleChangeValue = (nickname) => {
		setInput(nickname);
		setDuplicated(true);
		handleButton(nickname);
		setDisable(true);
	};

	const handleDuplicate = async () => {
		const result = await GetDuplicate(input);
		if (validateNickname(input)) {
			if (!result) {
				setDuplicated(false);
				alert('사용 가능한 닉네임입니다!');
				onGetValue('name', input);
			} else {
				setDuplicated(true);
				alert('사용 불가능한 닉네임입니다!');
			}
		}
	};

	const handleButton = (nickname) => {
		if (!validateNickname(nickname) || duplicated) {
			setDisable(true);
		} else {
			onGetValue(nickname);
			setDisable(false);
		}
	};

	const validateNickname = (nickname) => {
		const speicalCH = /[!@#$%^&*(),.?":{}|<>]/;
		const isValidLength = nickname.length >= 2 && nickname.length <= 6;

		if (speicalCH.test(nickname)) {
			setAlertMsg('특수 문자는 사용이 불가합니다.');
			return false;
		} else if (!isValidLength) {
			setAlertMsg('닉네임은 2~6자여야 합니다');
			return false;
		} else {
			setAlertMsg('');
			return true;
		}
	};

	return (
		<>
			<Subtitle>
				닉네임 <span className="red">*</span>
			</Subtitle>
			<div className="flex pb-1 mb-2 w-full">
				<EditNicknameInput
					defaultValue={defaultValue}
					onChangeValue={handleChangeValue}
					limitNum={6}
				/>
			</div>
			<div className="flex justify-between w-full items-center">
				{alertMsg === '' ? (
					<UnderMsg>특수 문자 사용 불가 / 6자 이내</UnderMsg>
				) : (
					<UnderMsg style={{ color: `${COLOR.red}` }}>{alertMsg}</UnderMsg>
				)}
				<DuplicateButton onClick={handleDuplicate}>중복확인</DuplicateButton>
			</div>
		</>
	);
};

export default NicknameEdit;

const DuplicateButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 8px 10px;
	height: 32px;
	font: ${FONT.caption2M14};
	color: ${COLOR.purple1};
	border: 1px solid ${COLOR.gray100};
	border-radius: 5px;
	cursor: pointer;
`;
