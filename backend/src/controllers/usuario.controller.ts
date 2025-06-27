// src/controllers/userController.ts

import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';

const usuarioService = new UsuarioService();

export class UsuarioController {
  // Crear un nuevo usuario
  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const newUser = new Usuario();
      newUser.name = name;
      newUser.email = email;
      newUser.password = password;

      const savedUser = await usuarioService.save(newUser);
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  }

  // Obtener todos los usuarios
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await usuarioService.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving users', error });
    }
  }

  // Obtener un usuario por ID
  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await usuarioService.findById(Number(id));
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user', error });
    }
  }

  // Actualizar un usuario por ID
  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedUser = await usuarioService.update(Number(id), req.body);
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  }

  // Eliminar un usuario por ID
  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedUser = await usuarioService.delete(Number(id));
      res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  }
}
