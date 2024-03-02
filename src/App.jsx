import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '@pages/LandingPage';
import OnboardingPage from '@pages/OnboardingPage';
import BasicInfoLanding from '@pages/basicInfo/BasicInfoLanding';

function Router() {
	return (
		<div className="App">
			<React.StrictMode>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/onboarding" element={<OnboardingPage />} />
						<Route path="/basicinfo/landing" element={<BasicInfoLanding />} />
					</Routes>
				</BrowserRouter>
			</React.StrictMode>
		</div>
	);
}

export default Router;
