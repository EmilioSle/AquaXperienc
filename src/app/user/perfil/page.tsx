'use client'

import { useEffect, useState } from 'react'
import '../../../styles/auth.styles/Global.css'
import { supabase } from '../../../config/supabase'

interface UserProfile {
  nombre: string
  apellido: string
  correo: string
  telefono: string
  rol: string
}

export default function PerfilUsuario() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [authId, setAuthId] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) {
        setLoading(false)
        return
      }

      setAuthId(authUser.id)

      const { data: perfil, error } = await supabase
        .from('usuarios')
        .select('nombre, apellido, correo, telefono, rol')
        .eq('id', authUser.id)
        .single()

      if (perfil && !error) {
        setUser(perfil)
      }
      setLoading(false)
    }

    fetchUserProfile()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleSave = async () => {
    if (!user || !authId) return

    const { error } = await supabase
      .from('usuarios')
      .update({
        nombre: user.nombre,
        apellido: user.apellido,
        telefono: user.telefono,
      })
      .eq('id', authId)

    if (!error) {
      alert('Perfil actualizado correctamente.')
      setModoEdicion(false)
    } else {
      console.error(error)
      alert('Error al actualizar perfil.')
    }
  }

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando perfil...</p>
  if (!user) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>No se encontró información del usuario.</p>

  return (
    <div
      className="perfil-container"
      style={{
        backgroundColor: 'var(--background)',
        padding: '2rem',
        minHeight: '100vh'
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: 'var(--border-radius)',
          maxWidth: '600px',
          margin: '0 auto',
          padding: '2rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <h2 style={{ color: 'var(--primary-dark)', fontSize: '1.75rem', marginBottom: '1.5rem' }}>
          Perfil de Usuario
        </h2>

        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label><strong>Correo:</strong></label>
            <p>{user.correo}</p>
          </div>

          <div>
            <label>Nombre:</label>
            {modoEdicion ? (
              <input
                name="nombre"
                value={user.nombre}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p>{user.nombre}</p>
            )}
          </div>

          <div>
            <label>Apellido:</label>
            {modoEdicion ? (
              <input
                name="apellido"
                value={user.apellido}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p>{user.apellido}</p>
            )}
          </div>

          <div>
            <label>Teléfono:</label>
            {modoEdicion ? (
              <input
                name="telefono"
                value={user.telefono}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p>{user.telefono}</p>
            )}
          </div>

          <div>
            <label>Rol:</label>
            <p>{user.rol}</p>
          </div>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          {modoEdicion ? (
            <>
              <button
                onClick={handleSave}
                style={{
                  backgroundColor: 'var(--primary-light)',
                  color: 'white',
                  padding: '0.5rem 1.5rem',
                  border: 'none',
                  borderRadius: 'var(--border-radius)',
                  cursor: 'pointer',
                  transition: 'var(--transition-speed)'
                }}
              >
                Guardar
              </button>
              <button
                onClick={() => setModoEdicion(false)}
                style={{
                  backgroundColor: '#ccc',
                  padding: '0.5rem 1.5rem',
                  border: 'none',
                  borderRadius: 'var(--border-radius)',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={() => setModoEdicion(true)}
              style={{
                backgroundColor: 'var(--primary-dark)',
                color: 'white',
                padding: '0.5rem 1.5rem',
                border: 'none',
                borderRadius: 'var(--border-radius)',
                cursor: 'pointer',
                transition: 'var(--transition-speed)'
              }}
            >
              Editar perfil
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
