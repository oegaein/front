import React, { useState, useEffect } from 'react';

const Pagination = ({ data }) => {
  const { total_pages, cur_page } = data;
  const [currentPage, setCurrentPage] = useState(cur_page);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    // 페이지 변경에 따른 추가 작업을 여기서 수행 (예: 데이터 요청)
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.floor(currentPage / 10) * 10;
    const endPage = Math.min(startPage + 10, total_pages);

    for (let i = startPage; i < endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          style={{
            color: currentPage === i ? '#8a7ff9' : '#000',
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
        {currentPage > 9 && (
          <button onClick={() => handlePageClick(currentPage - 10)}>
            {'<'}
          </button>
        )}
        {renderPageNumbers()}
        {currentPage < total_pages - 10 && (
          <button onClick={() => handlePageClick(currentPage + 10)}>
            {'>'}
          </button>
        )}
      </div>
  );
};

export default Pagination