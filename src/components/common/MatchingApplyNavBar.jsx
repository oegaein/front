import React, {useState, useEffect} from 'react'
import { API } from '@utils/api'
//images
import Share from '@assets/images/share.svg'
import BigRedHeart from '@assets/images/bigredheart.svg'
import BigEmptyHeart from '@assets/images/heart (10) 1.svg'


const MatchingApplyNavBar = ({version, isLowerBarVisible, memberId, isLikeProps=false}) => {
  const [isLike, setIsLike] = useState(isLikeProps)
  const fetchLikeData = async () => {
    try {
      const response = await API.post('/api/v1/member/like', {
        receiver_id: memberId
      })
      if(response.data.like_id) {
        setIsLike(true)
      }
    } catch(error) {
      console.error(error);
    }
  }
  const fetchDeleteLikeData = async () => {
    try {
      const response = await API.delete('/api/v1/member/like', {
        receiver_id: memberId
      })
      if (response.data.receiver_id) {
        setIsLike(false)
      }
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div className={`filter-section bg-white z-50 fixed bottom-0 flex items-center justify-between gap-[15px] h-[91px] w-[393px] px-[26px]
      transition-transform duration-300 ${isLowerBarVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        {version === 'userPage' ? 
        <div className='flex gap-[21px]'>
          {(isLike) ? 
              <button onClick={fetchDeleteLikeData} className='whitespace-nowrap w-[22px]'><img src={BigRedHeart}/></button>
              :  
              <button onClick={fetchLikeData} className='whitespace-nowrap w-[22px]'><img src={BigEmptyHeart}/></button>
          }
          <button className='whitespace-nowrap'><img src={Share}/></button>
        </div>
        :
        <div>여기에 코드 작성하심 됩니더~</div>
      }
      <button  className='filter-btn whitespace-nowrap'>매칭신청</button>
    </div>
  )
}

export default MatchingApplyNavBar