import React from 'react'
import FONT from '@styles/fonts'
import COLOR from '@styles/color'
import styled from 'styled-components'
import LoginImage from '../../assets/images/login.svg'
import GoogleIcon from '../../assets/images/google-icon.svg'
const LoginPage = () => {
  return (
    <>
      <div className='px-[35px] mt-[65px] flex flex-col'>
        <StyledTitle className='self-start mb-[16px]'>학교 구글 계정으로 로그인 해주세요</StyledTitle>
        <StyledBodyText className='self-start mb-[105px]' style={{color: COLOR.gray500}}>일반 구글 계정으로는 로그인이 불가능합니다.</StyledBodyText>
        <img className='w-[261px] mx-auto mb-[93px]' src={LoginImage}/>
      </div>
      <div className="flex items-center justify-center mb-[55px] w-full">
        <hr className="border-t w-1/3 mx-3" />
        <StyledCaption>간편 로그인</StyledCaption>
        <hr className="border-t w-1/3 mx-3" />
      </div>
      <div className='px-[35px]'>
        <button style={{borderColor: COLOR.gray200}} className='border w-full h-[50px] rounded-[5px] flex items-center px-[23px] shadow-[1px_1px_4px_rgba(0,0,0,0.25)]'>
          <img className='mr-[60px]' src={GoogleIcon}/>
          <StyledButtonText>Google로 계속하기</StyledButtonText>
        </button>

      </div>
    </>
  )
}

export default LoginPage

const StyledTitle = styled.p`
  font: ${FONT.title2B19}
`

const StyledBodyText = styled.p`
  font: ${FONT.body5M15}
`
const StyledCaption = styled.span`
  font: ${FONT.caption1SB14}
`
const StyledButtonText = styled.button`
  font: ${FONT.buttonSB15}
`