import React, { useState, forwardRef } from 'react';
import COLOR from '@styles/color';
import SearchIcon from '@assets/images/search-icon.svg';

const SearchBar = forwardRef(function SearchBar(props, ref) {
	const [searchTerm, setSearchTerm] = useState('');
	const { handleClickSearchBtn, onClick, handleKeyPress } = props;
	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};

	return (
		<div
			onClick={onClick}
			className={`border border-[${COLOR.gray200}]] rounded-[10px] px-[15px] py-[7px] h-[46px] flex justify-between w-[302px] bg-white`}
		>
			<input
				ref={ref}
				className="text-[14px] w-[250px] focus:outline-none"
				type="text"
				placeholder="외개인 통합검색"
				value={searchTerm}
				onChange={handleChange}
				onKeyDown={(e) => handleKeyPress(e, searchTerm)}
			/>
			<button
				onClick={() => handleClickSearchBtn(searchTerm)}
				className={`w-[32px] h-[32px] border-l border-[${COLOR.gray100}]`}
			>
				<img className="ml-auto" src={SearchIcon} alt="search icon" />
			</button>
		</div>
	);
});

export default SearchBar;
