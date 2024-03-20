import React from 'react'
import Lottie from 'react-lottie';

//styles 
import COLOR from '@styles/color'
import FONT from '@styles/fonts'

//image 
import SearchIcon from '@assets/images/search-icon.svg'
import Bell from '@assets/images/bell.svg'
import animationBell from '@assets/lottie/알림/Animation - 1710832448195.json'
const SearchAndNotice = ({handleChange}) => {

  const defaultOptions = {
    loop: true,
      autoplay: true,
      animationData: animationBell,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      },
  }

  return (
    <div className='flex justify-between bg-white'>
        <div className={`border border-[${COLOR.gray200}]] rounded-[10px] px-[15px] py-[7px] flex justify-between w-[314px] bg-white ml-[24px]`}>
          <input className='text-[14px] w-[250px] focus:outline-none' type='text' 
          placeholder='외개인 통합검색'
          onChange={handleChange}/>
          <button className={`w-[32px] h-[32px] border-l border-[${COLOR.gray100}]`}>
            <img className='ml-auto' src={SearchIcon} alt='search icon'/>
          </button>
        </div>
        <button className='mr-[12px]'>
          {/* <img src={Bell}/> */}
          <div className='h-[37px]'>
            <Lottie
            options={defaultOptions}
            />

          </div>
        </button>

      </div>
  )
}

export default SearchAndNotice