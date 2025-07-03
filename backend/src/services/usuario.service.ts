// src/services/userService.ts
import { AppDataSource } from '../config/data-source';
import { Usuario } from '../models/usuario.model';
import { IUsuario } from '../interfaces/Iusuario';
import { Repository } from 'typeorm';

export class UsuarioService implements IUsuario {
  private userRepository: Repository<Usuario>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(Usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.userRepository.find();
  }

  async findById(id: string): Promise<Usuario | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async findByEmail(correo: string): Promise<Usuario | null> {
    return await this.userRepository.findOneBy({ correo });
  }

  async save(usuario: Usuario): Promise<Usuario> {
    return await this.userRepository.save(usuario);
  }

  async update(id: string, usuario: Usuario): Promise<Usuario> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new Error('Usuario no encontrado');

    Object.assign(user, usuario);
    return await this.userRepository.save(user);
  }

  async delete(id: string): Promise<Usuario> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new Error('Usuario no encontrado');

    await this.userRepository.remove(user);
    return user;
  }
}
