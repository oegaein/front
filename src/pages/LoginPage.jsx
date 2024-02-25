import React from 'react'
import LoginImage from '../assets/images/login.png'
import GoogleIcon from '../assets/images/google-icon.png'
const LoginPage = () => {
  return (
    <>
    <div className='px-[40px] mt-[92px] flex flex-col'>
      <p className='self-start text-[17px] mb-[21px]'>학교 구글 계정으로 로그인 해주세요</p>
      <p className='self-start text-[13px] text-[#707070] mb-[64px]'>일반 구글 계정이 아닌 학교 계정으로만 로그인이 가능합니다.</p>
      <img className='w-[261px] mx-auto mb-[93px]' src={LoginImage}/>
    </div>
    <div className="flex items-center justify-center mb-[55px]">
      <hr className="border-t w-1/3 mx-3" />
      <span className='text-[15px]'>간편 로그인</span>
      <hr className="border-t w-1/3 mx-3" />
    </div>
    <button className='border border-black rounded-[5px] flex items-center mx-auto pl-[14px] py-[12px] pr-[42px]'>
      <img className='mr-[38px]' src={GoogleIcon}/>
      <span>Continue with Google</span>
    </button>

    </>
  )
}

export default LoginPage