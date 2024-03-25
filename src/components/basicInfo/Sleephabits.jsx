import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { SleephabitsLottie } from '@assets/index';
import { CheckboxInput } from './BasicSettingInput';

const Sleephabits = ({ onGetValue, setButton }) => {
	const lists = ['코골이형', '이갈이형', '잠꼬대형', '무소음형'];
	const [sleephabits, setSleephabits] = useState([]);

	useEffect(() => {
		onGetValue(sleephabits);
		if (sleephabits.length >= 1) {
			setButton(false);
		} else {
			setButton(true);
		}
	}, [sleephabits]);

	const handleCheckboxChange = (value) => {
		const isSelected = sleephabits.includes(value);
		if (isSelected) {
			setSleephabits(sleephabits.filter((item) => item !== value));
		} else {
			setSleephabits([...sleephabits, value]);
		}
	};

	return (
		<>
			<div className="flex flex-col justify-center items-center w-full mb-7">
				<div className="w-[188px] h-[186px] mb-6">
					<Lottie animationData={SleephabitsLottie} />
				</div>
				{lists.map((item, index) => (
					<div key={index} className="w-full mb-[14px]">
						<CheckboxInput
							item={item}
							width={'100%'}
							height={'53px'}
							onSelect={() => handleCheckboxChange(item)}
							checked={sleephabits.includes(item)}
						>
							<p>{item}</p>
						</CheckboxInput>
					</div>
				))}
			</div>
		</>
	);
};

export default Sleephabits;
