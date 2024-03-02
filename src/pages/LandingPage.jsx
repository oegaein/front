import React from 'react';
import backgroundImage from '@assets/images/시작화면.svg';

const LandingPage = () => {
	return (
		<>
			<div
				style={{
					height: '100vh',
					backgroundImage: `url(${backgroundImage})`,
				}}
			></div>
		</>
	);
};

export default LandingPage;
