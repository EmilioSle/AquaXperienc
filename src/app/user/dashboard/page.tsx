import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../config/supabase';
import '../../../styles/auth.styles/Global.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import HeaderUser from '../../../components/User/Header/Header';
import { experiencias } from '../../../components/User/data/page';
import { textosDashboard, testimonios } from '../../../components/User/data/page';

export default function DashboardPage() {
  const [query] = useState('');
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const navigate = useNavigate();
  
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
      .select('correo, rol')
      .eq('id', currentUser.id)
      .single();

    if (perfilError || !perfil) {
      console.warn('Usuario no autorizado:', perfilError);
      navigate('../../auth/login');
      return;
    }

    if (perfil.rol !== 'USUARIO') {
      navigate('../../auth/login');
      return;
    }

    setIsAuthorized(true);
  };

  checkUser();
}, [navigate]);

  // useEffect(() => {
  //     const checkUser = async () => {
  //       const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  //       const currentUser = sessionData?.session?.user;

  //       if (!currentUser || sessionError) {
  //         navigate('../../auth/login');
  //         return;
  //       }

  //       const { data: perfil, error: perfilError } = await supabase
  //         .from('usuarios')
  //         .select('correo, rol')
  //         .eq('id', currentUser.id)
  //         .single();

  //       if (perfilError || !perfil) {
  //         console.warn('Usuario no autorizado:', perfilError);
  //         navigate('../../auth/login');
  //         return;
  //       }

  //       if (perfil.rol !== 'USUARIO') {
  //         navigate('../../auth/login');
  //         return;
  //       }

  //       setIsAuthorized(true);
  //     };

  //     checkUser();
  //   }, [navigate]);

  if (isAuthorized === null) return <p>Cargando...</p>;

  return (
    <>
      <HeaderUser />
      <div className="dashboard-content">
        <main className="dashboard-main">
          <h1>{textosDashboard.bienvenida}</h1>
          <p>{textosDashboard.descripcion}</p>

          <section className="experiencias-section">
            <h2>{textosDashboard.actividadesTitulo}</h2>

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
            <h2>{textosDashboard.testimoniosTitulo}</h2>
            <div className="testimonios-grid">
              {testimonios.map((t: any, index: number) => (
                <div className="testimonio-card" key={index}>
                  <img src={t.imagen} alt={`${t.nombre}, ${t.ciudad}`} />
                  <p>{t.texto}</p>
                  <div className="testimonio-info">
                    <strong>{t.nombre}</strong>
                    <span>{t.ciudad}</span>
                    <div className="estrellas">{t.estrellas}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="dashboard-cards">
            <div className="card">
              <h3>
                <i className="fas fa-calendar-alt"></i> Reservas
              </h3>
              <p>Consulta tus próximas actividades y gestiona tus reservas.</p>
              <button>
                <i className="fas fa-eye"></i> Ver Reservas
              </button>
            </div>

            <div className="card">
              <h3>
                <i className="fas fa-tools"></i> Alquiler de Equipos
              </h3>
              <p>Renta tablas, trajes, tanques y más con proveedores locales.</p>
              <button>
                <i className="fas fa-shopping-cart"></i> Alquilar
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
