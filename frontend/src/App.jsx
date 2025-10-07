import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout"

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
      <Routes>
        <Route path="/" element={<Layout />}>

          {/* Non-protected pages */}
          <Route index element={<Home />}/>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Protected Pages */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="goals" element={<Goals />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="causes" element={<Causes />} />
          <Route path="donations" element={<Donations />} />
          <Route path="organizations" element={<Organizations />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
