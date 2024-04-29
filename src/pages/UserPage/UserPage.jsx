import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import { API } from '@utils/api'

import Next from '@assets/images/next.svg'
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
const UserPage = () => {
  const [userInfo, setUserInfo] = useState({})
  let {memberId} = useParams()
  console.log(memberId)
  useEffect(()=>{
    const fetchUserInfoData = async () => {
      try {
        const response = await API.get(`/api/v1/member/profile/${memberId}`)
        setUserInfo(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserInfoData()
  }, [])

  return (
    <SettingStyle>
      <div className="px-[28px]">
				<Header backPath="/roommate" rightContent=" " rightEvent={() => {}}>
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

`