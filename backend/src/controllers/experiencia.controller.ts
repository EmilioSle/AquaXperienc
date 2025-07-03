// src/controllers/experienciaController.ts
import { Request, Response } from 'express';
import { ExperienciaService } from '../services/experiencia.Service';

const experienciaService = new ExperienciaService();

export class ExperienciaController {
  static async create(req: Request, res: Response) {
    try {
      const nueva = await experienciaService.save(req.body);
      res.status(201).json(nueva);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear experiencia', error });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const lista = await experienciaService.findAll();
      res.status(200).json(lista);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener experiencias', error });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const experiencia = await experienciaService.findById(req.params.id);
      if (!experiencia) {
        res.status(404).json({ message: 'Experiencia no encontrada' });
        return;
      }
      res.status(200).json(experiencia);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener experiencia', error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const actualizada = await experienciaService.update(req.params.id, req.body);
      res.status(200).json(actualizada);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar experiencia', error });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const eliminada = await experienciaService.delete(req.params.id);
      res.status(200).json({ message: 'Experiencia eliminada', experiencia: eliminada });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar experiencia', error });
    }
  }
}
