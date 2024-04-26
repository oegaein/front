import React, {useRef, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'
import SearchBar from '@common/SearchBar'

import BackButton from '@assets/images/BackButton.svg'
import RoommateScrollList from '@common/RoommateScrollList'
const SearchPage = () => {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [searchTerm, setSearchTerm] = useState('')
  const handleClickSearchBtn = (searchTerm) => {
    setSearchTerm(searchTerm)
  }
  const handleKeyPress = (e, searchTerm) => {
    if (e.key === 'Enter') {
      handleClickSearchBtn(searchTerm);
    }
  }
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [])
  return (
    <SettingStyle>
      <div className='flex justify-between bg-white px-[28px] mb-[4px]'>
        <button onClick={()=>navigate(-1)}>
          <img src={BackButton} className='w-[10px] h-[16px]' alt='back button icon' />
        </button>
        <SearchBar ref={inputRef} handleClickSearchBtn={handleClickSearchBtn}
        handleKeyPress={handleKeyPress}/>
      </div>
      <RoommateScrollList type={'search'} searchTerm={searchTerm}/>
    </SettingStyle>
  )
}

export default SearchPage

const SettingStyle = styled.div`
  background-color: white;
  .bold-text {
    font-size: ${FONT.title3SB17};
  }
  .normal-text {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.gray500};
  }
`
const NoResults = () => {
  return (
    <div className='mt-[137px]'>
      <p className='bold-text mb-[24px]'>찾으시는 검색 결과가 없어요</p>
      <p className='normal-text'>단어의 철자가 정확한지 확인해 주세요.</p>
      <p className='normal-text'>또는 단어 수를 줄여서 검색해 보세요.</p>
    </div>
  )
}