import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';
import jwt from 'jsonwebtoken';

const usuarioService = new UsuarioService();

export class UsuarioController {
  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const usuarioActual = (req as any).user; // usuario autenticado del middleware

      if (!usuarioActual || usuarioActual.tipo_usuario !== 'admin') {
        res.status(403).json({ message: 'No autorizado. Solo admin puede crear usuarios' });
        return;
      }

      const { nombre, correo, contrasena, tipo_usuario } = req.body;

      if (tipo_usuario === 'cliente') {
        res.status(400).json({ message: 'No puedes crear usuarios de tipo cliente' });
        return;
      }

      const newUser = new Usuario();
      newUser.nombre = nombre;
      newUser.correo = correo;
      newUser.contrasena = contrasena; // se hashea dentro del servicio
      newUser.tipo_usuario = tipo_usuario;

      const savedUser = await usuarioService.save(newUser);
      res.status(201).json(savedUser);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al crear usuario', error: error.message });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { correo, contrasena } = req.body;

      const user = await usuarioService.validateUser(correo, contrasena);
      if (!user) {
        res.status(401).json({ message: 'Credenciales inválidas' });
        return;
      }

      const payload = {
        id: user.id,
        correo: user.correo,
        tipo_usuario: user.tipo_usuario,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET || 'clave_secreta', {
        expiresIn: '1h',
      });

      res.json({ token });
    } catch (error: any) {
      res.status(500).json({ message: 'Error en login', error: error.message });
    }
  }

  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await usuarioService.findAll();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await usuarioService.findById(id);
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedUser = await usuarioService.update(id, req.body);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedUser = await usuarioService.delete(id);
      res.status(200).json({ message: 'Usuario eliminado', usuario: deletedUser });
    } catch (error: any) {
      res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
  }
}
