import React, {useEffect} from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { API } from '@utils/api'
import useAuthStore from '@store/authStore'
import useMyInfoStore from '@store/myInfoStore'

const CallBack = () => {
  const setAccessToken = useAuthStore(state => state.setAccessToken)
  const setMyInfo = useMyInfoStore(state => state.setMyInfo)
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const code = queryParams.get('code')
    // console.log(code)
    const fetchData = async () => {
      try {
        const response = await API.get(`/api/v1/member/auth/google/callback?code=${code}`)
        const accessToken = response.data.accessToken
        const refreshToken = response.data.refreshToken
        const {email, gender, introduction, name, photoUrl, profileSetUpStatus} = response.data
        const myInfo = {email, gender, introduction, name, photoUrl, profileSetUpStatus}
        console.log(myInfo)
        console.log('callback request', response)
        setAccessToken(accessToken)
        setMyInfo(myInfo)
        API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        // API.defaults.withCredentials = true
        navigate('/home')
      } catch(error) {
        console.log(error.message)
      }
    }
    if(code) {
      fetchData()

    }
  }, [])
  return (
    <div>CallBack</div>
  )
}

export default CallBack