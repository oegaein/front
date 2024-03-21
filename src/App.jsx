import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '@pages/LandingPage';
import OnboardingPage from '@pages/OnboardingPage';
import BasicInfoSetting from '@pages/basicInfo/BasicInfoSetting';
import Post from '@pages/post/Post';
import Chat from '@pages/chat/Chat';

function Router() {
	return (
		<div className="App">
			<React.StrictMode>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/onboarding" element={<OnboardingPage />} />
						<Route path="/setting" element={<BasicInfoSetting />} />
						<Route path="/post-roommate" element={<Post />} />
						<Route path="/chat" element={<Chat />} />
						<Route path="/chat/chatroom" element={<Chat />} />
					</Routes>
				</BrowserRouter>
			</React.StrictMode>
		</div>
	);
}

export default Router;
