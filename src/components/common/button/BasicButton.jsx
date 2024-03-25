import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';

const BasicButton = ({ text, path, eventName, disabled }) => {
	const navigate = useNavigate();

	const handleClick = (e) => {
		if (disabled) {
			return;
		}

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
			<ButtonWrapper onClick={handleClick} disabled={disabled}>
				<ButtonText disabled={disabled}>{text}</ButtonText>
			</ButtonWrapper>
		</>
	);
};

export default BasicButton;

BasicButton.propTypes = {
	text: PropTypes.oneOf(['완료', '시작하기', '다음']).isRequired,
	path: PropTypes.string,
	eventName: PropTypes.func,
};

const ButtonWrapper = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 52px;
	background-color: ${(props) =>
		props.disabled ? COLOR.purple3 : COLOR.purple1};
	border-radius: 10px;
	cursor: pointer;
`;

const ButtonText = styled.span`
	font: ${FONT.buttonSB15};
	color: ${(props) => (props.disabled ? COLOR.black : COLOR.white)};
`;
