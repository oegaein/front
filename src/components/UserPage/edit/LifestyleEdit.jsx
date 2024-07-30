import { useEffect, useState } from 'react';
import styled from 'styled-components';
import COLOR from '@styles/color';
import FONT from '@styles/fonts';

const LifestyleEdit = ({
	lists,
	keyProp,
	onGetValue,
	defaultValue,
	multi = false,
}) => {
	const [selectedOption, setSelectedOption] = useState(multi ? [] : null);

	useEffect(() => {
		const filteredDefaultValue = multi
			? (defaultValue || []).filter((value) => value !== null)
			: defaultValue || null;
		setSelectedOption(filteredDefaultValue);
	}, [defaultValue, multi]);

	const handleCheckboxChange = (value) => {
		let updatedSelection;

		if (multi) {
			const isSelected = selectedOption?.includes(value);
			if (isSelected) {
				updatedSelection = selectedOption.filter((item) => item !== value);
			} else {
				updatedSelection = [...selectedOption, value];
			}
		} else {
			updatedSelection = selectedOption === value ? null : value;
		}

		setSelectedOption(updatedSelection);
		onGetValue(keyProp, updatedSelection);
	};

	return (
		<Container>
			{lists?.map((item, index) => (
				<CheckboxItem key={index}>
					<CheckboxLabel
						onClick={() => handleCheckboxChange(item)}
						checked={
							multi ? selectedOption?.includes(item) : selectedOption === item
						}
					>
						<input
							type="checkbox"
							checked={selectedOption?.includes(item)}
							readOnly
						/>
						<p>{item}</p>
					</CheckboxLabel>
				</CheckboxItem>
			))}
		</Container>
	);
};

export default LifestyleEdit;

const Container = styled.div`
	display: flex;
	flex-wrap: nowrap;
	margin-bottom: 16px;
	width: 100%;
	border-bottom: 1px solid ${COLOR.gray100};
	overflow-x: auto;
	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* IE and Edge */
	&::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera */
	}
`;

const CheckboxItem = styled.div`
	flex: 0 0 auto;
	margin-right: 6px;
	margin-bottom: 16px;
`;

const CheckboxLabel = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-width: 66px;
	height: 40px;
	padding: 7px 17px;
	font: ${FONT.body5M15};
	background-color: ${(props) => (props.checked ? COLOR.purple3 : COLOR.white)};
	border: ${(props) =>
		props.checked
			? `1px solid ${COLOR.purple3}`
			: `1px solid ${COLOR.gray100}`};
	border-radius: 15px;
	cursor: pointer;

	input[type='checkbox'] {
		display: none;
	}

	&:hover {
		background-color: ${COLOR.gray100};
	}
`;
