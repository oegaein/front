import 'react-datepicker/dist/react-datepicker.css';
import React, { useState, forwardRef } from 'react';
import styled from 'styled-components';
import { getYear, getMonth } from 'date-fns';
import { DropdownList, DropdownWrapper } from '@common/dropdown/BasicDropdown';
import { motion } from 'framer-motion';
import Calendar from '@assets/images/common/Calendar.svg';
import Bar from '@assets/images/common/Bar.svg';
import COLOR from '@styles/color';

const startYear = 1980;
const currentYear = new Date().getFullYear();
const years = Array.from(
	{ length: currentYear - startYear + 1 },
	(_, index) => startYear + index,
);
const months = [
	'1월',
	'2월',
	'3월',
	'4월',
	'5월',
	'6월',
	'7월',
	'8월',
	'9월',
	'10월',
	'11월',
	'12월',
];

export const renderCustomDayContents = (day, date) => {
	if (date.getDay() === 0) {
		return <div style={{ color: COLOR.red }}>{day}</div>;
	}

	return day;
};

export const CustomInput = forwardRef(({ value, onClick }, ref) => (
	<>
		<DropdownWrapper className="flex pr-4" onClick={onClick} ref={ref}>
			<div className="header w-full">
				<div>{value}</div>
				<img src={Calendar} />
			</div>
		</DropdownWrapper>
	</>
));

export const CustomHeader = ({ date, changeYear, changeMonth }) => (
	<div className="flex flex-col">
		<div className="flex justify-center mb-9 pt-[10px] w-full">
			<img src={Bar} />
		</div>
		<select
			value={getYear(date)}
			onChange={({ target: { value } }) => changeYear(value)}
		>
			{years.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>

		<select
			value={months[getMonth(date)]}
			onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
		>
			{months.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	</div>
);

export const CustomContainer = ({ className, children }) => (
	<div className="">
		<div className={className}>
			<div style={{ position: 'relative' }}>{children}</div>
		</div>
	</div>
);
