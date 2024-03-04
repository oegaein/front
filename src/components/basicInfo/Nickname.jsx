import { Subtitle } from '@styles/basicInfo/Text';
import { BasicInput } from './BasicSettingInput';
import COLOR from '@styles/color';
import styled from 'styled-components';
import { useState } from 'react';

const Nickname = ({ onGetValue }) => {
	const handleChangeValue = (nickname) => {
		if (nickname.length < 2 || nickname.length > 10) {
			// 글자수 만족하지 않으면
			console.log('글자 수 이상있음.');
		} else if (!handleDuplicate(nickname)) {
			// 중복이라면
			console.log('중복입니다.');
		} else {
			onGetValue(nickname);
		}
	};

	const handleDuplicate = (value) => {
		// 중복 검사해서 중복이면 false, 중복 아니면 true 반환.
		return true;
	};

	return (
		<>
			<Subtitle>닉네임</Subtitle>
			<div className="flex pb-1 mb-3 w-full">
				<BasicInput onChangeValue={handleChangeValue} limitNum={10} />
				{/* <DuplicateButton onClick={() => {}}>중복확인</DuplicateButton> */}
			</div>
			<div className="h-6 mb-[400px]"></div>
		</>
	);
};

export default Nickname;

const DuplicateButton = styled.button`
	width: 66px;
	height: 32px;
	font-size: 11px;
	background-color: ${COLOR.purpleEB};
	border-radius: 20px;
	cursor: pointer;
`;
