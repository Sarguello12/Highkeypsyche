import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import CalendarPage from './pages/CalendarPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';

const App = () => {
  const [sidebarState, setSidebarState] = useState<boolean>(false);
  const toggleSidebar = () => setSidebarState(!sidebarState);

  return (
    <Router>
      <>
        <Header toggleSidebar={toggleSidebar}/>
        <Sidebar sidebarState={[sidebarState, setSidebarState]}/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
