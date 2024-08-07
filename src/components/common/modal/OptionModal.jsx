import React, { useEffect } from 'react';
import styled from 'styled-components';
import { DropdownBackground } from '@common/dropdown/BasicDropdown';
import { motion } from 'framer-motion';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';

const OptionModal = ({ options, isOpen, setIsOpen }) => {
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

	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<>
			<DropdownBackground open={isOpen} onClick={closeModal} />
			<Motion initial={{ y: 100 }} animate={{ y: 0 }}>
				<ModalWrapper style={{ marginBottom: '10px' }}>
					{options.map((option, index) => (
						<>
							<List
								key={option.content}
								onClick={() => {
									option.func();
									closeModal();
								}}
								color={option.content}
							>
								<p>{option.content}</p>
							</List>
						</>
					))}
				</ModalWrapper>
				<ModalWrapper>
					<List onClick={closeModal}>취소하기</List>
				</ModalWrapper>
			</Motion>
		</>
	);
};

export default OptionModal;

const Motion = styled(motion.div)`
	display: flex;
	flex-direction: column;
	position: fixed;
	width: 393px;
	bottom: 20px;
	left: calc(50% - 177px);
	z-index: 52;
`;

const ModalWrapper = styled.div`
	width: 90%;
	max-height: 450px;
	background-color: ${COLOR.white};
	border-radius: 10px;
	list-style: none;
	overflow-y: auto;

	::-webkit-scrollbar {
		width: 0;
	}
`;

const List = styled.div`
	display: flex;
	justify-content: center;
	padding: 20px 0px;
	width: 100%;
	border-bottom: 1px solid ${COLOR.gray100};
	font: ${FONT.body5M15};
	color: ${COLOR.black};
	overflow-y: auto;

	&:last-child {
		border-bottom: none;
	}

	&:hover {
		background-color: ${COLOR.purple3};
	}

	> p {
		font: ${FONT.body5M15};
		color: ${({ color }) =>
			color === '삭제하기' || color === '차단하기' ? COLOR.red : COLOR.black};
	}
`;
