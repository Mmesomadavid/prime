import { Route, Routes, Navigate } from 'react-router-dom';
import { contextData } from './context/AuthContext';

// Importing pages and components
import Register from './pages/Auth/Signup';
import Login from './pages/Auth/Login';
import PasswordReset from './pages/Auth/PasswordReset';
import Loader from './components/Loader';
import NetworkStatus from './components/NetworkStatus';

// Patient and Hospital-specific components
import PatientDashboard from './pages/Dashboards/PatientDashboard/PatientDashboard';
import UpdatePatientProfile from './pages/Dashboards/PatientDashboard/UpdatePatientProfile';
import PatientLayout from './components/Layouts/DefaultLayout';

import HospitalDashboard from './pages/Dashboards/HospitalDashboard/HospitalDashboard';
import UpdateHospitalProfile from './pages/Dashboards/HospitalDashboard/UpdateHospitalProfile';
import HospitalLayout from './components/Layouts/HospitalLayout';

function App() {
  const { fetching, user } = contextData();

  if (fetching) return <Loader />;

  return (
    <>
      <NetworkStatus />
      {!user ? (
        // Routes for unauthenticated users
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/reset-password" element={<PasswordReset />} />
        </Routes>
      ) : (
        // Routes for authenticated users based on role
        <Routes>
          {/* Hospital User Routes */}
          {user.role === 'hospital' && (
            <>
              {/* Redirect user to update profile if profile details are incomplete */}
              {user.firstName === "" ? (
                <Route path="*" element={<Navigate to="/dashboard/hospital/update-profile" />} />
              ) : (
                <Route path="*" element={<Navigate to="/dashboard/hospital" />} />
              )}
              <Route path="/dashboard/hospital" element={<HospitalLayout />}>
                <Route index element={<HospitalDashboard />} />
                <Route path="update-profile" element={<UpdateHospitalProfile />} />
                {/* Additional Hospital-specific routes */}
              </Route>
            </>
          )}

          {/* Patient User Routes */}
          {user.role === 'patient' && (
            <>
              {/* Redirect user to update profile if profile details are incomplete */}
              {user.firstName === "" ? (
                <Route path="*" element={<Navigate to="/dashboard/patient/update-profile" />} />
              ) : (
                <Route path="*" element={<Navigate to="/dashboard/patient" />} />
              )}
              <Route path="/dashboard/patient" element={<PatientLayout />}>
                <Route index element={<PatientDashboard />} />
                <Route path="update-profile" element={<UpdatePatientProfile />} />
                {/* Additional Patient-specific routes */}
              </Route>
            </>
          )}
        </Routes>
      )}
    </>
  );
}

export default App;
