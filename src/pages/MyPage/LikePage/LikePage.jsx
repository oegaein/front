import React, {useState, useEffect} from 'react'
import Header from '@common/header/Header'
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'
import Profile from '@assets/images/profile-image.svg'
import LikeItem from '@components/LikePage/LikeItem'
import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';




const LikePage = () => {
  const [likeData, setLikeData] = useState([])
  const [uploadPostType, setUploadPostType] = useState('roommate')
  const handleClickUploadPost = (type) => {
    setUploadPostType(type)
  }

  useEffect(()=>{
		const fetchLikeData = async () => {
			try {
				const response = await makeAuthorizedRequest('/api/v1/member/like')
				setLikeData(response.data.data)
			} catch(error) {
				console.error(error);
        
			}
		}
		fetchLikeData()
	}, [])

  return (
    <SettingStyle>
      <div className="px-[28px]">
				<Header backPath="/mypage" rightContent=" " rightEvent={() => {}}>
					<span className='header'>좋아요한 룸메이트</span>
				</Header>
			</div>
      <div>
        <div className='flex'>
          <div onClick={()=>handleClickUploadPost('roommate')}className={`notification-title ${uploadPostType === 'roommate' && 'selected-title'}`}>룸메이트</div>
          {/* <div onClick={()=>handleClickUploadPost('delivery')}className={`notification-title ${uploadPostType === 'delivery' && 'selected-title'}`}>공동배달</div> */}
        </div>
      </div>
      <div className='likelist flex flex-col gap-[1px]'>
      {likeData.length > 0 ?
      likeData.map((like)=> <LikeItem profileImage={Profile} like={like} />)
      : <NoResults/>
    }
      </div>
    </SettingStyle>
  )
}

export default LikePage

const NoResults = () => {
  return (
    <p className='noresults bg-white pt-[138px]'>좋아요를 한 글이 없어요.</p>
  )
}

const SettingStyle = styled.main`
  .header {
    font: ${FONT.title2B19}
  }
  .notification-title {
    flex: 1;
    font-size: ${FONT.caption2M14};
    color: ${COLOR.gray500};
    border-bottom: 2px solid ${COLOR.gray100};
    padding-bottom: 16px;
    cursor: pointer;
    &:hover {
      border-bottom: 2px solid ${COLOR.purple1};
      color: black;
    }
  }
  .selected-title {
    border-bottom: 2px solid ${COLOR.purple1};
    color: black;
  }
  .likelist {
    background-color: ${COLOR.gray100};
  }
  .noresults {
    font-size: ${FONT.caption2M14};
    color: ${COLOR.gray500};
  }
`