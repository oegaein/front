import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { SoundLottie } from '@assets/index';
import YesSign from '@assets/images/basicInfo/YesSign.svg';
import NoSign from '@assets/images/basicInfo/NoSign.svg';
import { RadioInput } from './BasicSettingInput';
import { Content } from './Lifepattern';

const Sound = ({ onGetValue, setButton }) => {
	const lists = [
		{
			id: 1,
			img: YesSign,
			title: '예민한 편',
		},
		{
			id: 2,
			img: NoSign,
			title: '둔감한 편',
		},
	];
	const [sound, setSound] = useState('');

	useEffect(() => {
		onGetValue(sound);
		if (sound !== '') {
			setButton(false);
		} else {
			setButton(true);
		}
	}, [sound]);

	const handleSelect = (value) => {
		setSound(value);
	};
	return (
		<>
			<div className="flex flex-col justify-center items-center w-full mb-9">
				<div className="w-[190px] h-[180px] mb-7">
					<Lottie animationData={SoundLottie} />
				</div>
				<div className="flex justify-between w-full">
					{lists.map((item, index) => (
						<RadioInput
							key={index}
							type={item.title}
							checked={sound === item.title}
							width="48%"
							height="254px"
							onSelect={() => handleSelect(item.title)}
						>
							<Content>
								<img
									className="mb-8"
									src={item.img}
									alt={`${item.title}_img`}
									width={'100%'}
									height={'100%'}
								/>
								<p className="title">{item.title}</p>
							</Content>
						</RadioInput>
					))}
				</div>
			</div>
		</>
	);
};

export default Sound;
