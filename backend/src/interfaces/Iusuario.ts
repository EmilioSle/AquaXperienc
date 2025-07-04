import { Usuario } from "../models/usuario.model";

export interface IUsuario {
  findAll(): Promise<Usuario[]>;
  findById(id: string): Promise<Usuario | null>;
  findByEmail(correo: string): Promise<Usuario | null>;
  save(usuario: Usuario): Promise<Usuario>;
  update(id: string, usuario: Usuario): Promise<Usuario>;
  delete(id: string): Promise<Usuario>;

  // Validar credenciales (correo + contraseña)
  validateUser(correo: string, contrasena: string): Promise<Usuario | null>;
}
