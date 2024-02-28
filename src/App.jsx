import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import OnboardingPage from './pages/OnboardingPage/OnboardingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RoommatePage from './pages/RoommatePage/RoommatePage';
import HomePage from './pages/HomePage/HomePage';
import Navbar from './components/common/Navbar';
import MyPage from './pages/MyPage/MyPage';
function App() {
  const path = window.location.pathname

  return (
    <div className="App">
      <Router>
        {(path !== '/' && path !== '/onboarding') && <Navbar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/roommate" element={<RoommatePage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
