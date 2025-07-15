// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './app/Home/page'
import LoginPage from './app/auth/login/page'
import RegisterPage from './app/auth/register/page'
import CoachDashboard from './app/coach/dashboard/page'
import DashboardPage from './app/dashboard/page'
import UpdatePassword from './app/auth/update-password/page'
import ForgotPasswordPage from './app/auth/forget-password/page'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/update-password" element={<UpdatePassword />} />
        <Route path="/auth/forget-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard/coach" element={<CoachDashboard />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/user/perfil" element={<DashboardPage />} />
        {/* Add more routes as needed */}

      </Routes>
    </BrowserRouter>
  )
}

export default App
