import React from 'react'
import { useLocation } from 'react-router-dom'
//styles
import FONT from '@styles/fonts'
import COLOR from '@styles/color'
import styled from 'styled-components'
//images
import Filter from '@assets/images/filter.svg'

//components
import Roommate from '@components/RoommatePage/Roommate'
const FindRoommates = () => {
  const location = useLocation()
  const path = location.pathname
  return (
    <>
      <SettingStyle className='flex justify-between items-center px-[24px] py-[23px] pb-[16px]'>
          <h1 className='title'>룸메이트 찾기</h1>
          <div className='flex justify-between gap-[7px]'>
            <button className='filter-btn selected'>최신순</button>
            <button className='filter-btn'>마감순</button>
            {path === '/roommate' &&
            <button className={`flex justify-center items-center border border-[${COLOR.gray100}] h-[30px] w-[30px] rounded-[50%]`}>
              <img src={Filter} alt='filter icon'/>
            </button>
            }
          </div>
        </SettingStyle>
        <div className='flex flex-col gap-[10px] px-[24px] pb-[11px]'>
          <Roommate/>
          <Roommate/>
          <Roommate/>
        </div>
    </>
  )
}

export default FindRoommates

const SettingStyle = styled.div`
  
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

`