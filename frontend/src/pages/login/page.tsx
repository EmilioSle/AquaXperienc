import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    correo: '',
    contrasena: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Iniciar sesión con Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.correo,
        password: form.contrasena,
      });

      if (error) throw error;

      console.log('Sesión iniciada:', data.session);
      console.log('Usuario:', data.user);

      alert('Inicio de sesión exitoso');
      navigate('/'); // Redirige donde quieras
    } catch (error: any) {
      alert('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default LoginPage;
