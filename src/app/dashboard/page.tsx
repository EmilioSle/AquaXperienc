import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabase';
import '../../styles/auth.styles/Global.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const experiencias = [
    {
      titulo: 'Clases de surf en Manta',
      descripcion:
        'Domina las olas en una de las playas más icónicas de Ecuador. Nuestras clases de surf en Santa Marianita están diseñadas para todos los niveles, desde principiantes hasta avanzados. Aprende con instructores certificados, en un entorno seguro y lleno de energía. ¡Incluye tabla, traje y mucha adrenalina!.',
      imagen: '/image/surf.jpg',
      retro: '¡Prepárate para surfear como un profesional!',
      infoExtra: 'Santa Marianita es conocida como la “capital del viento” en Ecuador, ideal para surf, kitesurf y windsurf durante todo el año.',
    },
    {
      titulo: 'Buceo en Isla de la Plata',
      descripcion:
        'Sumérgete en un mundo submarino lleno de vida y color. Este tour de buceo no requiere experiencia previa y te lleva a explorar arrecifes, peces tropicales y formaciones rocosas únicas. Incluye equipo completo, guía profesional, fotos y videos para que revivas la experiencia una y otra vez.',
      imagen: '/image/buceo.jpg',
      retro: '¡Sumérgete en una aventura inolvidable!',
      infoExtra: 'La Isla de la Plata es parte del Parque Nacional Machalilla y alberga especies similares a las de Galápagos, como tortugas, mantarrayas y tiburones de arrecife.',
    },
    {
      titulo: 'Snorkel con tortugas',
      descripcion:
        'Vive una experiencia mágica nadando junto a tortugas marinas en aguas cristalinas. Ideal para familias, parejas o aventureros que buscan una conexión auténtica con la naturaleza. Nuestros guías te acompañan en todo momento para garantizar seguridad y diversión.',
      imagen: '/image/snorkel.jpg',
      retro: '¡Conéctate con la naturaleza bajo el agua!',
      infoExtra: 'Las tortugas verdes que habitan esta zona pueden pesar hasta 200 kg y recorrer miles de kilómetros durante su vida.',
    },
    {
      titulo: 'Tour en lancha por la costa',
      descripcion:
        'Navega por la costa manabita y descubre playas vírgenes, acantilados impresionantes y fauna marina en su hábitat natural. Este tour es perfecto para relajarte, tomar fotos espectaculares y disfrutar de una bebida refrescante mientras el sol acaricia el horizonte.',
      imagen: '/image/lancha.jpg',
      retro: '¡Relájate y disfruta del paisaje costero!',
      infoExtra: 'En temporada, es posible avistar ballenas jorobadas durante el recorrido, especialmente entre junio y septiembre.',
    },
  ];

  useEffect(() => {
    const checkUser = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      const currentUser = sessionData?.session?.user;

      if (!currentUser || sessionError) {
        navigate('../../auth/login');
        return;
      }

      const { data: perfil, error: perfilError } = await supabase
        .from('usuarios')
        .select('correo')
        .eq('id', currentUser.id)
        .single();

      if (perfilError || !perfil) {
        console.warn('Usuario no autorizado:', perfilError);
        navigate('/login');
      } else {
        setIsAuthorized(true);
      }
    };

    checkUser();
  }, [navigate]);

  if (isAuthorized === null) return <p>Cargando...</p>;

  return (
    <div>
      <header className="main-header">
        <div className="header-content">
          <h2 className="logo">
            <a href="/dashboard">AquaXperience</a>
          </h2>

          <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
            <div
              className="menu-item-buscar"
              onMouseEnter={() => setShowSearch(true)}
              onMouseLeave={() => setShowSearch(false)}
            >
              <a href="#"><i className="fas fa-search"></i> Buscar</a>
              {showSearch && (
                <div className="search-dropdown">
                  <input
                    type="text"
                    placeholder="Buscar experiencias..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                  />
                </div>
              )}
            </div>
            <a href="#"><i className="fas fa-calendar-check"></i> Reservas</a>
            <a href="#"><i className="fas fa-suitcase-rolling"></i> Alquiler</a>
            <a href="#"><i className="fas fa-chalkboard-teacher"></i> Instructores</a>
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

        <section className="experiencias-section">
          <h2>Actividades Destacadas</h2>

          {experiencias
            .filter(
              (exp) =>
                exp.titulo.toLowerCase().includes(query.toLowerCase()) ||
                exp.descripcion.toLowerCase().includes(query.toLowerCase())
            )
            .map((exp, index) => (
              <div className="experiencia-alternada" key={index}>
                {index % 2 === 0 ? (
                  <>
                    <img src={exp.imagen} alt={exp.titulo} />
                    <div className="experiencia-texto">
                      <h3>{exp.titulo}</h3>
                      <p>{exp.descripcion}</p>
                      <div className="tooltip-container">
                        <button className="info-button">Ver más</button>
                        <div className="tooltip-content">{exp.infoExtra}</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="experiencia-texto">
                      <h3>{exp.titulo}</h3>
                      <p>{exp.descripcion}</p>
                      <div className="tooltip-container">
                        <button className="info-button">Ver más</button>
                        <div className="tooltip-content">
                          <strong>Dato curioso:</strong>
                          <p>{exp.infoExtra}</p>
                        </div>
                      </div>
                    </div>
                    <img src={exp.imagen} alt={exp.titulo} />
                  </>
                )}
              </div>
            ))}
        </section>

        <section className="testimonios-section">
          <h2>Lo que dicen nuestros clientes</h2>
          <div className="testimonios-grid">
            <div className="testimonio-card">
              <img src="/imagenes/cliente1.jpg" alt="María, Quito" />
              <p>
                “El buceo fue una experiencia mágica. Nunca imaginé ver tanta vida marina tan cerca. El equipo fue amable, profesional y me sentí segura en todo momento.”
              </p>
              <div className="testimonio-info">
                <strong>María</strong>
                <span>Quito, Ecuador</span>
                <div className="estrellas">★★★★★</div>
              </div>
            </div>

            <div className="testimonio-card">
              <img src="/imagenes/cliente2.jpg" alt="Juan, Guayaquil" />
              <p>
                “Tomé clases de surf por primera vez y fue increíble. El instructor fue paciente y divertido. ¡Ahora quiero volver cada fin de semana!”
              </p>
              <div className="testimonio-info">
                <strong>Juan</strong>
                <span>Guayaquil, Ecuador</span>
                <div className="estrellas">★★★★☆</div>
              </div>
            </div>

            <div className="testimonio-card">
              <img src="/imagenes/cliente3.jpg" alt="Ana, Cuenca" />
              <p>
                “El tour en lancha fue relajante y hermoso. Vimos delfines, aves marinas y playas escondidas. Una experiencia que repetiría sin dudarlo.”
              </p>
              <div className="testimonio-info">
                <strong>Ana</strong>
                <span>Cuenca, Ecuador</span>
                <div className="estrellas">★★★★★</div>
              </div>
            </div>
          </div>
        </section>



        <div className="dashboard-cards">
          <div className="card">
            <h3><i className="fas fa-calendar-alt"></i> Reservas</h3>
            <p>Consulta tus próximas actividades y gestiona tus reservas.</p>
            <button><i className="fas fa-eye"></i> Ver Reservas</button>
          </div>

          <div className="card">
            <h3><i className="fas fa-tools"></i> Alquiler de Equipos</h3>
            <p>Renta tablas, trajes, tanques y más con proveedores locales.</p>
            <button><i className="fas fa-shopping-cart"></i> Alquilar</button>
          </div>
        </div>
      </main>
    </div>
  );
}
