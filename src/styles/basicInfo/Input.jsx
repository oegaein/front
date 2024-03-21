import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import styled from 'styled-components';

export const Input = styled.input`
	width: 100%;
	height: 58px;
	padding: 0px 15px;
	font: ${FONT.body5M15};
	color: ${COLOR.black};
	border-radius: 10px;
	border: 1px solid ${COLOR.gray100};

	&::placeholder {
		font: ${FONT.body5M15};
		color: ${COLOR.gray400};
	}

	&:focus {
		outline: 1px solid ${COLOR.purple1};
	}
`;

export const TextArea = styled.textarea`
	width: 100%;
	height: 275px;
	padding: 15px;
	font: ${FONT.body5M15};
	color: ${COLOR.black};
	border-radius: 10px;
	border: 1px solid ${COLOR.gray100};

	&::placeholder {
		font: ${FONT.caption2M14};
		color: ${COLOR.gray400};
	}

	&:focus {
		outline: 1px solid ${COLOR.purple1};
	}
`;

export const ContainerStyle = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-end;
	width: ${(props) => props.width || 'auto'};
	height: ${(props) => props.height || 'auto'};
	padding: 10px;
	background-color: ${(props) => (props.checked ? COLOR.purple3 : COLOR.white)};
	border: ${(props) => (props.checked ? 'none' : `1px solid ${COLOR.gray100}`)};
	border-radius: 10px;
	cursor: pointer;

	input[type='radio'] {
		display: none;
	}

	input[type='checkbox'] {
		display: none;
	}

	> label p {
		font: ${FONT.body5M15};
		cursor: pointer;
		color: ${COLOR.blue};
	}
`;
