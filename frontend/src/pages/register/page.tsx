import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabaseClient';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    correo: '',
    contrasena: '',
    nombre: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Registrar usuario en Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: form.correo,
        password: form.contrasena,
      });

      if (error) throw error;

      console.log('Usuario registrado en Auth:', data.user);

      const userId = data.user?.id;

      if (!userId) throw new Error('No se pudo obtener el ID del usuario.');

      // 2. Insertar datos adicionales en la tabla usuarios con tipo_usuario fijo 'cliente'
      const { error: insertError } = await supabase.from('usuarios').insert([
        {
          id: userId, // ID generado en Auth (foreign key)
          nombre: form.nombre,
          tipo_usuario: 'cliente', // siempre cliente
        },
      ]);

      if (insertError) throw insertError;

      alert('Registro exitoso. Revisa tu correo para confirmar tu cuenta.');
      navigate('/login');
    } catch (error: any) {
      alert('Error al registrar: ' + error.message);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
          required
        />
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
        {/* Se elimina el select para tipo_usuario */}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterPage;
