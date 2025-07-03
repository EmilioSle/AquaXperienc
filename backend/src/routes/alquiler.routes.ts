// src/routes/alquiler.routes.ts
import { Router } from 'express';
import { AlquilerController } from '../controllers/alquiler.controller';

const router = Router();

router.post('/alquileres', AlquilerController.create);
router.get('/alquileres', AlquilerController.getAll);
router.get('/alquileres/:id', AlquilerController.getById);
router.put('/alquileres/:id', AlquilerController.update);
router.delete('/alquileres/:id', AlquilerController.delete);

export default router;
