import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../config/supabase';
import '../../../styles/auth.styles/Global.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import HeaderCoach from '../../../components/coach/Header/Header';

export default function DashboardCoachPage() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const currentUser = sessionData?.session?.user;
        if (!currentUser) throw new Error('No autenticado');

        const { data: perfil } = await supabase
          .from('usuarios')
          .select('correo, rol')
          .eq('id', currentUser.id)
          .single();

        if (!perfil || perfil.rol !== 'ENTRENADOR') throw new Error('Acceso denegado');

        setIsAuthorized(true);
      } catch (error) {
        console.warn('Acceso denegado:', error);
        navigate('../../auth/login');
      }
    };

    checkUser();
  }, [navigate]);

  if (isAuthorized === null) return <p>Cargando...</p>;

  return (
    <>
      <HeaderCoach />
      <div className="dashboard-content">
        <main className="dashboard-main">
          <h1>Panel del Coach</h1>
          <p>Administra tus clases, estudiantes y desempeño desde este panel exclusivo para instructores.</p>

          <section className="coach-section">
            <h2>Próximas Clases</h2>
            <div className="card-list">
              <div className="card">
                <h3><i className="fas fa-water"></i> Clase de Buceo Intermedio</h3>
                <p>Fecha: 20 de julio · Hora: 10:00 AM</p>
                <p>Ubicación: Isla de la Plata</p>
              </div>
              <div className="card">
                <h3><i className="fas fa-swimmer"></i> Clase de Snorkel Familiar</h3>
                <p>Fecha: 22 de julio · Hora: 2:00 PM</p>
                <p>Ubicación: Playa El Murciélago</p>
              </div>
            </div>
          </section>

          <section className="coach-section">
            <h2>Estudiantes Asignados</h2>
            <div className="card-list">
              <div className="card">
                <h3>María Torres</h3>
                <p>Inscrita en: Curso de Surf Básico</p>
                <p>Progreso: 60%</p>
              </div>
              <div className="card">
                <h3>Carlos Pérez</h3>
                <p>Inscrito en: Buceo Avanzado</p>
                <p>Progreso: 30%</p>
              </div>
            </div>
          </section>

          <section className="coach-section">
            <h2>Estadísticas Generales</h2>
            <div className="dashboard-cards">
              <div className="card">
                <h3><i className="fas fa-users"></i> Estudiantes</h3>
                <p>12 activos esta semana</p>
              </div>
              <div className="card">
                <h3><i className="fas fa-chart-line"></i> Clases Impartidas</h3>
                <p>5 clases este mes</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
