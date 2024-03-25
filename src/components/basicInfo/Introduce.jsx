import { Subtitle, UnderMsg } from '@styles/basicInfo/Text';
import { BasicInput } from './BasicSettingInput';
import { useState } from 'react';
import COLOR from '@styles/color';

const Introduce = ({ onGetValue, setButton }) => {
	const [alertMsg, setAlertMsg] = useState('');

	const handleChangeValue = (introduce) => {
		if (introduce < 1 || introduce > 20) {
			setButton(true);
			setAlertMsg('한 글자 이상 입력해주세요.');
		} else {
			setAlertMsg('');
			onGetValue(introduce);
			setButton(false);
		}
	};

	return (
		<>
			<Subtitle>한줄소개</Subtitle>
			<div className="flex pb-1 mb-2 w-full">
				<BasicInput onChangeValue={handleChangeValue} limitNum={20} />
			</div>
			<div className="flex justify-between w-full items-center">
				{alertMsg == '' ? (
					<UnderMsg>20자 이내</UnderMsg>
				) : (
					<UnderMsg style={{ color: `${COLOR.red}` }}>{alertMsg}</UnderMsg>
				)}
			</div>
			<div className="h-6 mb-[368px]"></div>
		</>
	);
};

export default Introduce;
