import { Subtitle, UnderMsg } from '@styles/basicInfo/Text';
import { BasicInput } from './BasicSettingInput';
import COLOR from '@styles/color';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import FONT from '@styles/fonts';

const Nickname = ({ onGetValue, setButton }) => {
	const [input, setInput] = useState('');
	const [duplicated, setDuplicated] = useState(true);

	useEffect(() => {
		setDuplicated(true);
	}, [input]);

	const handleChangeValue = (nickname) => {
		setInput(nickname);
		if (!validateNickname(nickname) || duplicated) {
			setButton(true);
		} else {
			onGetValue(nickname);
			setButton(false);
		}
	};

	const handleDuplicate = () => {
		// 중복 검사해서 중복이면 true, 중복 아니면 false 반환.
		const result = true;
		if (validateNickname(input)) {
			if (result) {
				setDuplicated(false);
				alert('사용 가능한 닉네임입니다!');
				setButton(false);
			} else {
				setDuplicated(true);
				alert('사용 불가능한 닉네임입니다!');
				setButton(true);
			}
		}
	};

	return (
		<>
			<Subtitle>닉네임</Subtitle>
			<div className="flex pb-1 mb-2 w-full">
				<BasicInput onChangeValue={handleChangeValue} limitNum={8} />
			</div>
			<div className="flex justify-between w-full items-center">
				<UnderMsg>2~8자리의 문자와 숫자 / 특수 문자 사용 불가</UnderMsg>
				<DuplicateButton onClick={handleDuplicate}>중복확인</DuplicateButton>
			</div>
			<div className="h-6 mb-[368px]"></div>
		</>
	);
};

export default Nickname;

const validateNickname = (nickname) => {
	const speicalCH = /[!@#$%^&*(),.?":{}|<>]/;
	const isValidLength = nickname.length >= 2 && nickname.length <= 8;

	if (speicalCH.test(nickname) || !isValidLength) {
		return false;
	}
	return true;
};

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
