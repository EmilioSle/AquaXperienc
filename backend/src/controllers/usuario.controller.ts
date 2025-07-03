// src/controllers/userController.ts
import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';

const usuarioService = new UsuarioService();

export class UsuarioController {
  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, correo, contrasena, tipo_usuario } = req.body;
      const newUser = new Usuario();
      newUser.nombre = nombre;
      newUser.correo = correo;
      newUser.contrasena = contrasena;
      newUser.tipo_usuario = tipo_usuario;

      const savedUser = await usuarioService.save(newUser);
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear usuario', error });
    }
  }

  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await usuarioService.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener usuarios', error });
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
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener usuario', error });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedUser = await usuarioService.update(id, req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar usuario', error });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedUser = await usuarioService.delete(id);
      res.status(200).json({ message: 'Usuario eliminado', usuario: deletedUser });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar usuario', error });
    }
  }
}
