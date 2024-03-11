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
