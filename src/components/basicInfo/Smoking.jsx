import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { SmokeLottie } from '@assets/index';
import SmokingImg from '@assets/images/basicInfo/Smoking.svg';
import NotSmokingImg from '@assets/images/basicInfo/NotSmoking.svg';
import { RadioInput } from './BasicSettingInput';
import { Content } from './Lifepattern';

const Smoking = ({ onGetValue, setButton }) => {
	const lists = [
		{
			id: 1,
			img: SmokingImg,
			title: '흡연자',
		},
		{
			id: 2,
			img: NotSmokingImg,
			title: '비흡연자',
		},
	];
	const [smoking, setSmoking] = useState('');

	useEffect(() => {
		onGetValue(smoking);
		if (smoking !== '') {
			setButton(false);
		} else {
			setButton(true);
		}
	}, [smoking]);

	const handleSelect = (value) => {
		setSmoking(value);
	};

	return (
		<>
			<div className="flex flex-col justify-center items-center w-full mb-9">
				<div className="w-[220px] h-[180px] mb-14">
					<Lottie animationData={SmokeLottie} />
				</div>
				<div className="flex justify-between w-full">
					{lists.map((item, index) => (
						<RadioInput
							key={index}
							type={item.title}
							checked={smoking === item.title}
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

export default Smoking;
