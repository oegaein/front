import React from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';

//pages
import ProtectedRoute from './ProtectedRoute';
import LandingPage from '@pages/LandingPage/LandingPage';
import OnboardingPage from '@pages/OnboardingPage/OnboardingPage';
import BasicInfoSetting from '@pages/basicInfo/BasicInfoSetting';
import LoginPage from '@pages/LoginPage/LoginPage';
import RoommatePage from '@pages/RoommatePage/RoommatePage';
import HomePage from '@pages/HomePage/HomePage';
import Navbar from '@components/common/Navbar';
import MyPage from '@pages/MyPage/MyPage';
import UserPage from '@pages/UserPage/UserPage';
import SearchPage from '@pages/SearchPage/SearchPage';
import NotificationPage from '@pages/NotificationPage/NotificationPage';
import EndingsoonPage from '@pages/HomePage/EndingsoonPage/EndingsoonPage';
import BestRoommatesPage from '@pages/HomePage/BestRoommatesPage/BestRoommatesPage';
import RoommateFilterPage from '@pages/RoommatePage/RoommateFilterPage/RoommateFilterPage';
import Post from '@pages/post/Post';
import Chat from '@pages/chat/Chat';
import ChatRoom from '@pages/chat/ChatRoom';
import PostDetail from '@pages/post/Post-detail';
import CommentDetail from '@pages/comment/Comment-detail';
import MyProfileEditPage from '@pages/MyPage/MyInfoEditPage/MyProfileEditPage';
import Alarm from '@pages/alarm/Alarm';
import LikePage from '@pages/MyPage/LikePage/LikePage';
import MyPostPage from '@pages/MyPage/MyPostPage/MyPostPage';
import RoommateApplyListPage from '@pages/MyPage/RoommateApplyListPage/RoommateApplyListPage';
import CallBack from '@components/LoginPage/CallBack';
import DormNewsPage from '@pages/HomePage/DormNewsPage/DormNewsPage';
import UserPostPage from '@pages/UserPage/UserPostPage/UserPostPage';
import ComeMatchingListPage from '@pages/MyPage/ComeMatchingListPage/ComeMatchingListPage';
import PostRoommateEdit from '@components/post/PostRoommateEdit';
import Delivery from '@pages/delivery/Delivery';
import { StyledToastContainer } from '@components/toastify/Toast';

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				{/* Protected Route 적용 */}
				<Route
					path="notification"
					element={
						<ProtectedRoute>
							<NotificationPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/alarm"
					element={
						<ProtectedRoute>
							<Alarm />
						</ProtectedRoute>
					}
				/>
				<Route
					path="mypage"
					element={
						<ProtectedRoute>
							<MyPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="mypage/come-matchingrequests"
					element={
						<ProtectedRoute>
							<ComeMatchingListPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="mypage/roommate-applylist"
					element={
						<ProtectedRoute>
							<RoommateApplyListPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="mypage/like"
					element={
						<ProtectedRoute>
							<LikePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="mypage/mypost"
					element={
						<ProtectedRoute>
							<MyPostPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/chat"
					element={
						<ProtectedRoute>
							<Chat />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/chat/chatroom/:subscribeID"
					element={
						<ProtectedRoute>
							<ChatRoom />
						</ProtectedRoute>
					}
				/>
				<Route
					path="my-profile/edit"
					element={
						<ProtectedRoute>
							<MyProfileEditPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/setting"
					element={
						<ProtectedRoute>
							<BasicInfoSetting />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/post-roommate"
					element={
						<ProtectedRoute>
							<Post />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/post-roommate/edit/:postId"
					element={
						<ProtectedRoute>
							<PostRoommateEdit />
						</ProtectedRoute>
					}
				/>

				<Route index element={<HomePage />} />
				<Route path="callback" element={<CallBack />} />
				<Route path="home" element={<HomePage />} />
				<Route path="home/dormnews" element={<DormNewsPage />} />
				<Route path="home/ending-soon" element={<EndingsoonPage />} />
				<Route path="home/best-roommates" element={<BestRoommatesPage />} />
				<Route path="search" element={<SearchPage />} />
				<Route path="roommate" element={<RoommatePage />} />
				<Route path="roommate/filter" element={<RoommateFilterPage />} />
				<Route path="landing" element={<LandingPage />} />
				<Route path="onboarding" element={<OnboardingPage />} />
				<Route path="login" element={<LoginPage />} />

				<Route path="user/:memberId" element={<UserPage />} />
				<Route path="user/:memberId/posts" element={<UserPostPage />} />
				{/* <Route
          path="user/:memberId/reviews"
          element={<RoommateReviewPage />}
        /> */}

				<Route path="/post-detail/:postId" element={<PostDetail />} />
				<Route path="/comment-detail/:postId" element={<CommentDetail />} />
				<Route path="/delivery" element={<Delivery />} />
			</Route>
		</Routes>
	);
};

function MainLayout() {
	const location = useLocation();
	return (
		<div className="main-layout">
			<div className="content">
				<StyledToastContainer
					position="top-center"
					limit={10}
					closeButton={true}
					autoClose={4000}
					hideProgressBar
				/>
				<Outlet />
			</div>
			{location.pathname !== '/onboarding' &&
				location.pathname !== '/login' &&
				location.pathname !== '/setting' &&
				location.pathname !== '/roommate/filter' &&
				location.pathname !== '/alarm' &&
				location.pathname.substring(0, 11) !== '/my-profile' &&
				location.pathname.substring(0, 14) !== '/chat/chatroom' &&
				location.pathname.substring(0, 12) !== '/post-detail' &&
				location.pathname.substring(0, 15) !== '/comment-detail' &&
				location.pathname.substring(0, 14) !== '/post-roommate' &&
				location.pathname.substring(0, 5) !== '/user' && <Navbar />}
		</div>
	);
}

export default AppRoutes;
