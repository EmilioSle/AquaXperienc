// src/controllers/disponibilidadController.ts
import { Request, Response } from 'express';
import { DisponibilidadService } from '../services/disponibilidad.Service';

const service = new DisponibilidadService();

export class DisponibilidadController {
  static async create(req: Request, res: Response) {
    try {
      const nueva = await service.save(req.body);
      res.status(201).json(nueva);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear disponibilidad', error });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const lista = await service.findAll();
      res.status(200).json(lista);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener disponibilidades', error });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const item = await service.findById(req.params.id);
      if (!item) {
        res.status(404).json({ message: 'Disponibilidad no encontrada' });
        return;
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener disponibilidad', error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const actualizado = await service.update(req.params.id, req.body);
      res.status(200).json(actualizado);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar disponibilidad', error });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const eliminado = await service.delete(req.params.id);
      res.status(200).json({ message: 'Disponibilidad eliminada', disponibilidad: eliminado });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar disponibilidad', error });
    }
  }
}
