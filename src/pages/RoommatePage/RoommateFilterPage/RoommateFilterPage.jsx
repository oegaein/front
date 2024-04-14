import React, { useState, useEffect } from 'react';

//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'
import DoubleRangeSlider from '@components/RoommatePage/DoubleRangeSlider';
import { type } from '@testing-library/user-event/dist/type';
import Close from '@assets/images/close-white.svg'
import Header from '@common/header/Header';


function RoommateFilterPage() {
  const [filters, setFilters] = useState({
    sort: '', // 'latest' or 'deadline'
    peopleCount: [], // '1', '2', '3', '4' 중복 선택 가능
    gender: '', // '여성', '남성'
    dong: [], // 'A', 'B', 'C', 'D', 'E' 중복 선택 가능
    roomSize: [], // '2인실', '4인실'
    minAge: 20,
    maxAge: 35,
    minYear: 14,
    maxYear: 24,
    mbti: [],
    sleepHabit: [],
    lifePattern: [],
    isSmoker: [],
    cleaningCycle: [],
    goOut: [],
    soundSensitivity: []
  });
  const [selectedFilters, setSelectedFilters] = useState([])
  const iMbtis = ['ISTJ', 'ISTP', 'INFJ', 'INTJ', 'ISFJ', 'ISFP', 'INFP', 'INTP']
  const eMbtis = ['ESTJ', 'ESFP', 'ENFP', 'ENTP', 'ESFJ', 'ESTP', 'ENFJ', 'ENTJ']
  const [showAllMbtis, setShowAllMbtis] = useState(false)

  //selectedFilters 관련 함수
  const handleSelectedFilter = (name, value, checked) => {
    setSelectedFilters(prevFilters => {
      let updatedSelectedFilters = []
      if (checked) {
        if (name === 'sort') {
          updatedSelectedFilters = [{name, value}, ...prevFilters.filter(item => item.name !== 'sort')]
        } else {
          updatedSelectedFilters = [{name, value}, ...prevFilters]
        }
      } else {
        if (['minAge', 'maxAge'].includes(name)) {
          updatedSelectedFilters = prevFilters.filter(item => item.name !== 'minAge' && item.name !== 'maxAge')
        } else if (['minYear', 'maxYear'].includes(name)) {
          updatedSelectedFilters = prevFilters.filter(item => item.name !== 'minYear' && item.name !== 'maxYear')
        } else {
          updatedSelectedFilters = prevFilters.filter(item => item.value !== value)
        }
      }

      return updatedSelectedFilters
    })
  }

  const handleSelectedGenderValue = (value) => {
    setSelectedFilters(prevFilters => {
      let updatedSelectedFilters = []
      //남자로 변경하면, 여자동 B, C, D 삭제 & 기존에 있던 gender 값 삭제 & roomSize 삭제
      if (value === '남성') {
        updatedSelectedFilters = prevFilters.filter(item => (!['B', 'C', 'D'].includes(item.value) && item.name !== 'gender' && item.name !== 'roomSize'))
      } else if (value === '여성') {
        updatedSelectedFilters = prevFilters.filter(item => (!['A', 'E'].includes(item.value) && item.name !== 'gender' && item.name !== 'roomSize'))
      } else if (value === '') {
        updatedSelectedFilters = prevFilters.filter(item => (!['A', 'B', 'C', 'D' ,'E'].includes(item.value) && item.name !== 'gender' && item.name !== 'roomSize'))
      }

      return updatedSelectedFilters
    })
  }

  const handleChangeGenderValue = (e) => {
    const { name, value, checked } = e.target;

    handleSelectedGenderValue(value)
    setFilters(prevFilters => {
      let updateddong = {}
      //값을 남자로 변경하면, 여자동인 B, C, D를 삭제 & 호실 유형도 삭제
      if (value === '남성') {
        updateddong = {
          ...prevFilters,
          dong : prevFilters.dong.filter(item => !['B동', 'C동', 'D동'].includes(item)),
          roomSize : [],
          gender : value,
        }
      //값을 여자로 변경하면, 남자동인 A, E를 삭제 & 호실 유형도 삭제
      } else if (value === '여성') {
        updateddong = {
          ...prevFilters,
          dong : prevFilters.dong.filter(item => !['A동', 'E동'].includes(item)),
          roomSize : [],
          gender : value,
        }
      }
      return updateddong
    })
    handleSelectedFilter(name, value, checked)
  }

  //값 변경 
  //target이 중복 선택 가능일때: checked면 삽입, 아니면 삭제
  //target이 단일 선택일때(성별만 해당): 값만 변경
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    //중복 가능 필터일때
    if (type === 'checkbox') {
      setFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked
      ? [...prevFilters[name], value]
      : prevFilters[name].filter(item => item !== value),
      }))
      //중복 불가능 필터일때
    } else {
      setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
      }));
    }
    handleSelectedFilter(name, value, checked)
  }

  const handleChangeDong = (e) => {
    const { name, value, checked } = e.target;    
    //name이 기숙사 동일때 체크가 해제되어 있다면 호실 유형을 지운다 
    if ((value === 'D동' && filters.gender === '여성') || (value === 'E동' && filters.gender === '남성')) {
      !checked &&
      setFilters(prevFilters => ({
        ...prevFilters,
        roomSize : []
      }))
      setSelectedFilters(prevFilters => (
        prevFilters.filter(item => item.name !== 'roomSize')
      ))
    }
    //중복 가능 필터일때
    setFilters(prevFilters => ({
    ...prevFilters,
    [name]: checked
    ? [...prevFilters[name], value]
    : prevFilters[name].filter(item => item !== value),
    }))
    handleSelectedFilter(name, value, checked)
  }


  const getInitialValueByName = (name) => {
    switch (name) {
      case 'minAge':
        return 20;
      case 'maxAge':
        return 35;
      case 'minYear':
        return 14;
      case 'maxYear':
        return 24;
      default:
        return null; // 또는 적합한 기본값
    }
  }

  const deleteOption = (e) => {
    const { name, value } = e.currentTarget;
    if (name === 'gender') {
      setFilters(prevFilters => ({
        ...prevFilters,
        dong: [],
        roomSize : [],
        gender : '',
      }))
    }
    handleSelectedFilter(name, value, false)
    if (['minAge', 'maxAge', 'minYear', 'maxYear'].includes(name)) {
      setFilters(prevFilters => ({
        ...prevFilters,
        [name] : getInitialValueByName(name)
      }))
      return
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
    console.log(filters)
  }

  useEffect(()=> {
    console.log(selectedFilters)
  }, [selectedFilters])

  return (
    <SettingStyle className='flex flex-col'>
      {/* <div className="px-[28px]">
				<Header backPath="/roommate" rightContent=" " rightEvent={() => {}}>
					<span>필터</span>
				</Header>
			</div> */}
      <div className='tag-container bg-white flex gap-[10px] sticky z-10 top-0 overflow-x-scroll'>
      {
        selectedFilters.map((item, index) => {
          // Age 또는 Year 필터인지 확인
          const isAgeFilter = item.name === 'minAge' || item.name === 'maxAge'
          const isYearFilter = item.name === 'minYear' || item.name === 'maxYear'

          // minAge, maxAge, minYear, maxYear 값을 찾음
          const minAge = selectedFilters.find(filter => filter.name === 'minAge')?.value ?? getInitialValueByName('minAge')
          const maxAge = selectedFilters.find(filter => filter.name === 'maxAge')?.value ?? getInitialValueByName('maxAge')
          const minYear = selectedFilters.find(filter => filter.name === 'minYear')?.value ?? getInitialValueByName('minYear')
          const maxYear = selectedFilters.find(filter => filter.name === 'maxYear')?.value ?? getInitialValueByName('maxYear')

          return (
            isAgeFilter ? (
              <>
              {item.name === 'maxAge' && (
              <button className='selected-tag' onClick={deleteOption} value={item.value} name={item.name} key={index}>
                {minAge}세 ~ {maxAge}세
                <img className='ml-[5px] h-[12px] w-[12px]' src={Close} alt='close button'/>
              </button> 
              )}
              </>
            ) :
            isYearFilter ? (
              <>
              {item.name === 'minYear' && (
              <button className='selected-tag' onClick={deleteOption} value={item.value} name={item.name} key={index}>
                {minYear}학번 ~ {maxYear}학번
                <img className='ml-[5px] h-[12px] w-[12px]' src={Close} alt='close button'/>
              </button> 
              )}
              </>
            ) : (
            <button className='selected-tag' onClick={deleteOption} value={item.value} name={item.name} key={index}>
              {item.value}
              <img className='ml-[5px] h-[12px] w-[12px]' src={Close} alt='close button'/>
            </button> 
            )
          )
      })
      }
      </div>
      {/* 정렬 */}
      <div className='filter-section'> 
        <h1 className='filter-title'>정렬</h1> 
        <div className='filter-text flex flex-col gap-[16px]'> 
        {
          ['최신순', '마감순'].map((sort, index) => (
            <label key={index}><input type="radio" name="sort" value={sort} checked={filters.sort === sort} onChange={handleChange}/> {sort}</label> 
          ))
        }
        </div> 
      </div> 
      {/* 모집인원 */} 
      <div className='filter-section'> 
        <h1 className='filter-title'>모집 인원</h1> 
        <div className='flex'> 
          {['1인', '2인', '3인', '4인'].map((number, index) => ( 
            <label className={`filter-input ${filters.peopleCount.includes(`${number}`) && 'selected'}`} key={index}>
              <input type="checkbox" name="peopleCount" data-testid={number} value={number} checked={filters.peopleCount.includes(`${number}`)} onChange={handleChange} hidden/>
              {number}
            </label> 
          ))} 
        </div> 
      </div> 
      {/* 성별 */} 
      <div className='filter-section'> 
        <h1 className='filter-title'>성별</h1> 
        {['남성', '여성'].map((gender, index) => (
        <label className={`filter-input ${filters.gender === gender && 'selected'}`} key={index}>
          <input type="radio" name="gender" value={gender} checked={filters.gender === gender} onChange={handleChangeGenderValue} hidden/>{gender}
        </label> 
        ))}
      </div>
       {/* 기숙사 동 */}
      <div className='filter-section'>
        <div className='flex items-center'>
          <h1 className='filter-title mr-[10px]'>기숙사 동</h1>
          <h2 className='filter-subtitle'>* 성별 지정 후, 선택해주세요</h2>
        </div>
        <h2 className='filter-subtitle'>남자기숙사</h2>
        <div className='mb-[16px]'>
          {['A동', 'E동'].map((dorm, index) => (
            <label key={index} className={`filter-input ${filters.dong.includes(dorm) && 'selected'} ${(!filters.gender || filters.gender === '여성') && 'disabled'}`}>
              <input type="checkbox" name="dong" value={dorm} checked={filters.dong.includes(dorm)} disabled={!filters.gender || filters.gender === '여성'} onChange={handleChangeDong} hidden/>
              {dorm}
              <div className={`disabled-line ${(!filters.gender || filters.gender === '여성') && 'disabled'}`}></div>
            </label>
          ))}
        </div>
        <h2 className='filter-subtitle'>여자기숙사</h2>
        <div>
          {['B동', 'C동', 'D동'].map((dorm, index) => (
            <label key={index} className={`filter-input ${filters.dong.includes(dorm) && 'selected'} ${(!filters.gender || filters.gender === '남성') && 'disabled'}`}>
              <input type="checkbox" name="dong" value={dorm} checked={filters.dong.includes(dorm)} disabled={!filters.gender || filters.gender === '남성'} onChange={handleChangeDong} hidden/>
              {dorm}
              <div className={`disabled-line ${(!filters.gender || filters.gender === '남성') && 'disabled'}`}></div>
            </label>
          ))}
        </div>
      </div>
      {/* 호실 유형 */}
      {/* D동,E동 중 하나라도 들어있다면 */}
      {filters.dong.some(i => ['D동', 'E동'].includes(i)) &&
        <div className='filter-section'>
          <h1 className='filter-title'>호실 유형</h1>
          <h2 className='filter-subtitle'>* D동 E동만 해당</h2>
          {
            ['2인실', '4인실'].map((roomSize, index) => (
            <label key={index} className={`filter-input ${filters.roomSize.includes(roomSize) && 'selected'}`}>
              <input type="checkbox" name='roomSize' value={roomSize} checked={filters.roomSize.includes(roomSize)} onChange={handleChange} hidden/>
              {roomSize}
            </label>
            ))
          }
        </div>
      }

      {/* 나이, 학번 */}
      <DoubleRangeSlider type='나이' setFilters={setFilters} setSelectedFilters={setSelectedFilters} minValue={filters.minAge} maxValue={filters.maxAge}/>
      <DoubleRangeSlider type='학번' setFilters={setFilters} setSelectedFilters={setSelectedFilters} minValue={filters.minYear} maxValue={filters.maxYear}/>
      {/* MBTI */}
      <div className='filter-section'>
        <h1 className='filter-title'>MBTI</h1>
        <h2 className='filter-subtitle'>내향형</h2>
        <div className='flex flex-wrap content-between h-[84px] mb-[24px]'>
          {
            iMbtis.map((mbti, index) => (
              <label className={`filter-input w-[73px] ${filters.mbti.includes(mbti) && 'selected'}`} key={index}><input type="checkbox" name="mbti" value={mbti} checked={filters.mbti.includes(mbti)} onChange={handleChange} hidden/> {mbti}</label>
            ))
          }
        </div>
        {showAllMbtis ?
        <>
          <h2 className='filter-subtitle'>외향형</h2>
          <div className='flex flex-wrap h-[84px] mb-[24px] content-between'>
            {
              eMbtis.map((mbti, index) => (
                <label className={`filter-input w-[73px] ${filters.mbti.includes(mbti) && 'selected'}`} key={index}><input type="checkbox" name="mbti" value={mbti} checked={filters.mbti.includes(mbti)} onChange={handleChange} hidden/> {mbti}</label>
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
          {['코골이형', '이갈이형', '잠꼬대형', '무소음형'].map((sleepHabit, index) => (
            <label key={index} className={`filter-input ${filters.sleepHabit.includes(sleepHabit) && 'selected'}`}>
              <input type="checkbox" name="sleepHabit" value={sleepHabit} checked={filters.sleepHabit.includes(sleepHabit)} onChange={handleChange} hidden/> 
              {sleepHabit}
            </label>
          ))}
        </div>
      </div>
      <div className='filter-section'>
        <h1 className='filter-title'>생활 패턴</h1>
        <div className='flex'>
          {['아침형', '저녁형'].map((lifePattern, index) => (
            <label className={`filter-input ${filters.lifePattern.includes(lifePattern) && 'selected'}`} key={index}><input type="checkbox" name="lifePattern" value={lifePattern} checked={filters.lifePattern.includes(lifePattern)} onChange={handleChange} hidden/>{lifePattern}</label>
          ))}
        </div>
      </div>
      <div className='filter-section'>
        <h1 className='filter-title'>흡연 여부</h1>
        <div className='flex'>
          {['흡연', '비흡연'].map((isSmoker, index) => (
            <label className={`filter-input ${filters.isSmoker.includes(isSmoker) && 'selected'}`} key={index}><input type="checkbox" name="isSmoker" value={isSmoker} checked={filters.isSmoker.includes(isSmoker)} onChange={handleChange} hidden/>{isSmoker}</label>
          ))}
        </div>
      </div>
      <div className='filter-section'>
        <h1 className='filter-title'>청소 주기</h1>
        <div className='flex flex-wrap content-between h-[84px]'>
          {['매일', '주 1회 이상', '월 1회 이상', '생각날 때 가끔'].map((cleaningCycle, index) => (
            <label className={`filter-input ${filters.cleaningCycle.includes(cleaningCycle) && 'selected'}`} key={index}><input type="checkbox" name="cleaningCycle" value={cleaningCycle} checked={filters.cleaningCycle.includes(cleaningCycle)} onChange={handleChange} hidden/>{cleaningCycle}</label>
          ))}
        </div>
      </div>
      <div className='filter-section'>
        <h1 className='filter-title'>외출 빈도</h1>
        <div className='flex'>
          {['집순이', '밖순이'].map((goOut, index) => (
            <label className={`filter-input ${filters.goOut.includes(goOut) && 'selected'}`} key={index}><input type="checkbox" name="goOut" value={goOut} checked={filters.goOut.includes(goOut)} onChange={handleChange} hidden/>{goOut}</label>
          ))}
        </div>
      </div>
      <div className='filter-section'>
        <h1 className='filter-title'>소리 민감 정도</h1>
        <div className='flex'>
          {['예민한편', '둔감한편'].map((soundSensitivity, index) => (
            <label className={`filter-input ${filters.soundSensitivity.includes(soundSensitivity) && 'selected'}`} key={index}><input type="checkbox" name="soundSensitivity" value={soundSensitivity} checked={filters.soundSensitivity.includes(soundSensitivity)} onChange={handleChange} hidden/>{soundSensitivity}</label>
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
    background-color: white;
    position: relative;
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
    &.disabled {
      background-color: ${COLOR.gray100};
      color: ${COLOR.gray600};
    }
  }
  .disabled-line {
    display: none;
    position: absolute;
    background-color: ${COLOR.gray400};
    top: 15px;
    left: 6.5px;
    width: 53px;
    height: 1px;
    transform: rotate(-31deg);
    &.disabled {
      display: block;
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
    margin-top: 10px;
    margin-bottom: 25px;
    border-radius: 15px;
    white-space: nowrap;
  }
  .tag-container {
    /* -ms-overflow-style: none;  
  scrollbar-width: none;  Firefox */
  }
  .tag-container::-webkit-scrollbar {
    display: none;
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