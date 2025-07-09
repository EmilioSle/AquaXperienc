// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './app/Home/page'
import LoginPage from './app/auth/login/page'
import RegisterPage from './app/auth/register/page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
