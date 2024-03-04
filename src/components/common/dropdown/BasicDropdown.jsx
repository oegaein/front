import React, { useState } from 'react';
import styled from 'styled-components';
import COLOR from '@styles/color';
import ArrowDownIcon from '@assets/images/common/ArrowDownIcon.svg';
import ArrowUpIcon from '@assets/images/common/ArrowUpIcon.svg';

const BasicDropdown = ({ label = '미선택', options, setSelected }) => {
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
			<DropdownWrapper>
				<div className="header" onClick={toggleDropdown}>
					<span>{selectedOption !== '' ? `${selectedOption}` : label}</span>
					<img src={isOpen ? ArrowUpIcon : ArrowDownIcon} />
				</div>
				{isOpen && (
					<DropdownList>
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
			</DropdownWrapper>
		</>
	);
};

export default BasicDropdown;

const DropdownWrapper = styled.div`
	margin-bottom: 28px;
	position: relative;
	width: 100%;
	border: 1px solid ${COLOR.grayED};
	border-radius: 10px;

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14px 16px 14px 11px;
		height: 42px;
		cursor: pointer;

		> span {
			font-size: 12px;
			color: ${COLOR.gray70};
		}
	}
`;

const DropdownList = styled.div`
	position: absolute;
	top: 102%;
	left: 0;
	width: 100%;
	max-height: 175px;
	overflow-y: auto;
	padding: 5px 0;
	background-color: white;
	border: 1px solid ${COLOR.grayED};
	border-radius: 10px;
	list-style: none;
	z-index: 10;

	.item {
		display: flex;
		justify-content: flex-start;
		width: 100%;
		padding: 10px 16px 10px 11px;
		font-size: 12px;
		color: ${COLOR.black};

		&:hover {
			background-color: ${COLOR.purpleF2};
		}
	}
`;
