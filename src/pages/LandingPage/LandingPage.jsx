import React from 'react'
import Lottie from 'react-lottie'
import animationData from '@assets/lottie/시작화면/x0y116galaxy2.json'
import backgroundImage from '@assets/images/시작화면.svg'
const LandingPage = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice"
		}
	};
  return (
		<>
    	<div className="h-full" style={{backgroundImage: `url(${backgroundImage})`}}></div>
			<Lottie 
	    options={defaultOptions}
        height={400}
        width={400}
      />
		</>
  )
}

export default LandingPage