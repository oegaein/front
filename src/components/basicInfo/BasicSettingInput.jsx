import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Input, ContainerStyle } from '@styles/basicInfo/Input';
import Xbutton from '@assets/images/common/Xbutton.svg';
import { DropdownWrapper } from '@common/dropdown/BasicDropdown';
import {
	postCommentsAPI,
	postReplyAPI,
	putCommentsAPI,
	putReplyAPI,
} from 'services/api/CommentsAPI';
import { debounce } from 'lodash';

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

	const handleClear = () => {
		setValue('');
		onChangeValue('');
	};

	return (
		<>
			<div className="flex w-full border-b border-solid border-[#DEDEDE]">
				<input
					className="w-full pl-[15px] pb-[11px] focus:outline-none"
					type="text"
					value={value}
					onChange={handleChange}
				/>
				{value !== '' && (
					<button onClick={handleClear}>
						<img src={Xbutton} alt="button" />
					</button>
				)}
			</div>
		</>
	);
};

BasicInput.propTypes = {
	onChangeValue: PropTypes.func.isRequired,
};

// edit nickname
export const EditNicknameInput = ({
	defaultValue,
	onChangeValue,
	limitNum,
}) => {
	const [value, setValue] = useState('');

	useEffect(() => {
		setValue(defaultValue || '');
	}, [defaultValue]);

	const handleChange = (e) => {
		const inputValue = e.target.value;
		if (inputValue.length <= limitNum) {
			setValue(inputValue);
			onChangeValue(inputValue);
		}
	};

	return (
		<>
			<Input type="text" value={value} onChange={handleChange} />
		</>
	);
};

//
export const NumInput = ({ setSelected, defaultValue = '' }) => {
	const [value, setValue] = useState('');

	useEffect(() => {
		if (defaultValue !== '') {
			setValue(defaultValue?.substring(0, 10));
			setSelected(defaultValue?.substring(0, 10));
		}
	}, [defaultValue]);

	const isCorrect = (val) => {
		const regex = /^\d{4}-\d{2}-\d{2}$/;
		if (!regex.test(val)) return false;

		const [year, month, day] = val.split('-').map(Number);

		if (year < 1900 || year > 2024) return false;
		if (month < 1 || month > 12) return false;

		const maxDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
			maxDays[1] = 29; // Leap year
		}

		if (day < 1 || day > maxDays[month - 1]) return false;

		return true;
	};

	const handleInputChange = (e) => {
		let val = e.target.value.replace(/\D/g, '');

		const yyyy = val.slice(0, 4);
		const mm = val.slice(4, 6);
		const dd = val.slice(6, 8);

		if (yyyy && yyyy.length >= 4) {
			val = `${yyyy}-${mm}`;
			if (mm.length === 0) {
				val = `${yyyy}`;
			}
		}
		if (mm && mm.length >= 2) {
			val = `${yyyy}-${mm}-${dd}`;
			if (dd.length === 0) {
				val = `${yyyy}-${mm}`;
			}
		}

		setValue(val);

		if (isCorrect(val)) {
			setSelected(val);
		} else {
			setSelected(null);
		}
	};

	return (
		<>
			<Input
				type="text"
				inputMode="numeric"
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
			<ContainerStyle
				onClick={() => handleClick(type)}
				checked={checked}
				width={width}
				height={height}
			>
				<label>
					<input type="radio" value={type} />
					{children}
				</label>
			</ContainerStyle>
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
export const CheckboxInput = ({
	item,
	width,
	height,
	children,
	onSelect,
	checked,
}) => {
	const handleClick = (value) => {
		onSelect(value);
	};
	return (
		<>
			<ContainerStyle
				style={{ justifyContent: 'center' }}
				onClick={() => handleClick(item)}
				checked={checked}
				width={width}
				height={height}
			>
				<input type="checkbox" />
				{children}
			</ContainerStyle>
		</>
	);
};

//
export const CommentInput = ({
	editContent,
	postId,
	setReply,
	isReply = false,
	isEdit = false,
	refetchData,
}) => {
	const [value, setValue] = useState('');

	useEffect(() => {
		if (isEdit) {
			setValue(editContent.content);
		}
	}, [editContent]);

	const handleChange = (e) => {
		const inputValue = e.target.value;
		setValue(inputValue);
	};

	const handlePost = async () => {
		if (value !== '') {
			if (isEdit) {
				if (isReply) {
					const res = await putReplyAPI(editContent.commentID, value);
					if (res.status === 200) {
						setReply(false);
						refetchData();
						setValue('');
					}
				} else {
					const res = await putCommentsAPI(editContent.commentID, value);
					if (res.status === 200) {
						refetchData();
						setValue('');
					}
				}
			} else {
				if (isReply) {
					const res = await postReplyAPI(postId, value);
					if (res.status === 201) {
						setReply(false);
						refetchData();
						setValue('');
					}
				} else {
					const res = await postCommentsAPI(postId, value);
					if (res.status === 201) {
						refetchData();
						setValue('');
					}
				}
			}
		}
	};

	// 중복 엔터 방지
	const handlePostDebounced = useCallback(debounce(handlePost, 200), [
		value,
		isReply,
	]);

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handlePostDebounced();
		}
	};

	return (
		<>
			<DropdownWrapper
				style={{
					padding: '20px 15px',
					display: 'flex',
					justifyContent: 'space-between',
					backgroundColor: 'white',
				}}
			>
				<input
					type="text"
					placeholder="댓글을 입력해주세요"
					value={value}
					onKeyDown={handleKeyPress}
					onChange={handleChange}
					className="cation2"
					style={{
						width: '80%',
						outline: 'none',
					}}
				/>
				<button
					className={value?.length >= 1 ? 'color-purple' : 'color-gray'}
					onClick={handlePost}
				>
					등록
				</button>
			</DropdownWrapper>
		</>
	);
};
