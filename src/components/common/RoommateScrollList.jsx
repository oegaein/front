import React from 'react'
import { useLocation } from 'react-router-dom'
//styles
import FONT from '@styles/fonts'
import COLOR from '@styles/color'
import styled from 'styled-components'
//images
import Filter from '@assets/images/filter.svg'
import Hourglass from '@assets/images/hourglass.svg'
import Premium from '@assets/images/premium-quality.svg'

//components
import Roommate from '@components/RoommatePage/Roommate'
const RoommateScrollList = () => {
  const location = useLocation()
  const path = location.pathname
  return (
    <SettingStyle>
      <div className='flex justify-between items-center px-[24px] py-[23px] pb-[16px]'>
        {(path === '/roommate' || path === '/search') && <FindRoommateTitle path={path}/>}
        {(path === '/home/ending-soon') && <EndingSoonTitle/>}
        {(path === '/home/best-roommates') && <BestRoommateTitle/>}
        
      </div>
      <div className='flex flex-col gap-[10px] px-[24px] pb-[11px]'>
        <Roommate/>
        <Roommate/>
        <Roommate/>
      </div>
    </SettingStyle>
  )
}

export default RoommateScrollList

const SettingStyle = styled.div`
  background-color: white;
  .title {
    font-size: ${FONT.title3SB17};
  }
  .filter-btn {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.gray500};
    &.selected {
      color: ${COLOR.gray600};
    }
  }
  .ending-soon-btn {
    border-radius: 5px;
    width: 67px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${FONT.caption2M14};
    color: ${COLOR.gray500};
    background-color: ${COLOR.purple3};
    &.selected {
      color: white;
      background-color: ${COLOR.purple1};
    }
  }
`

const FindRoommateTitle = ({path}) => {
  return (
    <>
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
    </>
  )
}

const EndingSoonTitle = () => {
  return (
    <>
      <h1 className='title flex'>
        곧 모집이 종료돼요
        <img className='ml-[3px]' src={Hourglass} alt='hourglass icon'/>
      </h1>
      <div className='flex justify-between gap-[4px]'>
        <button className='ending-soon-btn selected'>룸메이트</button>
        <button className='ending-soon-btn'>공동배달</button>
      </div>
    </>
  )
}

const BestRoommateTitle = () => {
  return (
    <>
      <h1 className='title flex'>
        베스트 룸메이트
        <img className='ml-[3px]' src={Premium} alt='premium icon'/>
      </h1>
      <div className='flex justify-between gap-[7px]'>
        <button className='filter-btn selected'>최신순</button>
        <button className='filter-btn'>마감순</button>
      </div>
    </>
  )
}