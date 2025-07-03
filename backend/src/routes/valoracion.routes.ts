// src/routes/valoracion.routes.ts
import { Router } from 'express';
import { ValoracionController } from '../controllers/valoracion.controller';

const router = Router();

router.post('/valoraciones', ValoracionController.create);
router.get('/valoraciones', ValoracionController.getAll);
router.get('/valoraciones/:id', ValoracionController.getById);
router.put('/valoraciones/:id', ValoracionController.update);
router.delete('/valoraciones/:id', ValoracionController.delete);

export default router;
