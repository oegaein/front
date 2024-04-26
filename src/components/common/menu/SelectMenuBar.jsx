'use client';

import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import React from 'react';
import styled from 'styled-components';

const SelectMenuBar = ({ menuList, pickedMenuId }) => {
	return (
		<section className="w-full flex">
			{menuList.map((menu) => (
				<SelectMenuStyle
					key={menu.id}
					role="presentation"
					className={`${pickedMenuId === menu.id ? 'selected' : 'none'}`}
					style={{ width: `${100 / menuList.length}%` }}
					onClick={() => {
						if (menu.onClick !== undefined) {
							menu.onClick(menu);
						}
					}}
				>
					{menu.title}
				</SelectMenuStyle>
			))}
		</section>
	);
};

export default SelectMenuBar;

const SelectMenuStyle = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-bottom: 16px;
	cursor: pointer;
	border-bottom: 2px solid ${COLOR.gray100};
	font: ${FONT.caption2M14};
	color: ${COLOR.gray500};

	.selected {
		border-bottom: 2px solid ${COLOR.purple1};
		color: ${COLOR.black};
	}

	.none {
		font: ${FONT.caption2M14};
		color: ${COLOR.gray500};
	}
`;
