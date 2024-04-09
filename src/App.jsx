import React from 'react';
import './App.css';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
	useLocation,
	BrowserRouter,
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
import NotificationPage from '@pages/NotificationPage/NotificationPage';
import EndingsoonPage from '@pages/HomePage/EndingsoonPage/EndingsoonPage';
import BestRoommatesPage from '@pages/HomePage/BestRoommatesPage/BestRoommatesPage';
import RoommateFilterPageCopy from '@pages/RoommatePage/RoommateFilterPage/RoommateFilterPage copy';
import Post from '@pages/post/Post';
import Chat from '@pages/chat/Chat';
import ChatRoom from '@pages/chat/ChatRoom';
import PostDetail from '@pages/post/Post-detail';
import MyProfileEditPage from '@pages/MyPage/MyInfoEditPage/MyProfileEditPage';
import RoommateReviewPage from '@pages/UserPage/RoommateReviewPage/RoommateReviewPage';
import LikePage from '@pages/MyPage/LikePage/LikePage';

function App() {
	return (
		<div className="App">
			<React.StrictMode>
					<Router>
						<Routes>
							<Route path="/" element={<MainLayout />}>
                <Route path="home" element={<HomePage />}/>
                <Route path="home/ending-soon" element={<EndingsoonPage/>}/>
                <Route path="home/best-roommates" element={<BestRoommatesPage/>}/>
                <Route path="notification" element={<NotificationPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="roommate" element={<RoommatePage />} />
                <Route path="roommate/filter" element={<RoommateFilterPageCopy />} />
                <Route path="landing" element={<LandingPage />} />
                <Route path="onboarding" element={<OnboardingPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="mypage" element={<MyPage />} />
                <Route path="mypage/like" element={<LikePage />} />
                <Route path="my-profile/edit" element={<MyProfileEditPage />} />
                <Route path="user/:id" element={<UserPage />} />
                <Route path="user/:id/reviews" element={<RoommateReviewPage />} />
                <Route path="/setting" element={<BasicInfoSetting />} />
                <Route path="/post-roommate" element={<Post />} />
                <Route path="/post-detail" element={<PostDetail />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/chat/chatroom" element={<ChatRoom />} />
                </Route>
						</Routes>
					</Router>
			</React.StrictMode>
		</div>
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
// function App() {
//   const path = window.location.pathname

//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/onboarding" element={<OnboardingPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/home" element={<HomePage />} />
//           <Route path="/roommate" element={<RoommatePage />} />
//           <Route path="/mypage" element={<MyPage />} />
//           <Route path="/user/:id" element={<UserPage/>} />
//         </Routes>
//         {(path !== '/' && path !== '/onboarding') && <Navbar />}
//       </Router>
//     </div>
//   );
// }

export default App;
