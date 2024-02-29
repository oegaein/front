import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import OnboardingPage from './pages/OnboardingPage/OnboardingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RoommatePage from './pages/RoommatePage/RoommatePage';
import HomePage from './pages/HomePage/HomePage';
import Navbar from './components/common/Navbar';
import MyPage from './pages/MyPage/MyPage';
import UserPage from 'pages/UserPage/UserPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="onboarding" element={<OnboardingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="roommate" element={<RoommatePage />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="user/:id" element={<UserPage/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

function MainLayout() {
  const path = window.location.pathname
  return (
    <div className="main-layout">
      <div className="content">
        <Outlet/>
      </div>
      {(path !== '/' && path !== '/onboarding' && path !== '/login') && <Navbar />}

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
