import { Router } from 'express';
import MessageController from '../controllers/MessageController';
import { authenticate } from '../middlewares/auth';

const router = Router();

// Chat-scoped message operations
router.get('/chats/:chatId/messages', authenticate, MessageController.getChatMessages);
router.post('/chats/:chatId/messages', authenticate, MessageController.sendMessage);

// Message-level operations
router.put('/messages/:id', authenticate, MessageController.editMessage);
router.delete('/messages/:id', authenticate, MessageController.deleteMessage);

export default router;