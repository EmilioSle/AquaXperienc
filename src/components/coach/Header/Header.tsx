// src/components/HeaderCoach.tsx
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../../config/supabase';
import '../../../styles/auth.styles/Global.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function HeaderCoach() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth/login');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !(profileRef.current as any).contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="main-header">
      <div className="header-content">
        <h2 className="logo">
          <a href="/dashboard/coach">AquaXperience Coach</a>
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
                  placeholder="Buscar clases o alumnos..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            )}
          </div>
          <a href="/coach/clases"><i className="fas fa-calendar-alt"></i> Mis Clases</a>
          <a href="/coach/alumnos"><i className="fas fa-users"></i> Alumnos</a>
          <a href="/coach/estadisticas"><i className="fas fa-chart-pie"></i> Estadísticas</a>

          <div className="profile-menu-container" ref={profileRef}>
            <i
              className="fas fa-user-circle profile-icon"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              title="Perfil"
            ></i>
            {showProfileMenu && (
              <div className="profile-dropdown">
                <a href="/coach/perfil" className="profile-option">Ver Perfil</a>
                <button onClick={handleLogout} className="profile-option">Cerrar Sesión</button>
              </div>
            )}
          </div>
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
  );
}
