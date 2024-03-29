import React, { useState } from 'react';
import styled from 'styled-components';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import ClockIcon from '@assets/images/common/Clock.svg';
import ArrowDownIcon from '@assets/images/common/ArrowDownIcon.svg';
import ArrowUpIcon from '@assets/images/common/ArrowUpIcon.svg';

const OpenDropdown = ({
	choiceOne,
	choiceTwo,
	label = '미선택',
	options,
	setSelected,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedTitle, setSelectedTitle] = useState('');
	const [selectedTime, setSelectedTime] = useState(null);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleSelected = (choice, value) => {
		setSelectedTime(value);
		setSelectedTitle(choice);
		setSelected(`${choice} ${value}:00`);
	};

	return (
		<>
			<DropdownWrapper option={selectedTime}>
				<div className="header" onClick={toggleDropdown}>
					<div className="flex">
						<img className="mr-2" src={ClockIcon} alt="clock" />
						<span>
							{selectedTime !== null
								? `${selectedTitle} ${selectedTime}:00`
								: label}
						</span>
					</div>
					<img src={isOpen ? ArrowUpIcon : ArrowDownIcon} />
				</div>
				{isOpen && (
					<DropdownList>
						<p>{choiceOne}</p>
						<div className="flex flex-wrap">
							{options.map((option, index) => (
								<div
									key={option}
									className="item"
									onClick={() => {
										handleSelected(choiceOne, option);
										setIsOpen(false);
									}}
								>
									{option}:00
								</div>
							))}
						</div>
						<p>{choiceTwo}</p>
						<div className="flex flex-wrap">
							{options.map((option, index) => (
								<div
									key={option}
									className="item"
									onClick={() => {
										handleSelected(choiceTwo, option);
										setIsOpen(false);
									}}
								>
									{option}:00
								</div>
							))}
						</div>
					</DropdownList>
				)}
			</DropdownWrapper>
		</>
	);
};

export default OpenDropdown;

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

export const DropdownList = styled.div`
	width: 100%;
	padding: 15px;
	background-color: ${COLOR.white};
	border-radius: 0px 0px 10px 10px;
	list-style: none;
	z-index: 10;
	overflow-y: auto;

	::-webkit-scrollbar {
		width: 0;
	}

	> p {
		margin-bottom: 16px;
		width: 100%;
		text-align: left;
		font: ${FONT.body5M15};
	}

	.item {
		display: flex;
		justify-content: center;
		width: 22%;
		margin-right: 7px;
		margin-bottom: 7px;
		padding: 7px 15px;
		font: ${FONT.body5M15};
		color: ${COLOR.black};
		border-radius: 15px;
		border: 1px solid ${COLOR.gray100};

		&:hover {
			background-color: ${COLOR.purple3};
		}
	}
`;
