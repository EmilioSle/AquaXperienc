import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    tipo_usuario: 'cliente',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Error al registrar');
      }

      navigate('/login');
    } catch (error) {
      alert('Error al registrar: ' + error);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
        <input type="email" name="correo" placeholder="Correo" onChange={handleChange} required />
        <input type="password" name="contrasena" placeholder="Contraseña" onChange={handleChange} required />
        <select name="tipo_usuario" onChange={handleChange}>
          <option value="cliente">Cliente</option>
          <option value="instructor">Instructor</option>
          <option value="proveedor">Proveedor</option>
          <option value="admin">Admin</option>
          <option value="soporte">Soporte</option>
        </select>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterPage;
