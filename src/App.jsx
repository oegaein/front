import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '@pages/LandingPage';
import OnboardingPage from '@pages/OnboardingPage';
import BasicInfoLanding from '@pages/basicInfo/BasicInfoLanding';
import BasicInfoSetting from '@pages/basicInfo/BasicInfoSetting';

function Router() {
	return (
		<div className="App">
			<React.StrictMode>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/onboarding" element={<OnboardingPage />} />
						<Route path="/basicinfo" element={<BasicInfoLanding />} />
						<Route path="/basicinfo/setting" element={<BasicInfoSetting />} />
					</Routes>
				</BrowserRouter>
			</React.StrictMode>
		</div>
	);
}

export default Router;
