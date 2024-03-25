import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { CleanLottie } from '@assets/index';
import { RadioInput } from './BasicSettingInput';
import { Content } from './Lifepattern';

const Cleaning = ({ onGetValue, setButton }) => {
	const lists = ['매일', '주 1회 이상', '월 1회 이상', '생각날 때 가끔'];
	const [cleaning, setCleaning] = useState('');

	useEffect(() => {
		onGetValue(cleaning);
		if (cleaning !== '') {
			setButton(false);
		} else {
			setButton(true);
		}
	}, [cleaning]);

	const handleSelect = (value) => {
		setCleaning(value);
	};

	return (
		<>
			<div className="flex flex-col justify-center items-center w-full mb-9">
				<div className="w-[200px] h-[180px] mb-7">
					<Lottie animationData={CleanLottie} />
				</div>
				<div className="flex flex-col justify-between items-center w-full h-64">
					{lists.map((item, index) => (
						<RadioInput
							key={index}
							type={item}
							checked={cleaning === item}
							width="100%"
							height="53px"
							onSelect={() => handleSelect(item)}
						>
							<Content style={{ padding: '5px' }}>
								<p className="title">{item}</p>
							</Content>
						</RadioInput>
					))}
				</div>
			</div>
		</>
	);
};

export default Cleaning;
