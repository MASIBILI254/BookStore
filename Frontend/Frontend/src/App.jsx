import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Registration.jsx';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { isAuthenticated, getRole } from './auth.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected route for user dashboard */}
        <Route 
          path="/user" 
          element={
            isAuthenticated() ? (
              getRole() === 'user' ? (
                <UserDashboard />
              ) : (
                <Navigate to="/admin" />
              )
            ) : (
              <Navigate to="/login" />
            )
          } 
        />

        {/* Protected route for admin dashboard */}
        <Route 
          path="/admin" 
          element={
            isAuthenticated() ? (
              getRole() === 'admin' ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/user" />
              )
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
