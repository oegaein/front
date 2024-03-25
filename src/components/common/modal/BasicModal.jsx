import React from 'react';
import styled from 'styled-components';
import { DropdownBackground } from '@common/dropdown/BasicDropdown';
import COLOR from '@styles/color';

const BasicModal = ({ isOpen, setIsOpen, children }) => {
	return (
		<>
			<DropdownBackground open={isOpen} onClick={() => setIsOpen(false)} />
			<BasicModalStyle>{children}</BasicModalStyle>
		</>
	);
};

export default BasicModal;

const BasicModalStyle = styled.div`
	width: fit-content;
	height: fit-content;
	padding: 20px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: ${COLOR.white};
	border: 1px solid ${COLOR.gray200};
	border-radius: 15px;
	z-index: 10;
`;
