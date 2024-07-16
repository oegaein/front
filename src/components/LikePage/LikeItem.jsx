import React, {useState} from 'react'
import { makeAuthorizedRequest } from '@utils/makeAuthorizedRequest';
import UserPageInfo from '@components/UserPage/UserPageInfo'
import { useMutation } from '@tanstack/react-query';

//images
import Next from '@assets/images/next.svg'
import RedHeart from '@assets/images/heart-red.svg'
import Heart from '@assets/images/heart (10) 1.svg'

const LikeItem = ({like}) => {
  const [isLike, setIsLike] = useState(true)
  const receiverId = like.receiver_id
  console.log('receiverId', receiverId)
  const fetchLikeMutation = useMutation(
		{
			mutationFn: (receiverId) => makeAuthorizedRequest('/api/v1/member/like', 'post', {receiver_id: receiverId}),
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
			mutationFn: (receiverId) => makeAuthorizedRequest('/api/v1/member/like', 'delete', {receiver_id: receiverId}),
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
    fetchLikeMutation.mutate(receiverId)

  }
  const fetchDeleteLikeData = async () => {
    cancelLikeMutation.mutate(receiverId)

  }

  return (
    <div className='bg-white px-[25px] pt-[16px] pb-[24px]'> 
      <div className='flex justify-between items-center mb-[16px]'>
        <div className='flex items-center'>
          <img className='w-[25px] h-[25px] mr-[4px] rounded-[50%]' src={like.photo_url}/>
          <span className='font-caption2m14'>{like.name}</span>
          <img src={Next}/>
        </div>
        {(isLike) ? 
            <button onClick={fetchDeleteLikeData}><img src={RedHeart} className='w-[20px] h-[20px]'/></button>
            :  
            <button onClick={fetchLikeData}><img src={Heart} className='w-[20px] h-[20px]'/></button>
        }   
      </div>
      <UserPageInfo userInfo={like}/>
    </div>
  )
}

export default LikeItem
