import 'styles/datepicker/DatePicker.css';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import { ConvertDate } from './ConvertDate';
import {
	CustomContainer,
	CustomHeader,
	CustomInput,
	renderCustomDayContents,
} from './DatePickerStyle';
import { getDate } from 'date-fns';

const DatePickerFunc = ({ setSelectedBirth }) => {
	const [date, setDate] = useState(null);

	return (
		<>
			<DatePicker
				placeholderText="생년월일을 선택해주세요."
				dateFormat="yyyy-MM-dd"
				selected={date}
				locale={ko}
				onChange={(date) => {
					setDate(date);
					setSelectedBirth(ConvertDate(date));
				}}
				maxDate={new Date()}
				closeOnScroll={true}
				dayClassName={(date) => (getDate(date) == 0 ? 'sunday' : undefined)}
				renderDayContents={renderCustomDayContents}
				renderCustomHeader={CustomHeader}
				calendarContainer={CustomContainer}
				customInput={<CustomInput />}
			/>
		</>
	);
};

export default DatePickerFunc;
