// src/routes/disponibilidad.routes.ts
import { Router } from 'express';
import { DisponibilidadController } from '../controllers/disponibilidad.controller';

const router = Router();

router.post('/disponibilidad', DisponibilidadController.create);
router.get('/disponibilidad', DisponibilidadController.getAll);
router.get('/disponibilidad/:id', DisponibilidadController.getById);
router.put('/disponibilidad/:id', DisponibilidadController.update);
router.delete('/disponibilidad/:id', DisponibilidadController.delete);

export default router;
