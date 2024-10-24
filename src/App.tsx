import { Route, Routes, Navigate } from 'react-router-dom';
import { contextData } from './context/AuthContext';
import Register from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import PasswordReset from './pages/Auth/PasswordReset';
import Loader from './components/Loader';
import NetworkStatus from './components/NetworkStatus';

function App() {
  const { fetching, user } = contextData();

  if (fetching) return <Loader />;

  return (
    <>
      <NetworkStatus />
      {!user ? (
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          {/* Add more routes here for other components */}
        </Routes>
      ) : (
        <div>
          {/* Add protected routes for authenticated users here */}
        </div>
      )}
    </>
  );
}

export default App;
