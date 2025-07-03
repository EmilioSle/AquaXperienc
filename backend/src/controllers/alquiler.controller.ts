// src/controllers/alquilerController.ts
import { Request, Response } from 'express';
import { AlquilerService } from '../services/alquiler.Service';

const alquilerService = new AlquilerService();

export class AlquilerController {
  static async create(req: Request, res: Response) {
    try {
      const nuevo = await alquilerService.save(req.body);
      res.status(201).json(nuevo);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear alquiler', error });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const lista = await alquilerService.findAll();
      res.status(200).json(lista);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener alquileres', error });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const alquiler = await alquilerService.findById(req.params.id);
      if (!alquiler) {
        res.status(404).json({ message: 'Alquiler no encontrado' });
        return;
      }
      res.status(200).json(alquiler);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener alquiler', error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const actualizado = await alquilerService.update(req.params.id, req.body);
      res.status(200).json(actualizado);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar alquiler', error });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const eliminado = await alquilerService.delete(req.params.id);
      res.status(200).json({ message: 'Alquiler eliminado', alquiler: eliminado });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar alquiler', error });
    }
  }
}
