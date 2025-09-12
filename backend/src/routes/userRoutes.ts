import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authenticate } from '../middlewares/auth';

const router = Router();

// GET: Obtener todos los usuarios
router.get('/', authenticate, UserController.getAllUsers);

// GET: Obtener usuario por ID
router.get('/:id', authenticate, UserController.getUserById);

// POST: Crear un nuevo usuario
router.post('/', UserController.createUser);

// // PUT: Actualizar un usuario existente
// router.put('/:id', UserController.updateUser);

// DELETE: Eliminar un usuario
router.delete('/:id', authenticate, UserController.deleteUser);

export default router;