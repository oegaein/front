import React from 'react'

const MyPageInfo = ({renderStars}) => {
  return (
    <>
      <div>
        <p className='rating-title mb-[17px]'>MY 룸메 평점</p>
        <span className='rating-number'>5</span>
        <div className='flex justify-center gap-[2.8px] mt-[5px]'>
          {renderStars()}
        </div>
      </div>
      <div className='information-container px-[30px] pt-[32px]'>
        <h1 className='information-title text-left font-bold'>기본 정보</h1>
        <div className='flex flex-col px-[10px] pt-[16px] pb-[24px] gap-[12px]'>
          <div className='flex'>
            <div className='information-label font-bold w-[95px] text-left'>성별</div>
            <div className='information-value'>남성</div>
          </div>
          <div className='flex'>
            <div className='information-label font-bold w-[95px] text-left'>나이</div>
            <div className='information-value'>26</div>
          </div>
          <div className='flex'>
            <div className='information-label font-bold w-[95px] text-left'>학번</div>
            <div className='information-value'>18 학번</div>
          </div>
          <div className='flex'>
            <div className='information-label font-bold w-[95px] text-left'>전공</div>
            <div className='information-value'>폴란드어과</div>
          </div>
          <div className='flex'>
            <div className='information-label font-bold w-[95px] text-left'>생년월일</div>
            <div className='information-value'>1999년 5월 4일</div>
          </div>
          <div className='flex'>
            <div className='information-label font-bold w-[95px] text-left'>기숙사 동</div>
            <div className='information-value'>None</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyPageInfo