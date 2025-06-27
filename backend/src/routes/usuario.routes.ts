
import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controller';

const router = Router();

// Rutas para la gestión de usuarios
router.post('/users', UsuarioController.createUser);       
router.get('/users', UsuarioController.getAllUsers);       
router.get('/users/:id', UsuarioController.getUserById);   
router.put('/users/:id', UsuarioController.updateUser);    
router.delete('/users/:id', UsuarioController.deleteUser); 

export default router;
