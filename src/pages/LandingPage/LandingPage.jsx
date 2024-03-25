import React from 'react'
import styled from 'styled-components'
import Lottie from 'react-lottie'
import animationData1 from '@assets/lottie/시작화면/x0y116galaxy2.json'
import animationData2 from '@assets/lottie/시작화면/x50y0galaxy.json'
import animationData3 from '@assets/lottie/시작화면/x79y531galaxy4.json'
import animationData4 from '@assets/lottie/시작화면/x236y405galaxy3.json'
import animationData5 from '@assets/lottie/시작화면/x280y741galaxy5.json'
import Logo from '@assets/images/Logo.svg'
const LandingPage = () => {
	const defaultOptions = {
		a: {
			loop: true,
			autoplay: true,
			animationData: animationData1,
			rendererSettings: {
				preserveAspectRatio: "xMidYMid slice"
			}
		},
		b: {
			loop: true,
			autoplay: true,
			animationData: animationData2,
			rendererSettings: {
				preserveAspectRatio: "xMidYMid slice"
			}
		},
		c: {
			loop: true,
			autoplay: true,
			animationData: animationData3,
			rendererSettings: {
				preserveAspectRatio: "xMidYMid slice"
			}
		},
		d: {
			loop: true,
			autoplay: true,
			animationData: animationData4,
			rendererSettings: {
				preserveAspectRatio: "xMidYMid slice"
			}
		},
		e: {
			loop: true,
			autoplay: true,
			animationData: animationData5,
			rendererSettings: {
				preserveAspectRatio: "xMidYMid slice"
			}
		},
	};
  return (
		<SettingStyle className='relative flex justify-center items-center'>
			<img className='absolute' src={Logo} alt='logo'/>
			<div className='absolute left-0 top-[116px]'>
				<Lottie 
				options={defaultOptions.a}
				/>
			</div>
			<div className='absolute left-[50px] top-0'>
				<Lottie 
				options={defaultOptions.b}
				/>
			</div>
			<div className='absolute left-[79px] top-[531px]'>
				<Lottie 
				options={defaultOptions.c}
				/>
			</div>
			<div className='absolute left-[236px] top-[405px]'>
				<Lottie 
				options={defaultOptions.d}
				/>
			</div>
			<div className='absolute left-[280px] top-[741px]'>
				<Lottie 
				options={defaultOptions.e}
				/>
			</div>
		</SettingStyle>
  )
}

export default LandingPage

const SettingStyle = styled.div`
	height: 100%;
	position: relative;
	width: 393px;
	height: 852px;

	background: linear-gradient(180deg, #8163FA 19.41%, #8A7FFB 35.72%, #9C94EA 52.04%, #BA92ED 67.37%, #CE97ED 85.17%, #E699ED 100%);

`