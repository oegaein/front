import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import COLOR from '@styles/color';

const BasicInfoButton = ({ text, path, eventName }) => {
	const navigate = useNavigate();

	const handleClick = (e) => {
		if (eventName) {
			eventName(e);
		}

		if (path) {
			if (/^https:/.test(path)) {
				window.location.href = path;
			} else {
				navigate(path);
			}
		}
	};

	return (
		<>
			<ButtonWrapper onClick={handleClick} text={text}>
				<ButtonText text={text}>{text}</ButtonText>
			</ButtonWrapper>
		</>
	);
};

export default BasicInfoButton;

BasicInfoButton.propTypes = {
	text: PropTypes.oneOf(['설정 하러 가기', '설정 완료', '알려주고 싶지 않아요'])
		.isRequired,
	path: PropTypes.string,
	eventName: PropTypes.func,
};

const ButtonWrapper = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 12px 40px;
	height: 40px;
	background-color: ${COLOR.purpleEB};
	border-radius: 50px;
	cursor: pointer;
`;

const ButtonText = styled.span`
	font-size: 14px;
`;
