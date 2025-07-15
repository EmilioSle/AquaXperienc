import { useState } from 'react';
import '../../styles/auth.styles/Global.css';

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');

  const experiencias = [
    'Clases de surf en Manta',
    'Buceo en Isla de la Plata',
    'Kayak en Los Frailes',
    'Snorkel con tortugas',
    'Paddle board al atardecer',
    'Tour en lancha por la costa',
  ];

  const resultados = experiencias.filter((exp) =>
    exp.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <header className="main-header">
        <div className="header-content">
          <h2 className="logo">AquaXperience</h2>

          <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
            <a href="/dashboard">Inicio</a>
            <a href="#" onClick={() => setShowSearch(!showSearch)}>Buscar</a>
            <a href="#">Reservas</a>
            <a href="#">Alquiler</a>
            <a href="#">Instructores</a>
          </nav>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            ☰
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <h1>Bienvenido a AquaXperience</h1>
        <p>
          Vive la emoción del océano con AquaXperience. Descubre las mejores actividades acuáticas en Manta, Ecuador.
        </p>

        {showSearch && (
          <section className="search-section">
            <h2>Buscar Experiencias</h2>
            <input
              type="text"
              placeholder="Escribe una actividad o lugar..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
            <ul className="search-results">
              {resultados.length > 0 ? (
                resultados.map((exp, index) => <li key={index}>{exp}</li>)
              ) : (
                <li>No se encontraron resultados.</li>
              )}
            </ul>
          </section>
        )}

        <section className="experiencias-section">
          <h2>Actividades Destacadas</h2>

          <div className="experiencia-alternada">
            <img src="/image/surf.jpg" alt="Surf en Manta" />
            <div className="experiencia-texto">
              <h3>Clases de Surf</h3>
              <p>Aprende a surfear con instructores certificados en Santa Marianita.</p>
            </div>
          </div>

          <div className="experiencia-alternada">
            <div className="experiencia-texto">
              <h3>Buceo Discovery</h3>
              <p>Explora el mundo submarino sin necesidad de licencia. Incluye fotos y videos.</p>
            </div>
            <img src="/image/buceo.jpg" alt="Buceo Discovery" />
          </div>

          <div className="experiencia-alternada">
            <img src="/image/snorkel.jpg" alt="Snorkel con tortugas" />
            <div className="experiencia-texto">
              <h3>Snorkel con Tortugas</h3>
              <p>Nada junto a tortugas marinas en aguas cristalinas.</p>
            </div>
          </div>

          <div className="experiencia-alternada">
            <div className="experiencia-texto">
              <h3>Tour en Lancha</h3>
              <p>Recorre la costa y descubre playas escondidas.</p>
            </div>
            <img src="/image/lancha.jpg" alt="Tour en lancha" />
          </div>
        </section>

        <section className="testimonios-section">
          <h2>Lo que dicen nuestros clientes</h2>
          <div className="testimonios-grid">
            <div className="testimonio-card">
              <img src="/imagenes/cliente1.jpg" alt="Cliente feliz" />
              <p>"Una experiencia inolvidable. El buceo fue espectacular y el equipo muy profesional."</p>
              <strong>- María, Quito</strong>
            </div>
            <div className="testimonio-card">
              <img src="/imagenes/cliente2.jpg" alt="Cliente feliz" />
              <p>"Tomé clases de surf por primera vez y me encantó. ¡Gracias AquaXperience!"</p>
              <strong>- Juan, Guayaquil</strong>
            </div>
            <div className="testimonio-card">
              <img src="/imagenes/cliente3.jpg" alt="Cliente feliz" />
              <p>"El tour en lancha fue relajante y hermoso. Lo recomiendo totalmente."</p>
              <strong>- Ana, Cuenca</strong>
            </div>
          </div>
        </section>

        <div className="dashboard-cards">
          <div className="card">
            <h3>Reservas</h3>
            <p>Consulta tus próximas actividades y gestiona tus reservas.</p>
            <button>Ver Reservas</button>
          </div>

          <div className="card">
            <h3>Alquiler de Equipos</h3>
            <p>Renta tablas, trajes, tanques y más con proveedores locales.</p>
            <button>Alquilar</button>
          </div>
        </div>
      </main>
    </div>
  );
}
