import React from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
	Outlet,
} from 'react-router-dom';

import LandingPage from '@pages/LandingPage/LandingPage';
import OnboardingPage from '@pages/OnboardingPage/OnboardingPage';
import BasicInfoSetting from '@pages/basicInfo/BasicInfoSetting';
import LoginPage from '@pages/LoginPage/LoginPage';
import RoommatePage from '@pages/RoommatePage/RoommatePage';
import HomePage from '@pages/HomePage/HomePage';
import Navbar from '@components/common/Navbar';
import MyPage from '@pages/MyPage/MyPage';
import UserPage from '@pages/UserPage/UserPage';
import SearchAndNotice from '@common/SearchAndNotice';
import SearchPage from '@pages/SearchPage/SearchPage';
import Post from '@pages/post/Post';
import Chat from '@pages/chat/Chat';
import ChatRoom from '@pages/chat/ChatRoom';
import PostDetail from '@pages/post/Post-detail';
import CommentDetail from '@pages/comment/Comment-detail';

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<MainLayout />} />
					<Route path="home" element={<HomePage />} />
					<Route path="roommate" element={<RoommatePage />} />
					<Route path="search" element={<SearchPage />} />
					<Route path="landing" element={<LandingPage />} />
					<Route path="onboarding" element={<OnboardingPage />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="mypage" element={<MyPage />} />
					<Route path="user/:id" element={<UserPage />} />
					<Route path="/setting" element={<BasicInfoSetting />} />
					<Route path="/post-roommate" element={<Post />} />
					<Route path="/post-detail" element={<PostDetail />} />
					<Route path="/comment-detail/:postId" element={<CommentDetail />} />
					<Route path="/chat" element={<Chat />} />
					<Route path="/chat/chatroom" element={<ChatRoom />} />
				</Routes>
			</Router>
		</div>
	);
}

function IncludeSearchBar() {
	return (
		<>
			<SearchAndNotice />
			<Outlet />
		</>
	);
}

function MainLayout() {
	const location = useLocation();
	return (
		<div className="main-layout">
			<div className="content">
				<Outlet />
			</div>
			{location.pathname !== '/' &&
				location.pathname !== '/onboarding' &&
				location.pathname !== '/login' && <Navbar />}
		</div>
	);
}

export default App;
