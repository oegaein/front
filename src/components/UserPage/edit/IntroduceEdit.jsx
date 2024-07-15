import { Subtitle, UnderMsg } from '@styles/basicInfo/Text';
import { useState } from 'react';
import COLOR from '@styles/color';
import { EditNicknameInput } from '@components/basicInfo/BasicSettingInput';

const IntroduceEdit = ({ onGetValue, defaultValue }) => {
	const [alertMsg, setAlertMsg] = useState('');

	const handleChangeValue = (introduce) => {
		if (introduce < 1 || introduce > 20) {
			setAlertMsg('한 글자 이상 입력해주세요.');
		} else {
			setAlertMsg('');
			onGetValue('introduction', introduce);
		}
	};

	return (
		<>
			<Subtitle>한줄소개</Subtitle>
			<div className="flex pb-1 mb-2 w-full">
				<EditNicknameInput
					defaultValue={defaultValue}
					onChangeValue={handleChangeValue}
					limitNum={20}
				/>
			</div>
			<div className="flex justify-between w-full items-center">
				{alertMsg == '' ? (
					<UnderMsg>20자 이내</UnderMsg>
				) : (
					<UnderMsg style={{ color: `${COLOR.red}` }}>{alertMsg}</UnderMsg>
				)}
			</div>
		</>
	);
};

export default IntroduceEdit;
