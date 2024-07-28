import React from 'react';
import styled from 'styled-components';
import { DropdownBackground } from '@common/dropdown/BasicDropdown';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';

const BasicModal = ({ ver = 'basic', isOpen, setIsOpen, children }) => {
	const handleClick = () => {
		setIsOpen(false);
		window.location.reload();
	};
	return (
		<>
			<DropdownBackground open={isOpen} onClick={() => setIsOpen(false)} />
			<BasicModalStyle>
				<p className="title">Error</p>
				<div className="mb-5">{children}</div>
				<button className="button" onClick={handleClick}>
					닫기
				</button>
			</BasicModalStyle>
		</>
	);
};

export default BasicModal;

const BasicModalStyle = styled.div`
	display: flex;
	flex-direction: column;
	width: 267px;
	padding: 20px 30px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: ${COLOR.white};
	border: 1px solid ${COLOR.gray200};
	border-radius: 15px;
	z-index: 60;
	text-align: start;

	.title {
		font: ${FONT.title1B23};
		color: ${COLOR.red};
		margin-bottom: 15px;
	}

	.button {
		width: 100%;
		height: 40px;
		background-color: ${COLOR.gray100};
		color: ${COLOR.black};
		border-radius: 10px;
		font: ${FONT.buttonSB15};
	}
`;
