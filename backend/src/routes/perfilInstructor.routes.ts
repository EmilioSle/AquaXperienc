// src/routes/perfilInstructor.routes.ts
import { Router } from 'express';
import { PerfilInstructorController } from '../controllers/perfilInstructor.controller';

const router = Router();

router.post('/perfiles-instructores', PerfilInstructorController.create);
router.get('/perfiles-instructores', PerfilInstructorController.getAll);
router.get('/perfiles-instructores/:id', PerfilInstructorController.getById);
router.put('/perfiles-instructores/:id', PerfilInstructorController.update);
router.delete('/perfiles-instructores/:id', PerfilInstructorController.delete);

export default router;
