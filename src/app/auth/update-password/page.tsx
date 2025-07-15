'use client'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../config/supabase'
import '../../../styles/auth.styles/Global.css'

export default function UpdatePassword() {
  const navigate = useNavigate()

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionReady, setSessionReady] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        setSessionReady(true)
      } else {
        setMessage('Token inválido o sesión expirada')
        setTimeout(() => navigate('/auth/login'), 3000)
      }
    }

    checkSession()
  }, [navigate])

  const handleUpdate = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('⚠️ Las contraseñas no coinciden')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      setMessage(`❌ Error al actualizar la contraseña: ${error.message}`)
    } else {
      setMessage('✅ Contraseña actualizada con éxito')
      setTimeout(() => navigate('/auth/login'), 2000)
    }

    setLoading(false)
  }

  if (!sessionReady) return <p>Verificando sesión...</p>

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Actualizar contraseña</h2>

        {/* Campo Nueva Contraseña */}
        <div className="input-password-container">
          <input
            type={showNewPassword ? 'text' : 'password'}
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span
            className="eye-icon"
            onClick={() => setShowNewPassword(prev => !prev)}
          >
            {showNewPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="#555">
                <path d="M12 4.5C7.5 4.5 3.7 7.6 2 12c1.7 4.4 5.5 7.5 10 7.5s8.3-3.1 10-7.5c-1.7-4.4-5.5-7.5-10-7.5zm0 13c-3 0-5.5-2.5-5.5-5.5S9 6.5 12 6.5s5.5 2.5 5.5 5.5S15 17.5 12 17.5zm0-9c-2 0-3.5 1.5-3.5 3.5S10 15.5 12 15.5s3.5-1.5 3.5-3.5S14 8.5 12 8.5z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="#555">
                <path d="M12 4.5c-4.5 0-8.3 3.1-10 7.5.6 1.6 1.6 3 2.7 4.2L2 20l1.4 1.4 18-18L20 2l-3.3 3.3C15.5 4.8 13.8 4.5 12 4.5zM4.7 7.6C6.1 6.1 8.9 4.5 12 4.5c1.5 0 3 .3 4.3.9l-1.5 1.5c-2.4-.9-5 .1-6.5 1.8-1.2 1.3-1.8 3-1.8 4.8 0 1.5.4 2.8 1.1 3.9l-1.7 1.7c-.9-1.1-1.6-2.4-2.2-3.8C3.7 12 4.1 9.7 4.7 7.6zM12 17.5c-1.8 0-3.5-.3-5.1-.9l1.5-1.5c1.4.6 3 .9 4.6.9 3.1 0 5.9-1.6 7.3-3.1.6-.6.9-1.3 1.1-2.1-.2-.8-.5-1.5-1.1-2.1-.7-.7-1.5-1.3-2.4-1.7L17.7 5C19.1 6.5 20.5 8.7 22 12c-1.7 4.4-5.5 7.5-10 7.5z"/>
              </svg>
            )}
          </span>
        </div>

        {/* Campo Confirmar Contraseña */}
        <div className="input-password-container">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            className="eye-icon"
            onClick={() => setShowConfirmPassword(prev => !prev)}
          >
            {showConfirmPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="#555">
                <path d="M12 4.5C7.5 4.5 3.7 7.6 2 12c1.7 4.4 5.5 7.5 10 7.5s8.3-3.1 10-7.5c-1.7-4.4-5.5-7.5-10-7.5zm0 13c-3 0-5.5-2.5-5.5-5.5S9 6.5 12 6.5s5.5 2.5 5.5 5.5S15 17.5 12 17.5zm0-9c-2 0-3.5 1.5-3.5 3.5S10 15.5 12 15.5s3.5-1.5 3.5-3.5S14 8.5 12 8.5z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="#555">
                <path d="M12 4.5c-4.5 0-8.3 3.1-10 7.5.6 1.6 1.6 3 2.7 4.2L2 20l1.4 1.4 18-18L20 2l-3.3 3.3C15.5 4.8 13.8 4.5 12 4.5zM4.7 7.6C6.1 6.1 8.9 4.5 12 4.5c1.5 0 3 .3 4.3.9l-1.5 1.5c-2.4-.9-5 .1-6.5 1.8-1.2 1.3-1.8 3-1.8 4.8 0 1.5.4 2.8 1.1 3.9l-1.7 1.7c-.9-1.1-1.6-2.4-2.2-3.8C3.7 12 4.1 9.7 4.7 7.6zM12 17.5c-1.8 0-3.5-.3-5.1-.9l1.5-1.5c1.4.6 3 .9 4.6.9 3.1 0 5.9-1.6 7.3-3.1.6-.6.9-1.3 1.1-2.1-.2-.8-.5-1.5-1.1-2.1-.7-.7-1.5-1.3-2.4-1.7L17.7 5C19.1 6.5 20.5 8.7 22 12c-1.7 4.4-5.5 7.5-10 7.5z"/>
              </svg>
            )}
          </span>
        </div>

        <button onClick={handleUpdate} disabled={loading}>
          {loading ? 'Actualizando...' : 'Actualizar'}
        </button>
        <p>{message}</p>
      </div>
    </div>
  )
}
