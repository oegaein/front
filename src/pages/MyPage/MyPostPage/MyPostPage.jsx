import React, {useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useMatchingPosts } from 'hooks/useMatchingPosts';

import Header from '@common/header/Header'
import Pagination from '@common/Pagination';
import MyPost from '@common/ui/item/MyPost';
import ConfirmModal from '@common/modal/ConfirmModal';

import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'



const MyPostPage = () => {
  const [uploadPostType, setUploadPostType] = useState('roommate')
  const [currentPage, setCurrentPage] = useState(0)
	const [confirm, setConfirm] = useState(false)
	const [confirmContent, setConfirmContent] = useState({});

  const location = useLocation()
  const {
		data: myMatchingPosts,
		isLoading: isLoadingMyUpload,
		error: isErrorMyUpload,
	} = useMatchingPosts('mypost', currentPage);
  const handleClickUploadPost = (type) => {
    setUploadPostType(type)
  }

  if (isLoadingMyUpload) {
    return <div>로딩중</div>
  }
  return (
    <SettingStyle className='bg-white pb-[24px]'>
      {confirm && (
				<ConfirmModal
					content={confirmContent}
					isOpen={confirm}
					setIsOpen={setConfirm}
				/>
			)}
      <div className="px-[28px]">
				<Header backPath="/mypage" rightContent=" " rightEvent={() => {}}>
					<span>내가 올린 글</span>
				</Header>
			</div>
      <div>
        <div className='flex'>
          <div onClick={()=>handleClickUploadPost('roommate')}className={`notification-title ${uploadPostType === 'roommate' && 'selected-title'}`}>룸메이트</div>
          {/* <div onClick={()=>handleClickUploadPost('delivery')}className={`notification-title ${uploadPostType === 'delivery' && 'selected-title'}`}>공동배달</div> */}
        </div>
        <div className='flex flex-col gap-[10px] px-[25px] mt-[16px]'>
          {myMatchingPosts?.data?.length > 0 ? (
            myMatchingPosts.data.map((post, index) => (
              <MyPost post={post} index={index} setConfirm={setConfirm} setConfirmContent={setConfirmContent}/>
            ))
          ) : (
            <NoResults/>
          )}
        </div>
      </div>
      <Pagination data={myMatchingPosts} setCurrentPage={setCurrentPage}/>
    </SettingStyle>
  )
}

export default MyPostPage

const NoResults = () => {
  return (
    <p className='noresults mt-[138px]'>내가 올린 글이 없어요.</p>
  )
}

const SettingStyle = styled.main`
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
`