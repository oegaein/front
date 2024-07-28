import React, {useState, useEffect} from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useMatchingPosts } from 'hooks/useMatchingPosts';
import { API } from '@utils/api';
import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';

import Header from '@common/header/Header';
import Pagination from '@common/Pagination';
import MyPost from '@common/ui/item/MyPost';
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'

import Dots from '@assets/images/dots-black.svg';

const UserPostPage = () => {
  const params = useParams()
  const memberId = params.memberId
  const [userPosts, setUserPosts] = useState({})
  const [uploadPostType, setUploadPostType] = useState('roommate')
  const [currentPage, setCurrentPage] = useState(0)
  const [confirm, setConfirm] = useState(false)
	const [confirmContent, setConfirmContent] = useState({});
	const [option, setOption] = useState(false)
	const [optionModalOptions, setOptionModalOptions] = useState({});

  const location = useLocation()
  const handleClickUploadPost = (type) => {
    setUploadPostType(type)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeAuthorizedRequest(`/api/v1/other-matchingposts/${memberId}`)
        console.log(`userpostpage`, response.data)
        setUserPosts(response.data)
      } catch(error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])
  if (!userPosts) {
    return <div>로딩중...</div>;
  }
  return (
    <SettingStyle className='bg-white pb-[24px]'>
      <div className="px-[28px]">
				<Header backPath="/mypage" rightContent=" " rightEvent={() => {}}>
					<span>{userPosts?.data?.[0]?.name}님의 글</span>
				</Header>
			</div>
      <div>
        <div className='flex'>
          <div onClick={()=>handleClickUploadPost('roommate')}className={`notification-title ${uploadPostType === 'roommate' && 'selected-title'}`}>룸메이트</div>
          {/* <div onClick={()=>handleClickUploadPost('delivery')}className={`notification-title ${uploadPostType === 'delivery' && 'selected-title'}`}>공동배달</div> */}
        </div>
        <div className='flex flex-col gap-[10px] px-[25px] mt-[16px]'>
          {userPosts?.data?.length > 0 ? (
            userPosts.data.map((post, index) => (
              <MyPost key={index} post={post} index={index} setConfirm={setConfirm} setConfirmContent={setConfirmContent} 
              setOption={setOption} setOptionModalOptions={setOptionModalOptions}/>
            ))
          ) : (
            <NoResults/>
          )}
        </div>
      </div>
      <Pagination data={userPosts} setCurrentPage={setCurrentPage}/>
    </SettingStyle>
  )
}

export default UserPostPage

const NoResults = () => {
	return <p className="noresults mt-[138px]">내가 올린 글이 없어요.</p>;
};

const SettingStyle = styled.main`
	.color-purple1 {
		color: ${COLOR.purple1};
	}
	.color-gray500 {
		color: ${COLOR.gray500};
	}
	.color-gray400 {
		color: ${COLOR.gray400};
	}
	.font-caption2m14 {
		font-size: ${FONT.caption2M14};
	}
	.font-caption3m12 {
		font-size: ${FONT.caption3M12};
	}
	.font-caption1sb14 {
		font-size: ${FONT.caption1SB14};
	}
	.myname {
		font-size: ${FONT.body3M16};
	}
	.username {
		font-size: ${FONT.caption2M14};
	}
	.heading-text {
		font-size: ${FONT.title4SB17};
	}
	.small-text {
		font-size: ${FONT.caption2M14};
		color: ${COLOR.gray600};
	}
	.button {
		border: 1px solid ${COLOR.gray100};
		font-size: ${FONT.caption2M14};
		width: 43px;
		height: 26px;
		border-radius: 5px;
		&.allowed {
			color: ${COLOR.gray600};
		}
		&.declined {
			color: ${COLOR.red};
		}
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
	.noresults {
		font-size: ${FONT.caption2M14};
		color: ${COLOR.gray500};
	}
	.mypost {
		border: 1px solid ${COLOR.gray100};
		border-radius: 10px;
	}
	.likelist {
		background-color: ${COLOR.gray100};
	}
`;
