import React, { useState, useEffect } from 'react';
import { throttle } from 'lodash';
import { useNavigate } from 'react-router-dom';

//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'
import DoubleRangeSlider from '@components/RoommatePage/DoubleRangeSlider';
import { type } from '@testing-library/user-event/dist/type';
import Close from '@assets/images/close-white.svg'
import Header from '@common/header/Header';
import RoommateScrollList from '@common/RoommateScrollList';
import { useMatchingPosts } from '@hooks/useMatchingPosts';
import { matchingPostsData } from 'mocks/api/data/matchingPostsData';
function RoommateFilterPage() {
  const navigate = useNavigate()
  const [screenType, setScreenType] = useState('filters')  //filters||results
	const { data: matchingPosts, isLoading, error } = useMatchingPosts('new');
  const [filteredPosts, setFilteredPosts] = useState([])
  useEffect(() => {
    console.log(filteredPosts); // 여기서는 업데이트된 상태를 볼 수 있음
  }, [filteredPosts]); // myState가 변경될 때마다 실행
  const [filters, setFilters] = useState({
    sort: '', // 'latest' or 'deadline'
    targetNumberOfPeople: [], // '1인', '2인', '3인', '4인' 중복 선택 가능
    gender: '', // '여성', '남성'
    dong: [], // 'A', 'B', 'C', 'D', 'E' 중복 선택 가능
    roomSize: [], // '2인실', '4인실'
    minAge: 20,
    maxAge: 35,
    minYear: 14,
    maxYear: 24,
    mbti: [],
    sleepingHabits: [],
    lifePattern: [],
    smoking: [],
    cleaningCycle: [],
    outing: [],
    sensitivity: []
  });
  const [selectedFilters, setSelectedFilters] = useState([])
  const iMbtis = ['ISTJ', 'ISTP', 'INFJ', 'INTJ', 'ISFJ', 'ISFP', 'INFP', 'INTP']
  const eMbtis = ['ESTJ', 'ESFP', 'ENFP', 'ENTP', 'ESFJ', 'ESTP', 'ENFJ', 'ENTJ']
  const [showAllMbtis, setShowAllMbtis] = useState(false)
  const [isLowerBarVisible, setIsLowerBarVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY)

  const handleScroll = throttle(() => {
    const currentScrollPos = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
    //페이지 총 높이
    //맨 밑으로 이동되었는지 확인하는 변수 
    let isBottom = currentScrollPos >= maxScroll-1

    setIsLowerBarVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10 || isBottom)
    setPrevScrollPos(currentScrollPos)
  }, 200)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return ()=> {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos, isLowerBarVisible, handleScroll])
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
    setFilters({
      sort: '', // 'latest' or 'deadline'
      targetNumberOfPeople: [], // '1', '2', '3', '4' 중복 선택 가능
      gender: '', // '여성', '남성'
      dong: [], // 'A', 'B', 'C', 'D', 'E' 중복 선택 가능
      roomSize: [], // '2인실', '4인실'
      minAge: 20,
      maxAge: 35,
      minYear: 14,
      maxYear: 24,
      mbti: [],
      sleepingHabits: [],
      lifePattern: [],
      smoking: [],
      cleaningCycle: [],
      outing: [],
      sensitivity: []
    })
    setSelectedFilters([])
  }
  
  const handleClickFilterBtn = () => {
    setScreenType('results')
    // console.log(filters)
  }


  useEffect(() => {
    // matchingPosts.data가 존재하고, 길이가 0보다 클 때만 필터링 로직 실행
    if (matchingPosts?.data?.length > 0) {
        const filtered = matchingPosts.data.filter(post => {
          const now = new Date()
          const age = now.getFullYear() - Number(post.birthdate.substring(0,4)) + 1
  
          return (filters.targetNumberOfPeople.length === 0 || filters.targetNumberOfPeople.includes(`${post.targetNumberOfPeople}인`)) &&
                (filters.gender === '' || filters.gender === post.gender) &&
                (filters.dong.length === 0 || filters.dong.includes(post.dong)) &&
                (filters.roomSize.length === 0 || filters.roomSize.includes(post.roomSize)) &&
                (filters.mbti.length === 0 || filters.mbti.includes(post.mbti)) &&
                (filters.sleepingHabits.length === 0 || filters.sleepingHabits.some(habit => post.SleepingHabits.includes(habit))) &&
                (filters.lifePattern.length === 0 || filters.lifePattern.includes(post.lifePattern)) &&
                (filters.smoking.length === 0 || filters.smoking.includes(post.smoking)) &&
                (filters.cleaningCycle.length === 0 || filters.cleaningCycle.includes(post.cleaningCycle)) &&
                (filters.outing.length === 0 || filters.outing.includes(post.outing)) &&
                (filters.sensitivity.length === 0 || filters.sensitivity.includes(post.sensitivity)) &&
                ((age >= filters.minAge) && (age <= filters.maxAge)) &&
                ((Number(post.studentNo) >= filters.minYear) && (Number(post.studentNo) <= filters.maxYear))
        });
        if (filters.sort === '최신순') {
          const sorted = filtered.sort((a, b) => {
            const dateA = new Date(a.createdAt)
            const dateB = new Date(b.createdAt)
            return dateB - dateA
          })
          setFilteredPosts(sorted)
          
        } else if (filters.sort === '마감순') {
          const sorted = filtered.sort((a, b) => {
            const dateA = new Date(a.createdAt)
            const dateB = new Date(b.createdAt)
            return dateA - dateB 
          })
          setFilteredPosts(sorted);
        } else {
          setFilteredPosts(filtered);
        }
    } else {
        // matchingPosts.data가 없는 경우, filteredPosts를 빈 배열로 설정
        setFilteredPosts([]);
    }
}, [filters, matchingPosts]);
  useEffect(()=>{console.log(filters)}, [filters])

  return (
    <SettingStyle className='flex flex-col'>
      <div className="px-[28px]">
				<Header backPath="/roommate" rightContent=" " rightEvent={() => {}}>
					<span>필터</span>
				</Header>
			</div>
      {screenType==='results' ? <RoommateScrollList type='filters' filteredPosts={filteredPosts} setScreenType={setScreenType}/> :
      <section>

        {selectedFilters.length > 0 &&
          <div className='tag-container bg-white flex gap-[10px] sticky z-10 top-0 overflow-x-scroll pt-[10px] pb-[25px] pl-[25px]'>
            {selectedFilters.map((item, index) => {
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
            })}
          </div> 
        }
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
              <label className={`filter-input ${filters.targetNumberOfPeople.includes(`${number}`) && 'selected'}`} key={index}>
                <input type="checkbox" name="targetNumberOfPeople" data-testid={number} value={number} checked={filters.targetNumberOfPeople.includes(`${number}`)} onChange={handleChange} hidden/>
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
            {['코골이형', '이갈이형', '잠꼬대형', '무소음형'].map((sleepingHabits, index) => (
              <label key={index} className={`filter-input ${filters.sleepingHabits.includes(sleepingHabits) && 'selected'}`}>
                <input type="checkbox" name="sleepingHabits" value={sleepingHabits} checked={filters.sleepingHabits.includes(sleepingHabits)} onChange={handleChange} hidden/> 
                {sleepingHabits}
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
            {['흡연', '비흡연'].map((smoking, index) => (
              <label className={`filter-input ${filters.smoking.includes(smoking) && 'selected'}`} key={index}><input type="checkbox" name="smoking" value={smoking} checked={filters.smoking.includes(smoking)} onChange={handleChange} hidden/>{smoking}</label>
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
            {['집순이', '밖순이'].map((outing, index) => (
              <label className={`filter-input ${filters.outing.includes(outing) && 'selected'}`} key={index}><input type="checkbox" name="outing" value={outing} checked={filters.outing.includes(outing)} onChange={handleChange} hidden/>{outing}</label>
            ))}
          </div>
        </div>
        <div className='filter-section'>
          <h1 className='filter-title'>소리 민감 정도</h1>
          <div className='flex'>
            {['예민한편', '둔감한편'].map((sensitivity, index) => (
              <label className={`filter-input ${filters.sensitivity.includes(sensitivity) && 'selected'}`} key={index}><input type="checkbox" name="sensitivity" value={sensitivity} checked={filters.sensitivity.includes(sensitivity)} onChange={handleChange} hidden/>{sensitivity}</label>
            ))}
          </div>
        </div>
        <div className={`filter-section bg-white z-50 fixed bottom-0 flex items-center justify-between gap-[10px] h-[91px]
        transition-transform duration-300 ${isLowerBarVisible ? 'translate-y-0' : 'translate-y-full'}`}>
          <button onClick={handleClickResetBtn} className='reset-btn whitespace-nowrap'>초기화</button>
          <button onClick={handleClickFilterBtn} className='filter-btn whitespace-nowrap'>{filteredPosts.length}개 글보기</button>
        </div>
      </section>
      }
    </SettingStyle>
  );
}

export default RoommateFilterPage;


const SettingStyle = styled.main`
  text-align: left;
  .filter-section {
    padding: 25px;
    border-top: 1px solid ${COLOR.gray100};
    width: 393px;
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
    border-radius: 15px;
    white-space: nowrap;
  }
  .tag-container {
    /* -ms-overflow-style: none;  
  scrollbar-width: none;  Firefox */
    border-bottom: 1px solid ${COLOR.gray100};
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
    &:hover {
      opacity: 0.5;
    }
  }
  .filter-btn {
    font-size: ${FONT.buttonSB15};
    color: white;
    background-color: ${COLOR.purple1};
    height: 52px;
    flex: 1;
    border-radius: 10px;
    &:hover {
      opacity: 0.5;
    }
  }
`