import React from 'react'
import { Link } from 'react-router-dom'
//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

const DormNews = ({news, isDormNewsPage}) => {
  return (
    <SettingStyle key={news.id} className={`flex flex-col justify-between bg-white ${isDormNewsPage ? 'px-[25px]' : 'px-[15px]'} pt-[11px] pb-[18px] text-left`}>
      <div className={`flex justify-between ${isDormNewsPage ? 'mb-[7px]' : null}`}>
        <span className='dormitory-purple'>#공지</span>
        <span className='dormitory-time'>{news.createdAt}</span> 
      </div>
      <Link to={news.url} target='_blank' 
      className='dormitory-title text-ellipsis overflow-hidden whitespace-nowrap hover:underline'>{news.title.length >= 28 ? news.title.substring(0,28)+'...' : news.title}</Link>
    </SettingStyle>
  )
}

export default DormNews

const SettingStyle = styled.div`
  .dormitory-purple {
    font-size: ${FONT.caption3M12};
    color: ${COLOR.purple1};
  }
  .dormitory-time {
    font-size: ${FONT.caption3M12};
    color: ${COLOR.gray500};
  }
  .dormitory-title {
    font-size: ${FONT.body4SB15};
    text-overflow: ellipsis;
  }

`