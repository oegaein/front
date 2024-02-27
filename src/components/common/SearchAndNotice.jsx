import React from 'react'
import SearchIcon from '../../assets/images/search-icon.svg'
import Bell from '../../assets/images/bell.svg'


const SearchAndNotice = ({handleChange}) => {
  return (
    <div className='flex justify-between'>
        <div className='border border-[#8A7FF9] rounded-[15px] p-[15px] flex justify-between w-[314px] bg-white ml-[24px]'>
          <input className='text-[14px] w-[250px] focus:outline-none' type='text' 
          placeholder='검색으로 원하는 룸메를 찾아보세요'
          onChange={handleChange}/>
          <button>
            <img src={SearchIcon}/>
          </button>
        </div>
        <button className='mr-[12px]'>
          <img src={Bell}/>
        </button>
      </div>
  )
}

export default SearchAndNotice