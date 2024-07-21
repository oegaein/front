import BasicButton from '@common/button/BasicButton';
import BasicDropdown, { DropdownWrapper } from '@common/dropdown/BasicDropdown';
import OpenDropdown from '@common/dropdown/OpenDropdown';
import { NumInput, RadioInput } from '@components/basicInfo/BasicSettingInput';
import { Content } from '@components/basicInfo/Lifepattern';
import useAuthStore from '@store/authStore';
import { Input, TextArea } from '@styles/basicInfo/Input';
import { Subtitle } from '@styles/basicInfo/Text';
import React, { useEffect, useState } from 'react';
import { postMatchingPostAPI } from 'services/api/MatchingPostAPI';

const PostRoommate = () => {
	const [postContent, setPostContent] = useState({
		title: '',
		detail: '',
		building: '',
		type: '',
		people: 0,
		date: '',
		time: '',
	});
	const buildings = ['A동', 'B동', 'C동', 'D동', 'E동'];
	const type = ['2인실', '4인실'];
	const people = ['1명', '2명', '3명'];
	const [button, setButton] = useState(false);

	useEffect(() => {
		setButton(isFormValid());
	}, [postContent]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setPostContent({ ...postContent, [name]: value });
	};

	const handleSelect = (value) => {
		setPostContent((prevState) => ({
			...prevState,
			building: value,
			type:
				value === 'A동' || value === 'B동' || value === 'C동'
					? '2인실'
					: '4인실',
			people: value === 'A동' || value === 'B동' || value === 'C동' ? 1 : 0,
		}));
	};

	const handleSubmit = () => {
		const SubmitData = {
			title: postContent.title,
			content: postContent.detail,
			deadline: postContent.date + postContent.time,
			targetNumberOfPeople: postContent.people,
			dongType: postContent.building,
			roomSizeType: postContent.type,
		};
		console.log(SubmitData);
		postMatchingPostAPI(SubmitData);
	};

	const isFormValid = () => {
		const { title, detail, building, type, people, date } = postContent;
		return (
			title !== '' &&
			detail !== '' &&
			building !== '' &&
			type !== '' &&
			people !== 0 &&
			date !== ''
		);
	};

	return (
		<>
			<div className="flex flex-col w-full">
				<div className="flex flex-col justify-start w-full mb-6">
					<Subtitle>제목</Subtitle>
					<Input
						type="text"
						name="title"
						placeholder="제목을 입력해주세요"
						value={postContent.title}
						onChange={handleInputChange}
					/>
				</div>
				<div className="flex flex-col justify-start w-full mb-6">
					<Subtitle>상세 설명</Subtitle>
					<TextArea
						type="text"
						name="detail"
						placeholder={`추가 정보를 작성해 주세요. 자세히 작성할수록 나랑\n잘 맞는 룸메이트를 찾을 확률이 올라가요!\n\n(부적절한 언어 사용, 구인과 관련 없는 글은 이용정지\n될 수 있습니다.)`}
						value={postContent.detail}
						onChange={handleInputChange}
						height={'275px'}
					/>
				</div>
				<div className="flex flex-col w-full mb-6">
					<Subtitle>희망하는 기숙사 동</Subtitle>
					<div className="flex w-full justify-between">
						{buildings.map((item, index) => (
							<RadioInput
								key={index}
								type={item}
								checked={postContent.building === item}
								width="17%"
								height="58px"
								onSelect={() => handleSelect(item)}
							>
								<Content style={{ padding: '7px 0px' }}>
									<p className="title">{item}</p>
								</Content>
							</RadioInput>
						))}
					</div>
				</div>
				<div className="flex flex-col justify-start w-full">
					<Subtitle>희망하는 호실 유형</Subtitle>
					{postContent.building !== '' &&
					postContent.building !== 'D동' &&
					postContent.building !== 'E동' ? (
						<DropdownWrapper options={'2인실'}>
							<div className="header">
								<span>2인실</span>
							</div>
						</DropdownWrapper>
					) : (
						<BasicDropdown
							choice="기숙사 호실"
							label="호실 유형을 선택해주세요"
							options={type}
							setSelected={(value) =>
								setPostContent((prevState) => ({
									...prevState,
									type: value,
									people: value === '2인실' ? 1 : 0,
								}))
							}
						/>
					)}
				</div>
				<div className="flex flex-col justify-start w-full">
					<Subtitle>모집 인원</Subtitle>
					{postContent.type === '2인실' ? (
						<DropdownWrapper options={'1명'}>
							<div className="header">
								<span>1명</span>
							</div>
						</DropdownWrapper>
					) : (
						<BasicDropdown
							choice="모집 인원"
							label="모집 인원을 선택해주세요"
							options={people}
							setSelected={(value) =>
								setPostContent({ ...postContent, people: parseInt(value[0]) })
							}
						/>
					)}
				</div>
				<div className="flex flex-col justify-start w-full mb-10">
					<Subtitle>마감 기한</Subtitle>
					<NumInput
						setSelected={(value) =>
							setPostContent({ ...postContent, date: value })
						}
					/>
				</div>
				<BasicButton
					text={'완료'}
					path={'/home'}
					eventName={handleSubmit}
					disabled={!button}
				/>
			</div>
		</>
	);
};

export default PostRoommate;
