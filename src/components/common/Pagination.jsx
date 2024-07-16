import React, { useState, useEffect } from 'react';
import Next from '@assets/images/next.svg'
const Pagination = ({ data, setCurrentPage }) => {
  const { total_pages, cur_page } = data;
  const groupSize = 5
  const totalGroups = Math.ceil(total_pages/groupSize);
  const currentGroup = Math.floor(cur_page / groupSize);
  const startPage = Math.floor(cur_page / 5) * 5 + 1;
  const lastPage = Math.min(total_pages, startPage + 9)

  const handlePageClick = (page) => {
    // 페이지 변경에 따른 추가 작업을 여기서 수행 (예: 데이터 요청)
    setCurrentPage(page)
  };

  const handleGroupChange = (direction) => {
    const newPage = direction === 'next' 
      ? (currentGroup + 1) * groupSize 
      : (currentGroup - 1) * groupSize + (groupSize - 1);
    setCurrentPage(newPage);
  };

  //페이지 5개씩 노출 
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = currentGroup * groupSize;
    const endPage = Math.min(startPage + groupSize, total_pages);

    for (let i = startPage; i < endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          style={{
            color: cur_page === i ? '#8a7ff9' : '#000',
            cursor: 'pointer',
            margin: '0 5px',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '16px',
          }}
        >
          {i + 1}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
      <div className='flex items-center justify-center py-[10px]'>
        {currentGroup > 0 && (
          <button onClick={() => handleGroupChange('prev')}>
            <img src={Next} style={{transform: 'rotate(180deg)'}}/>
          </button>
        )}
        {renderPageNumbers()}
        {currentGroup < totalGroups - 1 && (
          <button onClick={() => handleGroupChange('next')}>
            <img src={Next}/>
          </button>
        )}
      </div>
  );
};

export default Pagination