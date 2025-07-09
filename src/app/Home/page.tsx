// src/pages/HomePage.tsx (o donde lo tengas)
import { Link } from 'react-router-dom'
import '../../styles/auth.styles/Global.css'
export default function HomePage() {
  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Aquaxperience</h2>
        <p style={{ textAlign: 'center', color: '#555', fontSize: '1.1rem', marginBottom: '2rem' }}>
          El contenido de esta página estará disponible próximamente.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/auth/login">
            <button type="button">Iniciar sesión</button>
          </Link>
          <Link to="/auth/register">
            <button type="button">Registrarse</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
