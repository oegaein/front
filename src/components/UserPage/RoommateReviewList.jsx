import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'
import RoommateReview from './RoommateReview'
import { API } from '@utils/api'

const RoommateReviewList = ({memberId, isInReviewPage}) => {
  const [reviews, setReviews] = useState([])
  useEffect(()=>{
    const fetchReviewData = async () => {
      const response = await API.get(`/api/v1/${memberId}/reviews`)
      console.log(response.data.data)
      setReviews(response.data.data)
    }
    fetchReviewData()
  }, [])
  return (
    <SettingStyle className='relative bg-white px-[24px]'>
      {reviews.length > 0 ?
      reviews.map((review, index)=><RoommateReview review={review} index={index}/>)
      :
      <p className={`nodata-ment ${isInReviewPage ? 'mt-[170px]' : null}`}>받은 룸메이트 후기가 아직 없어요.</p>
      }
    </SettingStyle>
  )
}

export default RoommateReviewList

const SettingStyle = styled.div`
  
  .more {
    font-size: ${FONT.caption2M14};
  }
  .nodata-ment {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.gray800};
  }

`