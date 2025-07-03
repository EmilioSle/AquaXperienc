// src/routes/reserva.routes.ts
import { Router } from 'express';
import { ReservaController } from '../controllers/reserva.controller';

const router = Router();

router.post('/reservas', ReservaController.create);
router.get('/reservas', ReservaController.getAll);
router.get('/reservas/:id', ReservaController.getById);
router.put('/reservas/:id', ReservaController.update);
router.delete('/reservas/:id', ReservaController.delete);

export default router;
