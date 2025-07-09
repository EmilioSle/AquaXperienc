// src/app/auth/register/page.tsx
'use client'

import { useState } from 'react'
import { supabase } from '../../../config/supabase'
import '../../../styles/auth.styles/Global.css'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [celular, setCelular] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmar) {
      setMessage('❌ Las contraseñas no coinciden.')
      return
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError || !authData.user) {
      setMessage(`❌ ${authError?.message}`)
      return
    }

    const userId = authData.user.id

    const { error: dbError } = await supabase.from('usuarios').insert([
      {
        id: userId,
        nombre: nombres,
        apellido: apellidos,
        telefono: celular,
        correo: email,
      },
    ])

    if (dbError) {
      setMessage(`⚠️ Registro incompleto: ${dbError.message}`)
    } else {
      setMessage('✅ Registro exitoso. Revisa tu correo para confirmar tu cuenta.')
      setTimeout(() => navigate('/auth/login'), 3000)
    }
  }

  return (
    <div className="form-container">
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombres}
          onChange={(e) => setNombres(e.target.value)}
          required
        /><br />

        <input
          type="text"
          placeholder="Apellido"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
          required
        /><br />

        <input
          type="tel"
          placeholder="Teléfono"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
          required
        /><br />

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <input
          type={mostrarPassword ? 'text' : 'password'}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        <input
          type={mostrarPassword ? 'text' : 'password'}
          placeholder="Confirmar contraseña"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
          required
        /><br />

        <label style={{ fontSize: '0.9rem' }}>
          <input
            type="checkbox"
            checked={mostrarPassword}
            onChange={() => setMostrarPassword(!mostrarPassword)}
          />
          {' '}Mostrar contraseñas
        </label><br />

        <button type="submit">Registrarse</button>
      </form>
      <p>{message}</p>
    </div>
  )
}
