import React, { useState } from 'react';
import styled from 'styled-components';
import FONT from '@styles/fonts';
import COLOR from '@styles/color';

const DoubleRangeSlider = ({type, setFilters, setSelectedFilters, minValue, maxValue}) => {

  // 최소값을 업데이트하는 핸들러
  const handleMinValueChange = (e) => {
    const name = e.target.name
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
    setSelectedFilters(prevFilters => (
      [{name, value}, ...prevFilters.filter(item => item.name !== name)]
    ))
  };

  // 최대값을 업데이트하는 핸들러
  const handleMaxValueChange = (e) => {
    const name = e.target.name
    const value = Math.max(Number(e.target.value), minValue + 1);
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
    setSelectedFilters(prevFilters => (
      [{name, value}, ...prevFilters.filter(item => item.name !== name)]
    ))
  };

  return (
    <SettingStyle minValue={(minValue / 100) * 100} maxValue={(maxValue / 100) * 100}>
      <div className='flex items-center'>
        <h1 className='filter-title mr-[10px]'>{type}</h1>
        <p className='filter-subtitle'>
          {
            type === '나이'
            ? `${minValue}세 ~ ${maxValue}세`
            : `${minValue}학번 ~ ${maxValue}학번`
        }
        </p>
      </div>
      <div className='slider-wrapper'>
        <div className='slider-between'></div>
        <input
          type="range"
          min="0"
          max="100"
          value={minValue}
          onChange={handleMinValueChange}
          className="slider"
          id="minRange"
          name={type === '나이' ? 'minAge' : 'minYear'}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={maxValue}
          onChange={handleMaxValueChange}
          className="slider"
          id="maxRange"
          name={type === '나이' ? 'maxAge' : 'maxYear'}
        />

      </div>
    </SettingStyle>
  );
}

export default DoubleRangeSlider;

const SettingStyle = styled.section`
  padding: 25px;
  border-bottom: 1px solid ${COLOR.gray100};

  .slider-wrapper {
    position: relative;
    height: 8px;
    border: 1px solid ${COLOR.gray100};
    border-radius: 10px;
    background-color: white;
  }
  .slider-between {
    position: absolute;
    top: -1px;
    height: 8px;
    background-color: ${COLOR.purple1}; // 선택된 영역의 색
    left: ${({ minValue }) => `${minValue}%`};
    right: ${({ maxValue }) => `${100 - maxValue}%`};
    border-radius: 10px;
    z-index: 1;
 }
  .slider {
    width: 100%;
    position: absolute;
    left: 0;
    top: -4px;
    -webkit-appearance: none; //브라우저에서 제공하는 range막대 기본속성 제거
    background: none; //막대 배경 없애기
    pointer-events: none; //range 자체에 버튼 비활성화 
  &::-webkit-slider-thumb { //버튼 디자인
    pointer-events: auto; //비활성화를 다시 활성화
    height: 14px;
    width: 14px;
    border-radius: 50%;
    border: 4px solid white;
    background-color: ${COLOR.purple1};
    -webkit-appearance: none;
    position: relative;
    z-index: 2;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.25);

    }
  }
`

