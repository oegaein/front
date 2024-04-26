import React, {useEffect} from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { API } from '@utils/api'
const CallBack = () => {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const code = queryParams.get('code')
    console.log(code)
    const fetchData = async () => {
      try {
        const response = await API.get(`/api/v1/member/auth/google/callback?code=${code}`)
        const accessToken = response.data.accessToken
        console.log(response)
        API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
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