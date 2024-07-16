import React, {useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';
import { useMutation, queryClient } from '@tanstack/react-query';

//styles
import styled from 'styled-components'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'


//images
import Share from '@assets/images/share.svg'
import BigRedHeart from '@assets/images/bigredheart.svg'
import BigEmptyHeart from '@assets/images/heart (10) 1.svg'
import Comment from '@assets/images/comment.svg'
import { stubFalse } from 'lodash';


const MatchingApplyNavBar = ({version, isLowerBarVisible, id, isLikeProps}) => {
  const [isLike, setIsLike] = useState(false)
  const [firstRendering, setFirstRendering] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if (!isLikeProps && firstRendering) {
      // myProps가 undefined가 아닌 경우에만 state 업데이트
      setIsLike(isLikeProps);
      setFirstRendering(false)
      console.log(isLike)
    }
  }, [isLikeProps]);

  useEffect(() => {
      console.log('isLike is changed', isLike)
  }, [isLike]);
  useEffect(() => {
    // 카카오 SDK 초기화
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('7e7de13b930d7f7fcc8c267d547989b4');
    }
  }, []);
  
  const goToDetailComments = () => {
    navigate(`/comment-detail/${id}`)
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
  const fetchLikeData = async () => {
    fetchLikeMutation.mutate(id)
  }
  const fetchDeleteLikeData = async () => {
    cancelLikeMutation.mutate(id)
  }
  const clickShareBtn = () => {
    if (window.Kakao) {
      const kakao = window.Kakao
      console.log(kakao)
      kakao.Share.sendDefault({
        objectType: 'feed',
  content: {
    title: '오늘의 디저트',
    description: '아메리카노, 빵, 케익',
    imageUrl:
      'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
    link: {
      mobileWebUrl: 'https://developers.kakao.com',
      webUrl: 'https://developers.kakao.com',
    },
  },
  itemContent: {
    profileText: '외대 룸메이트 매칭은 "외개인"',
    profileImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
    titleImageUrl: 'https://mud-kage.kakao.com/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
    titleImageText: '친구가 매칭을 공유했어요!',
    titleImageCategory: '공유한 친구: 김혁수',
    items: [
      {
        item: 'Cake1',
        itemOp: '1000원',
      },
      {
        item: 'Cake2',
        itemOp: '2000원',
      },
      {
        item: 'Cake3',
        itemOp: '3000원',
      },
      {
        item: 'Cake4',
        itemOp: '4000원',
      },
      {
        item: 'Cake5',
        itemOp: '5000원',
      },
    ],
    sum: '총 결제금액',
    sumOp: '15000원',
  },
  social: {
    likeCount: 10,
    commentCount: 20,
    sharedCount: 30,
  },
  buttons: [
    {
      title: '웹으로 이동',
      link: {
        mobileWebUrl: 'https://developers.kakao.com',
        webUrl: `${window.location.origin}${location.pathname}`,
      },
    },
    
  ],
      });
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
      <button className='filter-btn whitespace-nowrap'>매칭신청</button>
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