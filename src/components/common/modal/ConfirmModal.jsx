import React, { useEffect } from 'react';
import { DropdownBackground } from '@common/dropdown/BasicDropdown';
import styled from 'styled-components';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import BasicButton from '@common/button/BasicButton';

const ConfirmModal = ({ content, isOpen, setIsOpen }) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isOpen]);

	return (
		<>
			<DropdownBackground open={isOpen} onClick={() => setIsOpen(false)} />
			<ModalWrapper>
				<p>{content.msg}</p>
				<div className="flex justify-between w-full">
					<BasicButton
						text="취소"
						eventName={() => setIsOpen(false)}
						color="gray"
						size="48%"
					/>
					<BasicButton
						text={content.btn}
						eventName={() => {
							setIsOpen(false);
							alert('야호');
						}}
						size="48%"
					/>
				</div>
			</ModalWrapper>
		</>
	);
};

export default ConfirmModal;

const ModalWrapper = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 63%;
	padding: 20px 11px 13px 11px;
	background-color: ${COLOR.white};
	border-radius: 10px;
	z-index: 51;

	> p {
		font: ${FONT.body5M15};
		display: flex;
		align-items: center;
		margin-bottom: 13px;
		height: 43px;
		text-align: center;
	}
`;
