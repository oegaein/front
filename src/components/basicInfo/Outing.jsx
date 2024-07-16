import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { WalkLottie } from '@assets/index';
import HomeImg from '@assets/images/basicInfo/Home.svg';
import OutdoorImg from '@assets/images/basicInfo/Outdoor.svg';
import { RadioInput } from './BasicSettingInput';
import { Content } from './Lifepattern';

const Outing = ({ onGetValue, setButton }) => {
	const lists = [
		{
			id: 1,
			img: HomeImg,
			title: '집순이',
			desc: `집에 있는 시간이\n더 많은 사람`,
		},
		{
			id: 2,
			img: OutdoorImg,
			title: '밖순이',
			desc: `밖에 나와있는 시간이\n더 많은 사람`,
		},
	];
	const [outing, setOuting] = useState('');

	useEffect(() => {
		onGetValue(outing);
		if (outing !== '') {
			setButton(false);
		} else {
			setButton(true);
		}
	}, [outing]);

	const handleSelect = (value) => {
		setOuting(value);
	};

	return (
		<>
			<div className="flex flex-col justify-center items-center w-full mb-9">
				<div className="w-[180px] h-[180px] mb-7">
					<Lottie animationData={WalkLottie} />
				</div>
				<div className="flex justify-between w-full">
					{lists.map((item, index) => (
						<RadioInput
							key={index}
							type={item.title}
							checked={outing === item.title}
							width="48%"
							height="254px"
							onSelect={() => handleSelect(item.title)}
						>
							<Content style={{ padding: '15px 0px' }}>
								<img
									className="mb-[12px]"
									src={item.img}
									alt={`${item.title}_img`}
									width={'92px'}
									height={'94px'}
								/>
								<p className="desc">{item.desc}</p>
								<p className="title">{item.title}</p>
							</Content>
						</RadioInput>
					))}
				</div>
			</div>
		</>
	);
};

export default Outing;
