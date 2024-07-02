import React from 'react'
import { useDormNews } from '@hooks/useDormNews'
import { useNavigate } from 'react-router-dom'
//components
import Buttons from '@components/HomePage/Buttons'
import DormNews from '@components/HomePage/DormNews'
import Header from '@common/header/Header'
//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'
//images
import Alarm from '@assets/images/common/alarm.svg';


const DormNewsPage = () => {
  const navigate = useNavigate();
  const {data:dormNews, isLoading, error} = useDormNews()
  console.log(dormNews)
  return (
    <SettingStyle className='flex flex-col gap-[10px]'>
      <div>
        <div className="px-[28px] bg-white">
          <Header backPath="/home" rightContent={Alarm} rightEvent={() => {
							navigate('/alarm');
						}}>
            <span className='font-bold'>기숙사 소식</span>
          </Header>
        </div>
        <div className='p-[25px] bg-white'>
          <Buttons/>
        </div>
      </div>
      <div className='bg-white'>
        <h1 className='news-heading text-left px-[25px] pt-[30px] pb-[16px]'>새 공지사항</h1>
        <div className='news-list flex flex-col gap-[1px]'>
          {dormNews?.map((news)=><DormNews news={news} isDormNewsPage={true}/>)}
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