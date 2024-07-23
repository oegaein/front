import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';
import { useMutation, queryClient } from '@tanstack/react-query';
import { postMatchingRequestAPI } from 'services/api/MatchingRequestAPI';
//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'


//images
import Share from '@assets/images/share.svg'
import BigRedHeart from '@assets/images/bigredheart.svg'
import BigEmptyHeart from '@assets/images/heart (10) 1.svg'
import Comment from '@assets/images/comment.svg'


const MatchingApplyNavBar = ({version, isLowerBarVisible, id, isLikeProps, userInfo}) => {
  const [isLike, setIsLike] = useState(false)
  const [firstRendering, setFirstRendering] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  // /user or /post-detail 
  useEffect(() => {
    if (!isLikeProps && firstRendering) {
      // myProps가 undefined가 아닌 경우에만 state 업데이트
      setIsLike(isLikeProps);
      setFirstRendering(false)
      console.log(isLike)
    }
  }, [isLikeProps]);

  useEffect(() => {
    // 카카오 SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('090826f305f3c07c40d74086a30a34cb');
    }
    console.log(window.Kakao.isInitialized())
  }, []);
  
  const goToDetailComments = () => {
    navigate(`/comment-detail/${id}`)
  }
  const goToUserPostPage = () => {
    navigate(`/user/${id}/posts`)
  }
  const fetchLikeMutation = useMutation(
		{
			mutationFn: (id) => makeAuthorizedRequest('/api/v1/member/like', 'post', {receiver_id: id}),
			onSuccess: (data) => {
				if(data.status === 201) {
          setIsLike(true)
        }
				console.log('fetchLikeSuccess', data);
			},
			onError: (error) => {
				console.log(error);
			}
		}
	);
  const cancelLikeMutation = useMutation(
		{
			mutationFn: (id) => makeAuthorizedRequest('/api/v1/member/like', 'delete', {
        receiver_id: id
      }),
			onSuccess: (data) => {
				if (data.status === 204) {
          setIsLike(false)
        }
				console.log('cancelLikeSuccess', data);
			},
			onError: (error) => {
				console.log(error);
			}
		}
	);
  const fetchLikeData = () => {
    fetchLikeMutation.mutate(id)
  }
  const fetchDeleteLikeData = () => {
    cancelLikeMutation.mutate(id)
  }
  const fetchMatchingRequest = async () => {
    try {
      const response = await postMatchingRequestAPI(id)
      if (response.status === 201) {
        alert('매칭 신청 완료')
      } else {
        alert('신청 안됨')
      }
    } catch (err) {
      console.error(err)
    }
  }
  const clickShareBtn = () => {
    if (window.Kakao) {
      const kakao = window.Kakao
      console.log(kakao)
      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '이 룸메 어떠세요?',
          description: `${userInfo?.introduction}`,
          imageUrl:
            'https://i.ibb.co/dts410Q/oegaeinlogo.png',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com',
          },
        },
        itemContent: {
          profileText: `${userInfo?.name} 님의 글 | 외개인`,
          profileImageUrl: `${userInfo?.photo_url}`,
          // titleImageText: 'www.hufs.ac.kr',
          // titleImageCategory: '공유한 친구: 김혁수',
        },
        buttons: [
          {
            title: '룸메이트 보러가기',
            link: {
              mobileWebUrl: 'https://developers.kakao.com',
              webUrl: `${window.location.origin}${location.pathname}`,
            },
          },
          
        ],
      }
    );
    }
  }

  return (
    <SettingStyle className={`bg-white z-50 fixed bottom-0 flex items-center justify-between gap-[15px] h-[91px] w-[393px] px-[26px]
      transition-transform duration-300 ${isLowerBarVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className='flex gap-[21px]'>
        {version === 'userPage' &&
        <>
        {(isLike) ? 
            <button onClick={fetchDeleteLikeData} className='whitespace-nowrap w-[22px]'><img src={BigRedHeart}/></button>
            :  
            <button onClick={fetchLikeData} className='whitespace-nowrap w-[22px]'><img src={BigEmptyHeart}/></button>
        }        
        </>
        }
        {version === 'comment' &&
          <button onClick={goToDetailComments} className='whitespace-nowrap w-[22px]'><img src={Comment}/></button>
        }
        <button onClick={clickShareBtn} className='whitespace-nowrap'><img src={Share}/></button>
      </div>
      {location.pathname.substring(0,5) === "/user" ? 
      <button onClick={goToUserPostPage} className='filter-btn whitespace-nowrap'>매칭신청</button>
      :
      <button onClick={fetchMatchingRequest} className='filter-btn whitespace-nowrap'>매칭신청</button>
      }
    </SettingStyle>
  )
}

export default MatchingApplyNavBar

const SettingStyle = styled.div`
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