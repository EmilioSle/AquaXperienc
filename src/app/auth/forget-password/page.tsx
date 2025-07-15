'use client'

import { useState } from 'react'
import { supabase } from '../../../config/supabase'
import '../../../styles/auth.styles/Global.css'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setMessage('🔒 Ingresa tu correo para recuperar la contraseña.')
      return
    }

    const redirectUrl = `${window.location.origin}/auth/update-password`

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    })

    if (error) {
      setMessage(`❌ Error: ${error.message}`)
    } else {
      setMessage('📩 Revisa tu correo para restablecer la contraseña.')
    }
  }

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Recuperar contraseña</h2>
        <form onSubmit={handlePasswordReset}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Enviar enlace de recuperación</button>
        </form>

        <p>{message}</p>

        <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
          <a href="/auth/login" style={{ color: 'blue' }}>
            ← Volver al login
          </a>
        </p>
      </div>
    </div>
  )
}
