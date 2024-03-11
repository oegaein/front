import { Subtitle, UnderMsg } from '@styles/basicInfo/Text';
import { BasicInput } from './BasicSettingInput';
import { useState } from 'react';

const Introduce = () => {
	const [input, setInput] = useState('');

	const handleChangeValue = (nickname) => {};

	return (
		<>
			<Subtitle>한줄소개</Subtitle>
			<div className="flex pb-1 mb-2 w-full">
				<BasicInput onChangeValue={handleChangeValue} limitNum={20} />
			</div>
			<div className="flex justify-between w-full items-center">
				<UnderMsg>20자 이내</UnderMsg>
			</div>
			<div className="h-6 mb-[368px]"></div>
		</>
	);
};

export default Introduce;
