'use client'

import { useState } from 'react'
import { supabase } from '../../../config/supabase'
import { useNavigate } from 'react-router-dom'
import '../../../styles/auth.styles/Global.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [showRecovery, setShowRecovery] = useState(false)
  const navigate = useNavigate()

  // Manejar login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const { data: { user }, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (loginError || !user) {
      setMessage(`❌ ${loginError?.message}`)
      return
    }

    // Obtener rol del usuario desde la tabla usuarios
    const { data: perfil, error: perfilError } = await supabase
      .from('usuarios')
      .select('rol')
      .eq('id', user.id)
      .single()

    if (perfilError || !perfil) {
      setMessage('⚠️ No se pudo obtener el rol del usuario.')
      return
    }

    // Redirigir al dashboard según el rol
    setMessage(`✅ Bienvenido. Redirigiendo como ${perfil.rol.toLowerCase()}...`)
    setTimeout(() => {
      if (perfil.rol === 'ENTRENADOR') {
        navigate('/dashboard/coach')
      } else {
        navigate('/dashboard')
      }
    }, 1500)
  }

  // Manejar recuperación de contraseña
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setMessage('🔒 Ingresa tu correo para recuperar la contraseña.')
      return
    }

    // Define la URL de redirección, apunta a tu página de actualización de contraseña
    const redirectUrl = `${window.location.origin}/auth/update-password`

    // Llamamos a la función de Supabase para enviar el enlace con la URL de redirección
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl, // Aquí estamos pasando la URL de redirección
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
        <h2>{showRecovery ? 'Recuperar contraseña' : 'Iniciar sesión'}</h2>
        <form onSubmit={showRecovery ? handlePasswordReset : handleLogin}>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!showRecovery && (
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}

          <button type="submit">
            {showRecovery ? 'Enviar enlace de recuperación' : 'Iniciar sesión'}
          </button>
        </form>

        <p>{message}</p>

        <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
          <button
            type="button"
            onClick={() => {
              setShowRecovery(!showRecovery)
              setMessage('')  // Limpiar mensaje cuando se cambia entre los formularios
            }}
            style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
          >
            {showRecovery ? '← Volver al login' : '¿Olvidaste tu contraseña?'}
          </button>
        </p>
      </div>
    </div>
  )
}
