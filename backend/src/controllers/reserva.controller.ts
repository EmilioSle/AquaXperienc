// src/controllers/reservaController.ts
import { Request, Response } from 'express';
import { ReservaService } from '../services/reserva.Service';

const reservaService = new ReservaService();

export class ReservaController {
  static async create(req: Request, res: Response) {
    try {
      const nueva = await reservaService.save(req.body);
      res.status(201).json(nueva);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear reserva', error });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const lista = await reservaService.findAll();
      res.status(200).json(lista);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener reservas', error });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const reserva = await reservaService.findById(req.params.id);
      if (!reserva) {
        res.status(404).json({ message: 'Reserva no encontrada' });
        return;
      }
      res.status(200).json(reserva);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener reserva', error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const actualizada = await reservaService.update(req.params.id, req.body);
      res.status(200).json(actualizada);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar reserva', error });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const eliminada = await reservaService.delete(req.params.id);
      res.status(200).json({ message: 'Reserva eliminada', reserva: eliminada });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar reserva', error });
    }
  }
}
