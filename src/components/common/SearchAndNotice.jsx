import React, {useState} from 'react'
import Lottie from 'react-lottie';
import { Link, useNavigate } from 'react-router-dom';
//styles 
import COLOR from '@styles/color'
import FONT from '@styles/fonts'

//image 
import Bell from '@assets/images/bell.svg'
import animationBell from '@assets/lottie/알림/Animation - 1710832448195.json'
import SearchBar from './SearchBar';
const SearchAndNotice = () => {
  const [searchResults, setSearchResults] = useState('')
  const navigate = useNavigate()
  const defaultOptions = {
    loop: true,
      autoplay: true,
      animationData: animationBell,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      },
  }

  return (
    <div className='flex justify-between items-center bg-white px-[24px] h-[57px]'>
        <SearchBar onClick={()=>navigate('/search')}/>
        <button>
          {/* <img src={Bell}/> */}
          <Link to='/alarm' className='block h-[37px]'>
            <Lottie
            options={defaultOptions}
            />
          </Link>
        </button>

      </div>
  )
}

export default SearchAndNotice