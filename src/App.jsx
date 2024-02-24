import './App.css';
import React from 'react';
import { RouterProvider, createBrowserRouter, BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
// import AuthPage from './AuthPage';
// import ProfileSetupPage from './ProfileSetupPage';
// import HomePage from './HomePage';
// import RoommateMatchingPage from './RoommateMatchingPage';
// import CoDeliveryPage from './CoDeliveryPage';
const router = createBrowserRouter([
  { path: "/", Component: LandingPage },
  { path: "/onboarding", Component: OnboardingPage },
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/onboarding" element={<OnboardingPage/>} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

function Root() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/onboarding" element={<OnboardingPage/>} />
    </Routes>
  )
}

export default App;
