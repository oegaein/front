import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from 'pages/LandingPage';
import OnboardingPage from 'pages/OnboardingPage';
// import AuthPage from './AuthPage';
// import ProfileSetupPage from './ProfileSetupPage';
// import HomePage from './HomePage';
// import RoommateMatchingPage from './RoommateMatchingPage';
// import CoDeliveryPage from './CoDeliveryPage';
import BasicInfo from 'pages/basicInfo';

function Router() {
	return (
		<div className="App">
			<React.StrictMode>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/onboarding" element={<OnboardingPage />} />
						<Route path="/basicInfo" element={<BasicInfo />} />
						{/* <Route path="/auth" element={AuthPage} />
                            <Route path="/setup" element={ProfileSetupPage} />
                            <Route path="/home" element={HomePage} />
                            <Route path="/roommate" element={RoommateMatchingPage} />
                            <Route path="/delivery" element={CoDeliveryPage} /> */}
					</Routes>
				</BrowserRouter>
			</React.StrictMode>
		</div>
	);
}

export default Router;
