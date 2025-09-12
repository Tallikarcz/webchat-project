import { Router } from 'express';
import { MessageController } from '../controllers/MessageController';
import { authenticate } from '../middlewares/auth';

const router = Router();

// GET: Obtener mensajes de un chat entre dos usuarios
router.get('/chat/:userId/:peerId', authenticate, MessageController.getChatMessages);

// // GET: Obtener mensaje por ID de mensaje
// router.get('/:id', MessageController.getMessageById);

// GET: Obtener todos los mensajes
router.get('/', authenticate, MessageController.getChatMessages);

// POST: Enviar un nuevo mensaje
router.post('/', authenticate, MessageController.sendMessage);

// PUT: Actualizar un mensaje existente
router.put('/:id', authenticate, MessageController.editMessage);

// DELETE: Eliminar un mensaje
router.delete('/:id', authenticate, MessageController.deleteMessage);

export default router;