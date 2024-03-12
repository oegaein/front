import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { LifepatternLottie } from '@assets/index';
import Morning from '@assets/images/basicInfo/morning.svg';
import Evening from '@assets/images/basicInfo/evening.svg';
import { RadioInput } from './BasicSettingInput';
import styled from 'styled-components';
import FONT from '@styles/fonts';

const Lifepattern = ({ onGetValue, setButton }) => {
	const lists = [
		{
			id: 1,
			img: Morning,
			title: '아침형',
			desc: '아침 시간대에 대부분의 활동을 활발히 진행',
		},
		{
			id: 2,
			img: Evening,
			title: '저녁형',
			desc: '밤 시간대에 대부분의 활동을 활발히 진행',
		},
	];
	const [lifepattern, setLifepattern] = useState('');

	useEffect(() => {
		onGetValue(lifepattern);
		if (lifepattern !== '') {
			setButton(false);
		} else {
			setButton(true);
		}
	}, [lifepattern]);

	const handleSelect = (value) => {
		setLifepattern(value);
	};

	return (
		<>
			<div className="flex flex-col justify-center items-center w-full mb-9">
				<div className="w-[250px] h-[180px] mb-7">
					<Lottie animationData={LifepatternLottie} />
				</div>
				<div className="flex justify-between w-full">
					{lists.map((item, index) => (
						<RadioInput
							key={index}
							type={item.title}
							checked={lifepattern === item.title}
							width="48%"
							height="254px"
							onSelect={() => handleSelect(item.title)}
						>
							<Content>
								<img
									className="mb-8"
									src={item.img}
									alt={`${item.title}_img`}
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

export default Lifepattern;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	padding: 14px;

	.title {
		font: ${FONT.body5M15};
	}
	.desc {
		font: ${FONT.caption3M12};
		margin-bottom: 30px;
	}
`;
