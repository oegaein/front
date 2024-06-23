import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { API } from '@utils/api'
import { throttle } from 'lodash';
import useAuthStore from '@store/authStore'

import Next from '@assets/images/next.svg'
import Dots from '@assets/images/header-dots.svg'
import BigRedHeart from '@assets/images/bigredheart.svg'
import BigEmptyHeart from '@assets/images/heart (10) 1.svg'
import Share from '@assets/images/share.svg'
//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

//components
import Header from '@common/header/Header'
import ProfileImageContainer from '@components/UserPage/ProfileImageContainer'
import RoommateReviewList from '@components/UserPage/RoommateReviewList'
import UserPageInfo from '@components/UserPage/UserPageInfo'
import UserLifeStyles from '@components/UserPage/UserLifeStyles'
import { profileData } from 'mocks/api/data/profileData'
import OptionModal from '@common/modal/OptionModal'

const UserPage = () => {
  const navigate = useNavigate()
  const setAccessToken = useAuthStore(state => state.setAccessToken)
  // const accessToken = useAuthStore.getState().accessToken
  const [userInfo, setUserInfo] = useState(profileData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLowerBarVisible, setIsLowerBarVisible] = useState(true)
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY)
  const [like, setLike] = useState(false)
  let {memberId} = useParams()
  const fetchUserInfoData = async () => {
    try {
      const response = await API.get(`/api/v1/member/profile/${memberId}`)
      setUserInfo(response.data)
      console.log(response.data)
    } catch (error) {
      console.error(error)
      if (error.response && error.response.status === 403) {
        try {
          const refreshResponse = await API.get(`/api/v1/member/refresh`)
          console.log('refresh', refreshResponse)
          setAccessToken(refreshResponse.data.access_token)
          const accessToken = useAuthStore.getState().accessToken
          console.log(accessToken)
          try {
            const response = await API.get(`/api/v1/member/profile/${memberId}`, {
              headers: { 'Authorization': `Bearer ${accessToken}`}
            })
            setUserInfo(response.data)
            console.log(response.data)
          } catch (error) {
            console.log('error')
            console.error(error)
          }

        } catch (error) {
          console.error(error)
          navigate('/login')
        }
      }
    }
  }
  const fetchMyInfoData = async () => {
    try {
      const response = await API.get(`/api/v1/member/my-profile`)
      setUserInfo(response.data)
      console.log('fetchMyInfoData',response.data)
    } catch (error) {
      console.error(error)
      if (error.response && error.response.status === 403) {
        try {
          const refreshResponse = await API.get(`/api/v1/member/refresh`)
          console.log(refreshResponse)
          setAccessToken(refreshResponse.data.access_token)
          const accessToken = useAuthStore.getState().accessToken
          console.log('authStore', accessToken)
          try {
            const response = await API.get(`/api/v1/member/my-profile`, {
              headers: { 'Authorization': `Bearer ${accessToken}`}
            })
            setUserInfo(response.data)
            console.log(response.data)
          } catch (error) {
            console.log('error')
            console.error(error)
          }

        } catch (error) {
          console.error(error)
          navigate('/login')
        }
      }
    }
  }
  const handleScroll = throttle(() => {
    const currentScrollPos = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight
    //페이지 총 높이
    //맨 밑으로 이동되었는지 확인하는 변수 
    let isBottom = currentScrollPos >= maxScroll-1

    setIsLowerBarVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10 || isBottom)
    setPrevScrollPos(currentScrollPos)
  }, 200)
  const fetchLikeData = async () => {
    try {
      const response = await API.post('/api/v1/member/like', {
        receiver_id: memberId
      })
      if(response.data.like_id) {
        setLike(true)
      }
    } catch(error) {
      console.error(error);
    }
  }
  const fetchDeleteLikeData = async () => {
    try {
      const response = await API.delete('/api/v1/member/like', {
        receiver_id: memberId
      })
      if (response.data.receiver_id) {

        setLike(false)
      }
    } catch(error) {
      console.error(error);
    }
  }
  const handleClickDotsBtn = () => {
    setIsModalOpen(true)
  }
  const blockUser = async (blocked_id) => {
    const response = await API.post('/api/v1/member/block', {
      blocked_id,
    })
    //완료되었는지 확인하는 로직 필요 
    alert('유저를 차단하였습니다.')
  }
  const checkLike = async () => {
    const response = await API.get(`/api/v1/member/profile/${memberId}`)
    console.log(response.data)
  }
  useEffect(()=>{
    if (memberId === 'my-profile') {
      fetchMyInfoData()
    } else {
      fetchUserInfoData()
    }
    // checkLike()
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return ()=> {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos, isLowerBarVisible, handleScroll])

  return (
    <SettingStyle>
      {isModalOpen &&
      <OptionModal
        options={[{content: '차단하기', func: ()=>blockUser(memberId)}]}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
      }
      <div className="px-[28px]">
				<Header backPath="/roommate" rightContent={Dots} rightEvent={handleClickDotsBtn}>
					<span>{userInfo.name} 님의 프로필</span>
				</Header>
			</div>
      <ProfileImageContainer introduction={userInfo.introduction}/>
      <div className='userinfolifestyles flex flex-col gap-[10px] border-b border-[#DEDEDE]'>
        <div className='bg-white'>
          <div className='user-info pt-[103px] pb-[24px]  px-[25px]'>
            <h1 className='information-title text-left mb-[16px]'>기본 정보</h1>
            <UserPageInfo userInfo={userInfo}/>
          </div>
          <div className='px-[25px] py-[24px]'>
            <h1 className='pb-[19px] text-left font-bold'>성향 및 라이프 스타일</h1>
            <UserLifeStyles userInfo={userInfo}/>
          </div>
        </div>
        <div>
          <div className='bg-white pt-[24px] px-[24px] flex justify-between items-center'>
            <h1 className='roommate-review-title'>받은 룸메이트 후기 2</h1>
            <Link to='reviews' className='more flex'>
              더보기
              <img src={Next} alt='see more icon'/>
            </Link>
          </div>
          <div className='bg-white py-[16px]'>
            <RoommateReviewList memberId={memberId}/>
          </div>
        </div>
      </div>
      <div className={`filter-section bg-white z-50 fixed bottom-0 flex items-center justify-between gap-[15px] h-[91px] w-[393px] px-[26px]
        transition-transform duration-300 ${isLowerBarVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className='flex gap-[21px]'>
          {(like && like === memberId) ? 
          <button onClick={fetchDeleteLikeData} className='whitespace-nowrap w-[22px]'><img src={BigRedHeart}/></button>
          :  
          <button onClick={fetchLikeData} className='whitespace-nowrap w-[22px]'><img src={BigEmptyHeart}/></button>
      }
      <button className='whitespace-nowrap'><img src={Share}/></button>
        </div>
        <button  className='filter-btn whitespace-nowrap'>매칭신청</button>
      </div>
    </SettingStyle>
  )
}

export default UserPage

const SettingStyle = styled.div`
  background-color: white;
  .userinfolifestyles {
    background-color: ${COLOR.gray50};
  }
  .user-info {
    border-bottom: 1px solid ${COLOR.gray200};
  }
  .information-title {
    font-size: ${FONT.title3SB17};
  }
  .roommate-review-title {
    font-size: ${FONT.title3SB17};
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