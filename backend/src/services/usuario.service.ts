// src/services/userService.ts

import { AppDataSource } from '../config/data-source';
import { Usuario } from '../models/usuario.model';
import { IUsuario } from '../interfaces/Iusuario';
import { Repository } from 'typeorm';

export class UsuarioService implements IUsuario {
  private userRepository: Repository<Usuario>;

  constructor() {
    // Inicializa el repositorio usando el DataSource
    this.userRepository = AppDataSource.getRepository(Usuario);
  }

  // Obtener todos los usuarios
  async findAll(): Promise<Usuario[]> {
    return await this.userRepository.find();
  }

  // Obtener un usuario por ID
  async findById(id: number): Promise<Usuario | null> {
    const user = await this.userRepository.findOneBy({ id });
    return user || null;
  }

  // Obtener un usuario por email
  async findByEmail(email: string): Promise<Usuario | null> {
    const user = await this.userRepository.findOneBy({ email });
    return user || null;
  }

  // Crear un nuevo usuario
  async save(usuario: Usuario): Promise<Usuario> {
    return await this.userRepository.save(usuario);
  }

  // Actualizar un usuario por ID
  async update(id: number, usuario: Usuario): Promise<Usuario> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }

    // Asigna los nuevos valores al usuario
    Object.assign(user, usuario);
    return await this.userRepository.save(user);
  }

  // Eliminar un usuario por ID
  async delete(id: number): Promise<Usuario> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.remove(user);
    return user;
  }
}
