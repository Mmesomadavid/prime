import { Route, Routes, Navigate } from 'react-router-dom';
import {contextData} from './context/AuthContext';
import Register from './pages/Auth/Signup'; // Assuming Register component is in pages folder
import Login from './pages/Auth/Login'; // Assuming Login component is in pages folder
import PasswordReset from './pages/Auth/PasswordReset'; // Assuming Login component is in pages folder
import Loader from './components/Loader'; // Adjust the import path as necessary

function App() {
  const { fetching, user } = contextData();

  if(fetching) return <Loader />

  if(!user) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/reset-password" element={<PasswordReset/>} />
        {/* Add more routes here for other components */}
      </Routes>

    );
  }
}

export default App;
