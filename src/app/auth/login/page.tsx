// src/app/auth/login/page.tsx
'use client'

import { useState } from 'react'
import { supabase } from '../../../config/supabase'
import { useNavigate } from 'react-router-dom'
import '../../../styles/auth.styles/Global.css'
export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage(`❌ ${error.message}`)
    } else {
      setMessage('✅ Sesión iniciada correctamente')
      setTimeout(() => navigate('/dashboard'), 1000)
    }
  }

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar sesión</button>
        </form>
        <p>{message}</p>
      </div>
    </div>

  )
}
