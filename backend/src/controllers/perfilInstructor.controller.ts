// src/controllers/perfilInstructor.Controller.ts
import { Request, Response } from 'express';
import { PerfilInstructorService } from '../services/perfilInstructor.Service';
import { PerfilInstructor } from '../models/perfil_instructor.model';

const service = new PerfilInstructorService();

export class PerfilInstructorController {
  static async create(req: Request, res: Response) {
    try {
      const perfil = new PerfilInstructor();
      Object.assign(perfil, req.body);

      const nuevoPerfil = await service.save(perfil);
      res.status(201).json(nuevoPerfil);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear perfil', error });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const perfiles = await service.findAll();
      res.status(200).json(perfiles);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener perfiles', error });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const perfil = await service.findById(req.params.id);
      if (!perfil) {
        res.status(404).json({ message: 'Perfil no encontrado' });
        return;
      }
      res.status(200).json(perfil);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener perfil', error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const actualizado = await service.update(req.params.id, req.body);
      res.status(200).json(actualizado);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar perfil', error });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const eliminado = await service.delete(req.params.id);
      res.status(200).json({ message: 'Perfil eliminado', perfil: eliminado });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar perfil', error });
    }
  }
}
