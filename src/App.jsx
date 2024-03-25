import React from 'react'
import './App.css'
import LandingPage from '@pages/LandingPage/LandingPage';
import OnboardingPage from '@pages/OnboardingPage/OnboardingPage';
import BasicInfoSetting from '@pages/basicInfo/BasicInfoSetting';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
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

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="home" element={<HomePage />}/>
            <Route path="home/ending-soon" element={<EndingsoonPage/>}/>
            <Route path="notification" element={<NotificationPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="roommate" element={<RoommatePage />} />
            <Route path="landing" element={<LandingPage />} />
            <Route path="onboarding" element={<OnboardingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="user/:id" element={<UserPage/>} />
						<Route path="/setting" element={<BasicInfoSetting />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
function IncludeSearchBar() {
  return (
    <>
      <SearchAndNotice/>
      <Outlet/>
    </>
  )
}

function MainLayout() {
  const location = useLocation()
  return (
    <div className="main-layout">
      <div className="content">
        <Outlet/>
      </div>
      {(location.pathname !== '/' && location.pathname !== '/onboarding' && location.pathname !== '/login') && <Navbar />}

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
