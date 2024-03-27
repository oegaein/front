import React, { useState, useEffect } from 'react';

//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'
import DoubleRangeSlider from '@components/RoommatePage/DoubleRangeSlider';
import { type } from '@testing-library/user-event/dist/type';
import Close from '@assets/images/close-white.svg'


function RoommateFilterPage() {
  const [filters, setFilters] = useState({
    sort: '', // 'latest' or 'deadline'
    peopleCount: [], // '1', '2', '3', '4' 중복 선택 가능
    gender: '', // 'female', 'male'
    dormitory: [], // 'A', 'B', 'C', 'D', 'E' 중복 선택 가능
    roomType: [], // '2인실', '4인실'
    minAge: 20,
    maxAge: 27,
    minYear: 17,
    maxYear: 24,
    mbti: [],
    sleepHabit: [],
    lifePattern: [],
    isSmoker: [],
    cleaningCycle: [],
    goOut: [],
    soundSensitivity: []

  });
  const iMbtis = ['ISTJ', 'ISTP', 'INFJ', 'INTJ', 'ISFJ', 'ISFP', 'INFP', 'INTP']
  const eMbtis = ['ESTJ', 'ESFP', 'ENFP', 'ENTP', 'ESFJ', 'ESTP', 'ENFJ', 'ENTJ']
  const [showAllMbtis, setShowAllMbtis] = useState(false)
  const handleChangeGenderValue = (value) => {
    if (value === 'male') {
      setFilters(prevFilters => ({
        ...prevFilters,
        dormitory : prevFilters.dormitory.filter(value => !['B', 'C', 'D'].includes(value))
      }))
    } else if (value === 'female') {
      setFilters(prevFilters => ({
        ...prevFilters,
        dormitory : prevFilters.dormitory.filter(value => !['A', 'E'].includes(value))
      }))
    } else if (value === ''){
      setFilters(prevFilters => ({
        ...prevFilters,
        dormitory : []
      }))
    }
  }
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'gender') {
      handleChangeGenderValue(value)
    }
    if (type === 'checkbox') {
      setFilters(prevFilters => ({
        ...prevFilters,
        [name]: checked
        ? [...prevFilters[name], value] 
        : prevFilters[name].filter(item => item !== value), 
      }))
    } else {
      setFilters(prevFilters => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

  const deleteOption = (e) => {
    const { name, value } = e.target;
    if (name === 'gender') {
      handleChangeGenderValue('')
    }
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: Array.isArray(prevFilters[name])
      ? prevFilters[name].filter(item => item !== value)
      : ''
    }))
  }

  const handleShowAllMbtis = () => {
    setShowAllMbtis(prevShowAllMbtis => !prevShowAllMbtis)
  }

  const handleClickResetBtn = () => {

  }
  const handleClickFilterBtn = () => {

  }

  useEffect(()=> {
    console.log(filters)
  }, [filters])

  return (
    <SettingStyle className='flex flex-col'>
      <div className='tag-container bg-white flex gap-[10px] sticky top-0 overflow-x-scroll'>
      {
        Object.entries(filters).map(([key, value]) => {
          console.log(`${key} : ${value}, ${typeof(value)}`);
          if (Array.isArray(value)) {
            // 배열인 경우의 값들을 제대로 리턴하기 위해 수정
            return (
              <>
                {value.map((item, index) => (
                  <button className='selected-tag' onClick={deleteOption} value={item} name={key} key={index}>
                    {item}
                    <img className='ml-[8px] h-[12px] w-[12px]' src={Close} alt='close button'/>
                  </button> // 배열의 각 요소를 div로 감싸서 리턴
                ))}
              </>
            );
          } else {
            return (
              <button className='selected-tag' onClick={deleteOption} value={value} name={key} key={key}>
                {value}
                <img className='ml-[5px] h-[12px] w-[12px]' src={Close} alt='close button'/>
              </button>
            );
          }
        })
      }

      </div>
      {/* 정렬 */}
      <div className='filter-section'>
        <h1 className='filter-title'>정렬</h1>
        <div className='filter-text flex flex-col gap-[16px]'>
          <label><input type="radio" name="sort" value="latest" checked={filters.sort === 'latest'} onChange={handleChange}/> 최신순</label>
          <label><input type="radio" name="sort" value="deadline" checked={filters.sort === 'deadline'} onChange={handleChange} /> 마감순</label>
        </div>
      </div>
      {/* 모집인원 */}
      <div className='filter-section'>
        <h1 className='filter-title'>모집 인원</h1>
        <div className='flex'>
        {[1, 2, 3, 4].map(number => (
          <label className={`filter-input ${filters.peopleCount.includes(`${number}`) && 'selected'}`} key={number}><input type="checkbox" name="peopleCount" value={number} checked={filters.peopleCount.includes(`${number}`)} onChange={handleChange} hidden/> {number}인</label>
        ))}
        </div>
      </div>
      {/* 성별 */}
      <div className='filter-section'>
        <h1 className='filter-title'>성별</h1>
        <label className={`filter-input ${filters.gender === 'male' && 'selected'}`}><input type="radio" name="gender" value="male" checked={filters.gender === 'male'} onChange={handleChange} hidden/> 남성</label>
        <label className={`filter-input ${filters.gender ===  'female' && 'selected'}`}><input type="radio" name="gender" value="female" checked={filters.gender === 'female'} onChange={handleChange} hidden/> 여성</label>
      </div>
       {/* 기숙사 동 */}
      <div className='filter-section'>
        <div className='flex items-center'>
          <h1 className='filter-title mr-[10px]'>기숙사 동</h1>
          <h2 className='filter-subtitle'>* 성별 지정 후, 선택해주세요</h2>
        </div>
        <h2 className='filter-subtitle'>남자기숙사</h2>
        <div className='mb-[16px]'>
        {['A', 'E'].map(dorm => (
          <label key={dorm} className={`filter-input ${filters.dormitory.includes(`${dorm}`) && 'selected'}`}>
            <input type="checkbox" name="dormitory" value={dorm} checked={filters.dormitory.includes(`${dorm}`)} disabled={!filters.gender || filters.gender === 'female'} onChange={handleChange} hidden/>
            {dorm}동
          </label>
        ))}
        </div>
        <h2 className='filter-subtitle'>여자기숙사</h2>
        <div>
        {['B', 'C', 'D'].map(dorm => (
          <label key={dorm} className={`filter-input ${filters.dormitory.includes(`${dorm}`) && 'selected'}`}>
            <input type="checkbox" name="dormitory" value={dorm} checked={filters.dormitory.includes(`${dorm}`)} disabled={!filters.gender || filters.gender === 'male'} onChange={handleChange} hidden/>
            {dorm}동
          </label>
        ))}
        </div>
      </div>
      {/* 호실 유형 */}
      {(filters.dormitory.some(i => ['D', 'E'].includes(i))) &&
      <div className='filter-section'>
        <h1 className='filter-title'>호실 유형</h1>
        <h2 className='filter-subtitle'>* D동 E동만 해당</h2>
        <label className='filter-input'>
          <input type="checkbox" name='roomType' value='2인실' onChange={handleChange} hidden/>
          2인실
        </label>
        <label className='filter-input'>
          <input type="checkbox" name='roomType' value='4인실' onChange={handleChange} hidden/>
          4인실
        </label>
      </div>
      }
      {/* 나이, 학번 */}
      <DoubleRangeSlider type='나이' setFilters={setFilters} minValue={filters.minAge} maxValue={filters.maxAge}/>
      <DoubleRangeSlider type='학번' setFilters={setFilters} minValue={filters.minYear} maxValue={filters.maxYear}/>
      {/* MBTI */}
      <div className='filter-section'>
        <h1 className='filter-title'>MBTI</h1>
        <h2 className='filter-subtitle'>내향형</h2>
        <div className='flex flex-wrap content-between h-[84px] mb-[24px]'>
          {
            iMbtis.map(mbti => (
              <label className={`filter-input w-[73px] ${filters.mbti.includes(`${mbti}`) && 'selected'}`}><input type="checkbox" name="mbti" value={mbti} checked={filters.mbti.includes(mbti)} onChange={handleChange} hidden/> {mbti}</label>
            ))
          }
        </div>
        {showAllMbtis ?
        <>
          <h2 className='filter-subtitle'>외향형</h2>
          <div className='flex flex-wrap h-[84px] mb-[24px] content-between'>
            {
              eMbtis.map(mbti => (
                <label className={`filter-input w-[73px] ${filters.mbti.includes(`${mbti}`) && 'selected'}`}><input type="checkbox" name="mbti" value={mbti} checked={filters.mbti.includes(mbti)} onChange={handleChange} hidden/> {mbti}</label>
              ))
            }
          </div>
          <button className='purple-btn' onClick={handleShowAllMbtis}>닫기</button>
        </>
        :
          <button className='purple-btn mt-[8px]' onClick={handleShowAllMbtis}>필터 더보기</button>
        }
      </div>
      <div className='filter-section'>
        <h1 className='filter-title'>수면 습관</h1>
        <div className='flex flex-wrap content-between h-[84px]'>
          {['코골이형', '이갈이형', '잠꼬대형', '무소음형'].map(sleepHabit => (
            <label className={`filter-input ${filters.sleepHabit.includes(`${sleepHabit}`) && 'selected'}`}><input type="checkbox" name="sleepHabit" value={sleepHabit} checked={filters.sleepHabit.includes(sleepHabit)} onChange={handleChange} hidden/> {sleepHabit}</label>
          ))}
        </div>
      </div>
      <div className='filter-section'>
        <h1 className='filter-title'>생활 패턴</h1>
        <div className='flex'>
          {['아침형', '저녁형'].map(lifePattern => (
            <label className={`filter-input ${filters.lifePattern.includes(`${lifePattern}`) && 'selected'}`}><input type="checkbox" name="lifePattern" value={lifePattern} checked={filters.lifePattern.includes(lifePattern)} onChange={handleChange} hidden/> {lifePattern}</label>
          ))}
        </div>
      </div>
      <div className='filter-section'>
        <h1 className='filter-title'>흡연 여부</h1>
        <div className='flex'>
          {['흡연', '비흡연'].map(isSmoker => (
            <label className={`filter-input ${filters.isSmoker.includes(`${isSmoker}`) && 'selected'}`}><input type="checkbox" name="isSmoker" value={isSmoker} checked={filters.isSmoker.includes(isSmoker)} onChange={handleChange} hidden/> {isSmoker}</label>
          ))}
        </div>
      </div>
      <div className='filter-section'>
        <h1 className='filter-title'>청소 주기</h1>
        <div className='flex flex-wrap content-between h-[84px]'>
          {['매일', '주 1회 이상', '월 1회 이상', '생각날 때 가끔'].map(cleaningCycle => (
            <label className={`filter-input ${filters.cleaningCycle.includes(`${cleaningCycle}`) && 'selected'}`}><input type="checkbox" name="cleaningCycle" value={cleaningCycle} checked={filters.cleaningCycle.includes(cleaningCycle)} onChange={handleChange} hidden/> {cleaningCycle}</label>
          ))}
        </div>
      </div>
      <div className='filter-section'>
        <h1 className='filter-title'>외출 빈도</h1>
        <div className='flex'>
          {['집순이', '밖순이'].map(goOut => (
            <label className={`filter-input ${filters.goOut.includes(`${goOut}`) && 'selected'}`}><input type="checkbox" name="goOut" value={goOut} checked={filters.goOut.includes(goOut)} onChange={handleChange} hidden/> {goOut}</label>
          ))}
        </div>
      </div>
      <div className='filter-section'>
        <h1 className='filter-title'>소리 민감 정도</h1>
        <div className='flex'>
          {['예민한편', '둔감한편'].map(soundSensitivity => (
            <label className={`filter-input ${filters.soundSensitivity.includes(`${soundSensitivity}`) && 'selected'}`}><input type="checkbox" name="soundSensitivity" value={soundSensitivity} checked={filters.soundSensitivity.includes(soundSensitivity)} onChange={handleChange} hidden/> {soundSensitivity}</label>
          ))}
        </div>
      </div>
      <div className='flex items-center justify-between h-[91px] px-[25px]'>
        <button onClick={handleClickResetBtn} className='reset-btn'>초기화</button>
        <button onClick={handleClickFilterBtn} className='filter-btn'>350개 글보기</button>
      </div>
    </SettingStyle>
  );
}

export default RoommateFilterPage;


const SettingStyle = styled.main`
  text-align: left;
  .filter-section {
    padding: 25px;
    border-bottom: 1px solid ${COLOR.gray100};
  }
  .filter-text {
    font-size: ${FONT.body5M15};
    color: ${COLOR.gray600};
  }
  .filter-input {
    text-align: center;
    cursor: pointer;
    margin-right: 10px;
    box-sizing: border-box;
    padding: 6px 20px;
    border: 1px solid ${COLOR.gray100};
    border-radius: 15px;
    font-size: ${FONT.body5M15};
    color: ${COLOR.gray600};
    &.selected {
      background-color: ${COLOR.purple2};
      border-color: ${COLOR.purple2};
      color: black;
    }
  }
  .filter-title {
    font-size: ${FONT.title3SB17};
    margin-bottom: 16px;
  }
  .filter-subtitle {
    font-size: ${FONT.caption1SB14};
    color: ${COLOR.gray400};
    margin-bottom: 16px;
  }
  .purple-btn {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.purple1};
  }
  .selected-tag {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${COLOR.gray600};
    color: white;
    padding: 7px 20px;
    border-radius: 15px;
    white-space: nowrap;
  }
  .tag-container {
    /* -ms-overflow-style: none;  
  scrollbar-width: none;  Firefox */
  }
  .tag-container::-webkit-scrollbar {
    /* display: none; */
  }
  .reset-btn {
    font-size: ${FONT.buttonSB15};
    height: 52px;
    padding: 0 22px;
    border: 1px solid ${COLOR.gray200};
    border-radius: 10px;
  }
  .filter-btn {
    font-size: ${FONT.buttonSB15};
    color: white;
    background-color: ${COLOR.purple1};
    padding: 0 83px;
    height: 52px;
    border-radius: 10px;
  }
`