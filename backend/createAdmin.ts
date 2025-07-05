// createAdmin.ts
import { supabaseAdmin } from './src/config/supabaseAdminClient'; // ruta correcta a tu cliente supabase backend
import { AppDataSource } from './src/config/data-source';
import { Usuario } from './src/models/usuario.model';

async function createAdminUser() {
  // Crear usuario en Supabase Auth
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: 'admin@tudominio.com',
    password: 'TuPasswordSeguro',
    email_confirm: true,
  });

  if (error) {
    console.error('Error creando admin en Supabase Auth:', error.message);
    return;
  }

  console.log('Admin creado en Supabase Auth:', data);

  await AppDataSource.initialize();
  const userRepository = AppDataSource.getRepository(Usuario);

  // Verificar si ya existe ese usuario en tu tabla
  const existing = await userRepository.findOneBy({ id: data.user.id });
  if (existing) {
    console.log('Usuario admin ya existe en tabla usuarios');
    return;
  }

  const adminUser = new Usuario();
  adminUser.id = data.user.id; // id generado por Supabase
  adminUser.nombre = 'Administrador';
  adminUser.tipo_usuario = 'admin';

  await userRepository.save(adminUser);

  console.log('Admin insertado en tabla usuarios');
}

createAdminUser().catch(console.error);
