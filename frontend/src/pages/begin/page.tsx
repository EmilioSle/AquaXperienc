import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Usuario {
  nombre: string;
  correo: string;
  tipo_usuario: 'cliente' | 'instructor' | 'proveedor' | 'admin' | 'soporte';
}

const BeginPage = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUsuario(parsedUser);
    } catch {
      localStorage.removeItem('usuario');
      navigate('/login');
    }
  }, [navigate]);

  if (!usuario) return null;

  return (
    <div style={{ padding: 40 }}>
      <h2>Bienvenido, {usuario.nombre} 👋</h2>
      <h4>Rol: {usuario.tipo_usuario}</h4>

      {usuario.tipo_usuario === 'cliente' && (
        <div>
          <p>🎯 Aquí podrás ver experiencias disponibles, reservar y dejar valoraciones.</p>
          <button onClick={() => navigate('/experiencias')}>Explorar Experiencias</button>
        </div>
      )}

      {usuario.tipo_usuario === 'instructor' && (
        <div>
          <p>📅 Aquí puedes gestionar tu perfil, disponibilidad y asignaciones.</p>
          <button onClick={() => navigate('/disponibilidad')}>Mi Disponibilidad</button>
        </div>
      )}

      {usuario.tipo_usuario === 'proveedor' && (
        <div>
          <p>🧰 Aquí puedes subir equipos para alquiler y ver tus registros.</p>
          <button onClick={() => navigate('/equipos')}>Ver Mis Equipos</button>
        </div>
      )}

      {usuario.tipo_usuario === 'admin' && (
        <div>
          <p>🛠 Panel de administración del sistema.</p>
          <button onClick={() => navigate('/admin')}>Ir al panel</button>
        </div>
      )}

      {usuario.tipo_usuario === 'soporte' && (
        <div>
          <p>🧑‍💻 Panel de atención y soporte a usuarios.</p>
          <button onClick={() => navigate('/soporte')}>Panel de Soporte</button>
        </div>
      )}

      <br />
      <button onClick={() => {
        localStorage.removeItem('usuario');
        navigate('/login');
      }}>Cerrar sesión</button>
    </div>
  );
};

export default BeginPage;
