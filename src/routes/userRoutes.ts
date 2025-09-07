import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

// GET: Obtener todos los usuarios
router.get('/', UserController.getAllUsers);

// GET: Obtener usuario por ID
router.get('/:id', UserController.getUserById);

// GET: Obtener mensajes por ID de usuario
router.get('/:id/messages', UserController.getUserMessages);

// POST: Crear un nuevo usuario
router.post('/', UserController.createUser);

// PUT: Actualizar un usuario existente
router.put('/:id', UserController.updateUser);

// DELETE: Eliminar un usuario
router.delete('/:id', UserController.deleteUser);

export default router;