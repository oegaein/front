'use client';

import COLOR from '@styles/color';
import FONT from '@styles/fonts';
import React, { useState } from 'react';
import styled from 'styled-components';

const SelectMenuBar = ({ menuList, pickedMenuId }) => {
	const [selectedMenu, setSelectedMenu] = useState(0);
	return (
		<section className="w-full flex">
			{menuList.map((menu, index) => (
				<SelectMenuStyle
					key={menu}
					role="presentation"
					style={{ width: `${100 / menuList.length}%` }}
					className=""
					onClick={() => {
						pickedMenuId(menu);
						setSelectedMenu(index);
					}}
					selected={selectedMenu === index}
				>
					{menu}
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

	${(props) =>
		props.selected &&
		`
		border-bottom: 2px solid ${COLOR.purple1};
		color: ${COLOR.black};
	`}

	&:hover {
		color: ${COLOR.black};
	}
`;
