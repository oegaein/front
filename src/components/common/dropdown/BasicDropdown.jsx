import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import ArrowDownIcon from '@assets/images/common/ArrowDownIcon.svg';
import ArrowUpIcon from '@assets/images/common/ArrowUpIcon.svg';
import Bar from '@assets/images/common/Bar.svg';
import { useLocation } from 'react-router-dom';

const BasicDropdown = ({
	choice,
	label = '미선택',
	options,
	setSelected,
	defaultValue,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');

	useEffect(() => {
		if (
			defaultValue &&
			(defaultValue !== null || defaultValue !== '' || defaultValue !== 0)
		) {
			setSelectedOption(defaultValue);
		}
	}, [defaultValue]);

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
					<img src={isOpen ? ArrowUpIcon : ArrowDownIcon} alt="arrowIcon" />
				</div>
			</DropdownWrapper>
			{isOpen && (
				<DropdownList initial={{ y: 100 }} animate={{ y: 0 }}>
					<div className="flex flex-col w-full sticky top-0 bg-white">
						<div className="flex justify-center mb-9 w-full">
							<img src={Bar} alt="barIcon" />
						</div>
						<p>{choice}</p>
					</div>
					<ListLayout>
						{options.map((option, index) => (
							<span
								key={option}
								className="item"
								onClick={() => {
									handleSelected(option);
									setIsOpen(false);
								}}
							>
								{option}
							</span>
						))}
					</ListLayout>
				</DropdownList>
			)}
		</>
	);
};

export default BasicDropdown;

function ListLayout({ children }) {
	const location = useLocation();
	return (
		<>
			{location.pathname === '/setting' ||
			location.pathname?.substring(0, 11) === '/my-profile' ? (
				<div className="w-full h-[233px] overflow-auto">{children}</div>
			) : (
				<div className="w-full overflow-auto">{children}</div>
			)}
		</>
	);
}

export const DropdownBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: ${({ open }) => (open ? 'rgba(69, 76, 83, 0.5)' : 'none')};
	z-index: ${({ open }) => (open ? 51 : -1)};
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
	position: fixed;
	width: 393px;
	bottom: 0px;
	left: calc(50% - 197px);
	max-height: 450px;
	padding: 11px 26px;
	background-color: ${COLOR.white};
	border-radius: 10px 10px 0px 0px;
	list-style: none;
	z-index: 60;
	overflow-y: auto;

	/* Hide scrollbar for WebKit browsers */
	::-webkit-scrollbar {
		width: 0;
		height: 0;
	}

	/* Hide scrollbar for IE, Edge, and Firefox */
	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* IE and Edge */

	p {
		margin-bottom: 24px;
		width: 100%;
		text-align: left;
		font: ${FONT.title2SB21};
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
