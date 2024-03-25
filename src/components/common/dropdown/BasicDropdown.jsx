import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import ArrowDownIcon from '@assets/images/common/ArrowDownIcon.svg';
import ArrowUpIcon from '@assets/images/common/ArrowUpIcon.svg';
import Bar from '@assets/images/common/Bar.svg';

const BasicDropdown = ({ choice, label = '미선택', options, setSelected }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleSelected = (value) => {
		setSelectedOption(value);
		setSelected(value);
	};

	return (
		<>
			<DropdownBackground open={isOpen} onClick={() => setIsOpen(false)} />
			<DropdownWrapper option={selectedOption}>
				<div className="header" onClick={toggleDropdown}>
					<span>{selectedOption !== '' ? `${selectedOption}` : label}</span>
					<img src={isOpen ? ArrowUpIcon : ArrowDownIcon} />
				</div>
			</DropdownWrapper>
			{isOpen && (
				<DropdownList initial={{ y: 100 }} animate={{ y: 50 }}>
					<div className="flex justify-center mb-9 w-full">
						<img src={Bar} />
					</div>
					<p>{choice}</p>
					{options.map((option, index) => (
						<div
							key={option}
							className="item"
							onClick={() => {
								handleSelected(option);
								setIsOpen(false);
							}}
						>
							{option}
						</div>
					))}
				</DropdownList>
			)}
		</>
	);
};

export default BasicDropdown;

export const DropdownBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: ${({ open }) => (open ? 'rgba(69, 76, 83, 0.5)' : 'none')};
	z-index: ${({ open }) => (open ? 9 : -1)};
`;

export const DropdownWrapper = styled.div`
	margin-bottom: 24px;
	position: relative;
	width: 100%;
	border: 1px solid ${COLOR.gray100};
	border-radius: 10px;

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14px 16px 14px 11px;
		height: 58px;
		cursor: pointer;

		> span {
			font: ${FONT.body5M15};
			color: ${({ option }) => (option !== '' ? COLOR.black : COLOR.gray400)};
		}
	}
`;

export const DropdownList = styled(motion.div)`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	max-height: 450px;
	padding: 11px 26px;
	background-color: ${COLOR.white};
	border-radius: 10px 10px 0px 0px;
	list-style: none;
	z-index: 10;
	overflow-y: auto;

	::-webkit-scrollbar {
		width: 0;
	}

	> p {
		margin-bottom: 24px;
		width: 100%;
		text-align: left;
		font: ${FONT.title1SB20};
	}

	.item {
		display: flex;
		justify-content: flex-start;
		width: 100%;
		padding: 12px 16px 12px 0;
		font: ${FONT.body5M15};
		color: ${COLOR.black};
		overflow-y: auto;

		&:hover {
			background-color: ${COLOR.purple3};
		}
	}
`;
