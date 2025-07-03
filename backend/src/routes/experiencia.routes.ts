// src/routes/experiencia.routes.ts
import { Router } from 'express';
import { ExperienciaController } from '../controllers/experiencia.controller';

const router = Router();

router.post('/experiencias', ExperienciaController.create);
router.get('/experiencias', ExperienciaController.getAll);
router.get('/experiencias/:id', ExperienciaController.getById);
router.put('/experiencias/:id', ExperienciaController.update);
router.delete('/experiencias/:id', ExperienciaController.delete);

export default router;
