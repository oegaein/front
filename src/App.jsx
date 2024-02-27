import './App.css';
import React from 'react';
import { RouterProvider, createBrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import LoginPage from './pages/LoginPage';
import RoommatePage from './pages/RoommatePage';
import HomePage from './pages/HomePage';
import Navbar from './components/common/Navbar';
const router = createBrowserRouter([
  { path: "/", Component: LandingPage },
  { path: "/onboarding", Component: OnboardingPage },
  { path: "/login", Component: LoginPage },
  { path: "/home", Component: HomePage },
  { path: "/roommate", Component: RoommatePage },
]);
function App() {
  const path = window.location.pathname
  return (
    <div className="App">
      <RouterProvider router={router} />
      {(path !== '/' && path !== '/onboarding') && <Navbar />}
    </div>
  );
}

export default App;
