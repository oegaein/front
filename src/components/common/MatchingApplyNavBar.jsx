import React from 'react'

const MatchingApplyNavBar = () => {
  return (
    <div className={`filter-section bg-white z-50 fixed bottom-0 flex items-center justify-between gap-[15px] h-[91px] w-[393px] px-[26px]
      transition-transform duration-300 ${isLowerBarVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className='flex gap-[21px]'>
        <button className='whitespace-nowrap'><img src={BigRedHeart}/></button>
        <button className='whitespace-nowrap'><img src={Share}/></button>
      </div>
      <button onClick={handleApplyMatching} className='filter-btn whitespace-nowrap'>매칭신청</button>
    </div>

  )
}

export default MatchingApplyNavBar