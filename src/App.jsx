import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import LoginPage from './pages/LoginPage';
import RoommatePage from './pages/RoommatePage';
import HomePage from './pages/HomePage';
import Navbar from './components/common/Navbar';
import MyPage from './pages/MyPage';
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
