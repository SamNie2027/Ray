import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout"
import ProtectedRoute  from "./components/ProtectedRoute"
import { AuthProvider } from "./contexts/AuthContext"; 

import Home from './pages/HomePage';

import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';

import Dashboard from './pages/DashboardPage';
import Goals from './pages/GoalsPage';
import Leaderboard from './pages/LeaderboardPage';

import Causes from './pages/CausesPage';
import Donations from './pages/DonationPage';
import Organizations from './pages/OrganizationPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>

            {/* Non-protected pages */}
            <Route index element={<Home />}/>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Protected Pages */}
            <Route path="dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="goals" element={
              <ProtectedRoute>
                <Goals />
              </ProtectedRoute>
              } />
            <Route path="leaderboard" element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
              } />
            <Route path="causes" element={
              <ProtectedRoute>
                <Causes />
              </ProtectedRoute>
              } />
            <Route path="donations" element={
              <ProtectedRoute>
                <Donations />
              </ProtectedRoute>
            } />
            <Route path="organizations" element={
              <ProtectedRoute>
                <Organizations />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
