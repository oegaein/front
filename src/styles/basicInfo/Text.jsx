import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import styled from 'styled-components';

export const Subtitle = styled.p`
	font: ${FONT.body4SB15};
	text-align: left;
	margin-bottom: 16px;
	width: 100%;

	.red {
		color: ${COLOR.red};
	}
`;

export const UnderMsg = styled.p`
	font: ${FONT.caption2M14};
	color: ${COLOR.gray500};
`;
