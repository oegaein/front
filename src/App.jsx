import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '@pages/LandingPage';
import OnboardingPage from '@pages/OnboardingPage';
import BasicInfoSetting from '@pages/basicInfo/BasicInfoSetting';
import Post from '@pages/post/Post';
import Chat from '@pages/chat/Chat';
import ChatRoom from '@pages/chat/ChatRoom';
import PostDetail from '@pages/post/Post-detail';

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
						<Route path="/post-detail" element={<PostDetail />} />
						<Route path="/chat" element={<Chat />} />
						<Route path="/chat/chatroom" element={<ChatRoom />} />
					</Routes>
				</BrowserRouter>
			</React.StrictMode>
		</div>
	);
}

export default Router;
