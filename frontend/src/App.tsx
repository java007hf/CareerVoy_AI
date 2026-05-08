import { Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import CommunityPage from './pages/CommunityPage';
import MoneyPage from './pages/MoneyPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
      <NavigationBar />
      <div className="wrap">
        <Routes>
          <Route path="/" element={<Navigate to="/community" replace />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/money" element={<MoneyPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
