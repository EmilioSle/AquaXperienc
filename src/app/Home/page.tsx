
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/auth.styles/Global.css';

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const experiences = [
    {
      title: 'Buceo Profesional',
      description: 'Sumérgete en las profundidades del océano con nuestros instructores certificados y descubre un mundo submarino fascinante.',
      image: '/image/buceo-1.gif',
      alt: 'Buceo bajo el agua',
    },
    {
      title: 'Clases de Surf',
      description: 'Aprende a dominar las olas con nuestras clases de surf para todos los niveles, desde principiantes hasta avanzados.',
      image: '/image/surf-1.gif',
      alt: 'Clase de surf en la playa',
    },
    {
      title: 'Paseos en Lancha',
      description: 'Disfruta de la velocidad y el viento en el rostro con nuestros emocionantes paseos en lancha por la costa.',
      image: '/image/lancha-1.gif',
      alt: 'Paseo en lancha',
    },
    {
      title: 'Snorkel en Arrecifes',
      description: 'Explora arrecifes de coral llenos de vida marina con nuestro equipo de snorkel de alta calidad.',
      image: '/image/snorkel-1.gif',
      alt: 'Snorkel con peces',
    },
  ];

  return (
    <div className="homepage">
      <header className="navbar" role="banner">
        <div className="logo" aria-label="Logo de Aquaxperience">Aquaxperience</div>

        <button
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <nav
          id="primary-navigation"
          className={`nav-links ${menuOpen ? 'active' : ''}`}
          role="navigation"
          aria-label="Menú principal"
        >
          <Link to="/auth/login">Iniciar sesión</Link>
          <Link to="/auth/register">Registrarse</Link>
        </nav>
      </header>

      <main className="main-content" role="main">
        <section> 
          <h1 id="hero-title">¡Bienvenido a Aquaxperience!</h1> 
          <p>
            Sumérgete en una aventura acuática inolvidable. Explora, siente, respira mar y vive experiencias únicas.
          </p>
        </section>

        <section aria-labelledby="experiences-title" className="experiences-section">
          <h2
            id="experiences-title"
            style={{
              textAlign: 'center',
              fontSize: '2rem',
              marginBottom: '2rem',
              color: 'var(--primary-color)',
            }}
          >
            Explora nuestras experiencias destacadas
          </h2>

          {experiences.map((exp, index) => (
            <article
              key={exp.title}
              className={`experience-row ${index % 2 !== 0 ? 'reverse' : ''}`}
              aria-label={exp.title}
            >
              <div className="experience-image-container">
                <img src={exp.image} alt={exp.alt} className="experience-image" loading="lazy" />
              </div>
              <div className="experience-text">
                <h3>{exp.title}</h3>
                <p>{exp.description}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="about-section" aria-labelledby="about-title">
          <h2 id="about-title" className="section-title">
            ¿Por qué elegir Aquaxperience?
          </h2>
          <p className="section-subtitle">
            Nos especializamos en crear momentos inolvidables en el agua. Actividades personalizadas, guías expertos,
            seguridad garantizada y un entorno natural incomparable. Vive la diferencia con Aquaxperience.
          </p>
        </section>
      </main>
    </div>
  );
}
