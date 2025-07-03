// src/controllers/equipoController.ts
import { Request, Response } from 'express';
import { EquipoService } from '../services/equipo.Service';

const equipoService = new EquipoService();

export class EquipoController {
  static async create(req: Request, res: Response) {
    try {
      const nuevo = await equipoService.save(req.body);
      res.status(201).json(nuevo);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear equipo', error });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const lista = await equipoService.findAll();
      res.status(200).json(lista);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener equipos', error });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const equipo = await equipoService.findById(req.params.id);
      if (!equipo) {
        res.status(404).json({ message: 'Equipo no encontrado' });
        return;
      }
      res.status(200).json(equipo);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener equipo', error });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const actualizado = await equipoService.update(req.params.id, req.body);
      res.status(200).json(actualizado);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar equipo', error });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const eliminado = await equipoService.delete(req.params.id);
      res.status(200).json({ message: 'Equipo eliminado', equipo: eliminado });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar equipo', error });
    }
  }
}
