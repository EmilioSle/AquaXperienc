// src/routes/notificacion.routes.ts
import { Router } from 'express';
import { NotificacionController } from '../controllers/notificacion.controller';

const router = Router();

router.post('/notificaciones', NotificacionController.create);
router.get('/notificaciones', NotificacionController.getAll);
router.get('/notificaciones/:id', NotificacionController.getById);
router.put('/notificaciones/:id', NotificacionController.update);
router.delete('/notificaciones/:id', NotificacionController.delete);

export default router;
