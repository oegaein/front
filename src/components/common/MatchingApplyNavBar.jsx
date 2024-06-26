import React, {useState, useEffect} from 'react'
import { API } from '@utils/api'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '@store/authStore'

//images
import Share from '@assets/images/share.svg'
import BigRedHeart from '@assets/images/bigredheart.svg'
import BigEmptyHeart from '@assets/images/heart (10) 1.svg'
import Comment from '@assets/images/comment.svg'


const MatchingApplyNavBar = ({version, isLowerBarVisible, id, isLikeProps}) => {
  const [isLike, setIsLike] = useState(false)
  const navigate = useNavigate()
  const setAccessToken = useAuthStore(state => state.setAccessToken)

  useEffect(() => {
    if (isLikeProps !== undefined) {
      // myProps가 undefined가 아닌 경우에만 state 업데이트
      setIsLike(isLikeProps);
      console.log(isLike)
    }
  }, [isLikeProps]);

  useEffect(() => {
      console.log('isLike is changed', isLike)
  }, [isLike]);
  
  const goToDetailComments = () => {
    navigate(`/comment-detail/${id}`)
  }
  const fetchLikeData = async () => {
    try {
      const response = await API.post('/api/v1/member/like', {
        receiver_id: id
      })
      console.log(response)
      if(response.data.like_id) {
        setIsLike(true)
      }
    } catch(error) {
      console.error(error);
      if (error.response && error.response.status === 403) {
        try {
          const refreshResponse = await API.get(`/api/v1/member/refresh`)
          console.log('refresh', refreshResponse)
          setAccessToken(refreshResponse.data.access_token)
          const accessToken = useAuthStore.getState().accessToken
          console.log(accessToken)
          try {
            const response = await API.post('/api/v1/member/like', 
              {receiver_id: id},
              {
              headers: { 'Authorization': `Bearer ${accessToken}`}
            })
            console.log(response)
            if(response.data.like_id) {
              setIsLike(true)
            }
          } catch (error) {
            console.error(error)
          }

        } catch (error) {
          console.error(error)
          navigate('/login')
        }
      }
    }
  }
  const fetchDeleteLikeData = async () => {
    try {
      const response = await API.delete('/api/v1/member/like', {
        receiver_id: id
      })
      console.log(response)
      if (response.data.like_id) {
        setIsLike(false)
      }
    } catch(error) {
      console.error(error);
      if (error.response && error.response.status === 403) {
        try {
          const refreshResponse = await API.get(`/api/v1/member/refresh`)
          console.log('refresh', refreshResponse)
          setAccessToken(refreshResponse.data.access_token)
          const accessToken = useAuthStore.getState().accessToken
          console.log(accessToken)
          try {
            const response = await API.delete('/api/v1/member/like', {
              data: {receiver_id: id},
              headers: { 'Authorization': `Bearer ${accessToken}`}
            })
            console.log(response)
            if (response.data.like_id) {
              setIsLike(false)
            }
          } catch (error) {
            console.error(error)
          }

        } catch (error) {
          console.error(error)
          navigate('/login')
        }
      }
    }
  }

  return (
    <div className={`filter-section bg-white z-50 fixed bottom-0 flex items-center justify-between gap-[15px] h-[91px] w-[393px] px-[26px]
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
        <button className='whitespace-nowrap'><img src={Share}/></button>
      </div>
      <button className='filter-btn whitespace-nowrap'>매칭신청</button>
    </div>
  )
}

export default MatchingApplyNavBar