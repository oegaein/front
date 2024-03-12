import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, RadioContainerStyle } from '@styles/basicInfo/Input';

//
export const BasicInput = ({ onChangeValue, limitNum }) => {
	const [value, setValue] = useState('');

	const handleChange = (e) => {
		const inputValue = e.target.value;
		if (inputValue.length <= limitNum) {
			setValue(inputValue);
			onChangeValue(inputValue);
		}
	};

	return (
		<>
			<input
				className="w-full pl-[15px] pb-[11px] border-b border-solid border-[#DEDEDE] focus:outline-none"
				type="text"
				value={value}
				onChange={handleChange}
			/>
		</>
	);
};

BasicInput.propTypes = {
	onChangeValue: PropTypes.func.isRequired,
};

//
export const NumInput = ({ setSelectedBirth }) => {
	const [value, setValue] = useState('');

	const handleInputChange = (e) => {
		const regex = /^\d{4}-\d{2}-\d{2}$/;
		let val = e.target.value.replace(/\D/g, '');

		const yyyy = val.slice(0, 4);
		const mm = val.slice(4, 6);
		const dd = val.slice(6, 8);

		if (yyyy && yyyy.length >= 4) {
			val = `${yyyy}-${mm}`;
		}
		if (mm && mm.length >= 2) {
			val = `${yyyy}-${mm}-${dd}`;
		}

		setValue(val);

		if (regex.test(val)) {
			setSelectedBirth(val);
		} else {
			setSelectedBirth(null);
		}
	};

	return (
		<>
			<Input
				type="text"
				placeholder="YYYY-MM-DD"
				value={value}
				onChange={handleInputChange}
			/>
		</>
	);
};

//
export const RadioInput = ({
	type,
	checked,
	width,
	height,
	children,
	onSelect,
}) => {
	const handleClick = (value) => {
		onSelect(value);
	};

	return (
		<>
			<RadioContainerStyle
				onClick={() => handleClick(type)}
				checked={checked}
				width={width}
				height={height}
			>
				<label>
					<input type="radio" value={type} />
					{children}
				</label>
			</RadioContainerStyle>
		</>
	);
};

RadioInput.propTypes = {
	width: PropTypes.string.isRequired,
	height: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	onSelect: PropTypes.func.isRequired,
};

//
export const CheckboxInput = () => {
	return (
		<>
			<div>CheckboxInput</div>
		</>
	);
};
