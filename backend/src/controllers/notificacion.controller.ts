// src/controllers/notificacionController.ts
import { Request, Response } from 'express';
import { NotificacionService } from '../services/notificacion.Service';

const service = new NotificacionService();

export class NotificacionController {
  static async create(req: Request, res: Response) {
    try {
      const nueva = await service.save(req.body);
      res.status(201).json(nueva);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear notificación', error });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const lista = await service.findAll();
      res.status(200).json(lista);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener notificaciones', error });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const noti = await service.findById(req.params.id);
      if (!noti) {
        res.status(404).json({ message: 'Notificación no encontrada' });
        return;
      }
      res.status(200).json(noti);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener notificación', error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const actualizado = await service.update(req.params.id, req.body);
      res.status(200).json(actualizado);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar notificación', error });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const eliminado = await service.delete(req.params.id);
      res.status(200).json({ message: 'Notificación eliminada', notificacion: eliminado });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar notificación', error });
    }
  }
}
