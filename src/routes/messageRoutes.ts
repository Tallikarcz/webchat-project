import { Router } from 'express';
import { MessageController } from '../controllers/MessageController';

const router = Router();

// GET: Obtener mensajes de un chat entre dos usuarios
router.get('/chat/:userId/:peerId', MessageController.getChatMessages);

// GET: Obtener mensaje por ID de mensaje
router.get('/:id', MessageController.getMessageById);

// GET: Obtener todos los mensajes
router.get('/', MessageController.getAllMessages);

// POST: Crear un nuevo mensaje
router.post('/', MessageController.createMessage);

// PUT: Actualizar un mensaje existente
router.put('/:id', MessageController.editMessage);

// DELETE: Eliminar un mensaje
router.delete('/:id', MessageController.deleteMessage);

export default router;