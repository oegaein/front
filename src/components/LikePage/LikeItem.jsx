import React, {useState} from 'react'
import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';
import UserPageInfo from '@components/UserPage/UserPageInfo'
import Next from '@assets/images/next.svg'
import RedHeart from '@assets/images/heart-red.svg'
import Heart from '@assets/images/heart (10) 1.svg'
const LikeItem = ({like}) => {
  const [isLike, setIsLike] = useState(false)

  const fetchLikeData = async () => {
    try {
      const response = await makeAuthorizedRequest('/api/v1/member/like', {
        receiver_id: like.receiver_id
      }, 'post')
      console.log(response)
      if(response.data.like_id) {
        setIsLike(true)
      }
    } catch(error) {
      console.error(error);
      
    }
  }
  const fetchDeleteLikeData = async () => {
    try {
      const response = await makeAuthorizedRequest('/api/v1/member/like', {
        receiver_id: like.receiver_id
      }, 'delete')
      console.log(response)
      if (response.data.like_id) {
        setIsLike(false)
      }
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div className='bg-white px-[25px] pt-[16px] pb-[24px]'> 
      <div className='flex justify-between items-center mb-[16px]'>
        <div className='flex items-center'>
          <img className='w-[25px] h-[25px] mr-[4px] rounded-[50%]' src={like.photo_url}/>
          <span className='font-caption2m14'>{like.name}</span>
          <img src={Next}/>
        </div>
        {(isLike) ? 
            <button onClick={fetchDeleteLikeData} className='w-[20px] h-[20px]'><img src={RedHeart}/></button>
            :  
            <button onClick={fetchLikeData} className='w-[20px] h-[20px]'><img src={Heart}/></button>
        }   
      </div>
      <UserPageInfo userInfo={like}/>
    </div>
  )
}

export default LikeItem
