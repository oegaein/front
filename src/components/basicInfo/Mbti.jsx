import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RadioInput } from './BasicSettingInput';

const Mbti = ({ onGetValue, setButton }) => {
	const [mbti, setMbti] = useState({
		EI: '',
		SN: '',
		FT: '',
		PJ: '',
	});

	const mbtiItems = [
		{
			title: 'EI',
			items: [
				{ id: 1, type: 'E', desc: '외향' },
				{ id: 2, type: 'I', desc: '내향' },
			],
		},
		{
			title: 'SN',
			items: [
				{ id: 1, type: 'S', desc: '감각' },
				{ id: 2, type: 'N', desc: '직관' },
			],
		},
		{
			title: 'FT',
			items: [
				{ id: 1, type: 'F', desc: '사고' },
				{ id: 2, type: 'T', desc: '감정' },
			],
		},
		{
			title: 'PJ',
			items: [
				{ id: 1, type: 'P', desc: '판단' },
				{ id: 2, type: 'J', desc: '인식' },
			],
		},
	];

	useEffect(() => {
		onGetValue(convertToMbtiString(mbti));
	}, [mbti]);

	const handleSelect = (category, type) => {
		setMbti({ ...mbti, [category]: type });
	};

	const convertToMbtiString = (mbti) => {
		const sortedMbti = mbtiItems
			.map((category) => mbti[category.title])
			.join('');
		if (sortedMbti.length === 4) {
			setButton(false);
		}
		return sortedMbti;
	};

	return (
		<>
			<div className="w-full mb-9">
				{mbtiItems.map((category, index) => (
					<div key={index} className="flex w-full justify-between mb-3">
						{category.items.map((item, i) => (
							<RadioInput
								key={item.id}
								type={item.type}
								checked={mbti[category.title] === item.type}
								width="48%"
								height="102px"
								onSelect={() => handleSelect(category.title, item.type)}
							>
								<p className="mb-4">{item.type}</p>
								<p>{item.desc}</p>
							</RadioInput>
						))}
					</div>
				))}
			</div>
		</>
	);
};

Mbti.propTypes = {
	onGetValue: PropTypes.func.isRequired,
};

export default Mbti;
