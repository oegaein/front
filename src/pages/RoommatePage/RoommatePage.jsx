import React, {useState} from 'react'
import axios from 'axios'

//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

//images
import Filter from '@assets/images/filter.svg'
import Plus from '@assets/images/plus.svg'
//components
import Roommate from '@components/RoommatePage/Roommate';
import RoommateSwiperList from '@components/common/RoommateSwiperList';
import SearchAndNotice from '@components/common/SearchAndNotice';
const RoommatePage = () => {
  const [input, setInput] = useState('')
  const handleChange = (e) => {
    setInput(e.target.value)
  }
  const fetchMatchingPosts = async () => {
    try {
      const response = await axios.get('/api/v1/matchingposts')
      return response.data
    } catch (err) {
      throw err;
    }
  }
  return (
    <SettingStyle className='bg-white flex flex-col gap-[10px] scroll-smooth'>
      <div>
        <SearchAndNotice handleChange={handleChange}/>
        <RoommateSwiperList type={'best'}/>
      </div>
      <div className='bg-white'>
        <button className={`write-btn rounded-[20px] w-[109px] h-[44px] flex justify-center items-center fixed z-10 bottom-[110px] right-[13px] shadow-[2px_2px_10px_rgba(0,0,0,0.25)] min-[393px]:right-[calc(50%-12rem)]`}>
          <img className='h-[14px] w-[14px]' src={Plus} alt='write icon'/>
          <span className='write-btn-text ml-[6px]'>룸메이트</span>
        </button>
        <div className='flex justify-between items-center px-[24px] py-[23px] pb-[16px]'>
          <h1 className='title'>룸메이트 찾기</h1>
          <div className='flex justify-between gap-[7px]'>
            <button className='filter-btn selected'>최신순</button>
            <button className='filter-btn'>마감순</button>
            <button className={`flex justify-center items-center border border-[${COLOR.gray100}] h-[30px] w-[30px] rounded-[50%]`}>
              <img src={Filter} alt='filter icon'/>
            </button>
          </div>
        </div>
        <div className='flex flex-col gap-[10px] px-[24px] pb-[11px]'>
          <Roommate/>
          <Roommate/>
          <Roommate/>
        </div>
      </div>
    </SettingStyle>
  )
}

export default RoommatePage

const SettingStyle = styled.div`
  background-color: ${COLOR.gray50};

  .title {
    font-size: ${FONT.title3SB17};
  }
  .filter-btn {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.gray500};
  }
  .selected {
    color: ${COLOR.gray600};
  }
  .write-btn {
    background-color: ${COLOR.purple1};
  }
  .write-btn-text {
    font-size: ${FONT.buttonSB15};
    color: white;
  }
`