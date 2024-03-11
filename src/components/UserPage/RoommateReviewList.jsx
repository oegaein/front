import React from 'react'
import More from '../../assets/images/more.svg'
import RoommateReview from './RoommateReview'
const RoommateReviews = () => {
  return (

    <div className='relative py-[20px] bg-white'>
      <div className='mb-[10px]'>
        <h1 className='px-[33px] text-left font-bold'>받은 룸메이트 후기 2</h1>
        <button className='absolute top-[20px] right-[22px]'>
          <img src={More}/>
        </button>
      </div>
      <div>
        <RoommateReview/>
        <RoommateReview/>
      </div>
    </div>
  )
}

export default RoommateReviews