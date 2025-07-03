// src/controllers/valoracionController.ts
import { Request, Response } from 'express';
import { ValoracionService } from '../services/valoracion.Service';

const service = new ValoracionService();

export class ValoracionController {
  static async create(req: Request, res: Response) {
    try {
      const nueva = await service.save(req.body);
      res.status(201).json(nueva);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear valoración', error });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const lista = await service.findAll();
      res.status(200).json(lista);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener valoraciones', error });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const valoracion = await service.findById(req.params.id);
      if (!valoracion) {
        res.status(404).json({ message: 'Valoración no encontrada' });
        return;
      }
      res.status(200).json(valoracion);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener valoración', error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const actualizado = await service.update(req.params.id, req.body);
      res.status(200).json(actualizado);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar valoración', error });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const eliminado = await service.delete(req.params.id);
      res.status(200).json({ message: 'Valoración eliminada', valoracion: eliminado });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar valoración', error });
    }
  }
}
