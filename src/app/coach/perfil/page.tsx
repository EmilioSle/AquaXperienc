'use client'

import { useEffect, useState } from 'react'
import '../../../styles/auth.styles/Global.css'
import { supabase } from '../../../config/supabase'
import HeaderUser from '../../../components/User/Header/Header'

interface UserProfile {
  nombre: string
  apellido: string
  correo: string
  telefono: string
  rol: string
}

interface FormErrors {
  nombre?: string
  apellido?: string
  correo?: string
  telefono?: string
}

export default function PerfilEntrenador() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [formData, setFormData] = useState<UserProfile | null>(null)
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [authId, setAuthId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)

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
        setFormData(perfil)
      }

      setLoading(false)
    }

    fetchUserProfile()
  }, [])

  const validateForm = () => {
    const errors: FormErrors = {}

    if (!formData?.nombre?.trim()) {
      errors.nombre = 'El nombre es obligatorio.'
    }

    if (!formData?.apellido?.trim()) {
      errors.apellido = 'El apellido es obligatorio.'
    }

    if (!formData?.correo?.trim()) {
      errors.correo = 'El correo es obligatorio.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      errors.correo = 'Formato de correo inválido.'
    }

    if (!formData?.telefono?.trim()) {
      errors.telefono = 'El teléfono es obligatorio.'
    } else if (formData.telefono.length < 8) {
      errors.telefono = 'El teléfono debe tener al menos 8 dígitos.'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (formData) {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async () => {
    if (!formData || !authId) return
    if (!validateForm()) return

    const correoCambiado = formData.correo !== user?.correo

    if (correoCambiado) {
      const { error: authError } = await supabase.auth.updateUser({
        email: formData.correo,
      })

      if (authError) {
        setMensaje(`Error al actualizar el correo en Supabase Auth: ${authError.message}`)
        return
      }
    }

    const { error: dbError } = await supabase
      .from('usuarios')
      .update({
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: formData.correo,
        telefono: formData.telefono
      })
      .eq('id', authId)

    if (dbError) {
      setMensaje(`Error al actualizar en base de datos: ${dbError.message}`)
    } else {
      setUser(formData)
      setMensaje(
        correoCambiado
          ? '✅ Correo actualizado. Revisa tu correo para confirmar el cambio.'
          : '✅ Perfil actualizado con éxito.'
      )
      setModoEdicion(false)
      setFormErrors({})
    }
  }

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando perfil...</p>
  if (!user || !formData) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>No se encontró información del usuario.</p>

  return (
    <>
      <HeaderUser />

      <div
        style={{
          backgroundColor: 'var(--background)',
          padding: '2rem',
          minHeight: '100vh',
          fontFamily: 'Segoe UI, sans-serif'
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: 'var(--border-radius)',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '2.5rem',
            boxShadow: '0 6px 16px rgba(0,0,0,0.12)'
          }}
        >
          <h2 style={{
            color: 'var(--primary-dark)',
            fontSize: '1.8rem',
            marginBottom: '2rem',
            borderBottom: '2px solid var(--accent-light)',
            paddingBottom: '0.5rem'
          }}>
            Mi Perfil
          </h2>

          <div className="grid gap-4">
            <div>
              <label><strong>Nombre:</strong></label>
              {modoEdicion ? (
                <>
                  <input
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="input-field"
                  />
                  {formErrors.nombre && <p style={{ color: 'red' }}>{formErrors.nombre}</p>}
                </>
              ) : (
                <p>{user.nombre}</p>
              )}
            </div>

            <div>
              <label><strong>Apellido:</strong></label>
              {modoEdicion ? (
                <>
                  <input
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className="input-field"
                  />
                  {formErrors.apellido && <p style={{ color: 'red' }}>{formErrors.apellido}</p>}
                </>
              ) : (
                <p>{user.apellido}</p>
              )}
            </div>

            <div>
              <label><strong>Correo:</strong></label>
              {modoEdicion ? (
                <>
                  <input
                    name="correo"
                    type="email"
                    value={formData.correo}
                    onChange={handleChange}
                    className="input-field"
                  />
                  {formErrors.correo && <p style={{ color: 'red' }}>{formErrors.correo}</p>}
                </>
              ) : (
                <p>{user.correo}</p>
              )}
            </div>

            <div>
              <label><strong>Teléfono:</strong></label>
              {modoEdicion ? (
                <>
                  <input
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="input-field"
                  />
                  {formErrors.telefono && <p style={{ color: 'red' }}>{formErrors.telefono}</p>}
                </>
              ) : (
                <p>{user.telefono}</p>
              )}
            </div>

            <div>
              <label><strong>Rol:</strong></label>
              <p>{user.rol}</p>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              {modoEdicion ? (
                <>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    style={{
                      backgroundColor: 'var(--primary-light)',
                      color: 'white',
                      padding: '0.5rem 1.2rem',
                      border: 'none',
                      borderRadius: 'var(--border-radius)',
                      cursor: 'pointer'
                    }}
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setModoEdicion(false)
                      setFormData(user)
                      setFormErrors({})
                      setMensaje(null)
                    }}
                    style={{
                      backgroundColor: 'gray',
                      color: 'white',
                      padding: '0.5rem 1.2rem',
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
                  type="button"
                  onClick={() => {
                    setModoEdicion(true)
                    setMensaje(null)
                  }}
                  style={{
                    backgroundColor: 'var(--primary-dark)',
                    color: 'white',
                    padding: '0.5rem 1.5rem',
                    border: 'none',
                    borderRadius: 'var(--border-radius)',
                    cursor: 'pointer'
                  }}
                >
                  Editar perfil
                </button>
              )}
            </div>

            {mensaje && (
              <p
                style={{
                  marginTop: '1rem',
                  color: mensaje.includes('✅') ? 'green' : 'red',
                  fontWeight: 'bold'
                }}
              >
                {mensaje}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
