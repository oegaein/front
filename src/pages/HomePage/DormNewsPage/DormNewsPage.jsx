import React from 'react'
import { useDormNews } from '@hooks/useDormNews'
//components
import Buttons from '@components/HomePage/Buttons'
import DormNews from '@components/HomePage/DormNews'

//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

const DormNewsPage = () => {
  const {data:dormNews, isLoading, error} = useDormNews()
  console.log(dormNews)
  return (
    <SettingStyle className='flex flex-col gap-[10px]'>
      <div className='p-[25px] bg-white'>
        <Buttons/>
      </div>
      <div className='bg-white'>
        <h1 className='news-heading text-left px-[25px] pt-[30px] pb-[11px]'>새 공지사항</h1>
        <div className='news-list flex flex-col gap-[1px]'>
          {dormNews.map((news)=><DormNews news={news} isDormNewsPage={true}/>)}
        </div>
      </div>
    </SettingStyle>
  )
}

export default DormNewsPage

const SettingStyle = styled.div`
  background-color: ${COLOR.gray50};
  .news-heading {
    font-size: ${FONT.title3SB17};
  }
  .news-list {
    background-color: ${COLOR.gray100};
  }
`