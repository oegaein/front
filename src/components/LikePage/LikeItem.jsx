import React, {useState} from 'react'
import UserPageInfo from '@components/UserPage/UserPageInfo'
import Next from '@assets/images/next.svg'
import RedHeart from '@assets/images/heart-red.svg'
import Heart from '@assets/images/heart (10) 1.svg'
const LikeItem = ({profileImage}) => {
  const [liked, setLiked] = useState(false)
  const handleClickHeart = () => {
    //api 요청 로직
    setLiked(prevState=> !prevState)
  }
  return (
    <div className='bg-white px-[25px] pt-[16px] pb-[24px]'> 
      <div className='flex justify-between items-center mb-[16px]'>
        <div className='flex items-center'>
          <img className='w-[25px] h-[25px] mr-[4px]' src={profileImage}/>
          <span className='font-caption2m14'>hYPEBOY</span>
          <img src={Next}/>
        </div>
        <button onClick={handleClickHeart}><img className='w-[20px] h-[20px]' src={liked ? RedHeart : Heart}/></button>
      </div>
      <UserPageInfo/>
    </div>
  )
}

export default LikeItem
