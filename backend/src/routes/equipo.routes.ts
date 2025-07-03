// src/routes/equipo.routes.ts
import { Router } from 'express';
import { EquipoController } from '../controllers/equipo.controller';

const router = Router();

router.post('/equipos', EquipoController.create);
router.get('/equipos', EquipoController.getAll);
router.get('/equipos/:id', EquipoController.getById);
router.put('/equipos/:id', EquipoController.update);
router.delete('/equipos/:id', EquipoController.delete);

export default router;
