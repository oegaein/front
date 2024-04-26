import React from 'react'
import {GoogleOAuthProvider, GoogleLogin} from '@react-oauth/google'

const GoogleLoginButton = () => {
  const CLIENT_ID = '393836402841-kce6okeggrgkkern512g91o39mbb273a.apps.googleusercontent.com'
  const REDIRECT_URL = 'http://127.0.0.1:3000'

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID} >
      <GoogleLogin
      buttonText="Google로 계속하기"
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse)
      }}
      onError={()=>{
        console.log('Login Failed')
      }}
      >

      </GoogleLogin>
    </GoogleOAuthProvider>
  )
}

export default GoogleLoginButton