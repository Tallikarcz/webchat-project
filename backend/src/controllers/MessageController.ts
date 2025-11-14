import { Request, Response } from 'express';
import { SendMessage } from '../usecases/messages/SendMessage';
import { GetChatMessages } from '../usecases/messages/GetChatMessages';
import { EditMessage } from '../usecases/messages/EditMessage';
import { DeleteMessage } from '../usecases/messages/DeleteMessage';

export class MessageController {

    // // GET: Get message by ID
    // static getMessageById = (req: Request, res: Response) => {
    //     try {
    //         const { id } = req.params;
    //         const message = messageRepository.findMessageById(Number(id));
    //         if (!message) {
    //             return res.status(404).json({ error: 'Message not found' });
    //         }
    //         res.json(message);
    //     } catch (error: any) {
    //         res.status(400).json({ error: error.message });
    //     }


    // // GET: Get all messages
    // static getAllMessages = (req: Request, res: Response) => {
    //     try {
    //         const messages = messageRepository.findAll();
    //         res.json(messages);
    //     } catch (error: any) {
    //         res.status(400).json({ error: error.message });
    //     }
    // }

    // GET: Get messages by chat (userId and peerId)
    static getChatMessages = async (req: Request, res: Response) => {
        try {
            const { chatId } = req.params;
            if (!chatId) {
                return res.status(400).json({ error: 'Chat ID is required' });
            }

            const useCase = new GetChatMessages();
            const messages = await useCase.execute(chatId.toString());
            res.json(messages);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // POST: Send a new message
    static sendMessage = async (req: Request, res: Response) => {
        try {
            const { content } = req.body;
            const { chatId } = req.params;

            const senderId = (req as any).user?.id || (req as any).user?._id;

            if (!chatId) {
                return res.status(400).json({ error: 'Chat ID is required' });
            }

            if (!content) {
                return res.status(400).json({ error: 'Message content is required' });
            }

            if (!senderId) {
                return res.status(401).json({ error: 'Unauthorized: Sender ID is missing' });
            }



            const useCase = new SendMessage();
            const newMessage = await useCase.execute(content, chatId, senderId);

            res.status(201).json(newMessage);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }

    }

    // PUT: Edit an existing message 
    static editMessage = (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const userId = (req as any).user?.id || (req as any).user?._id;

            if (!content) {
                return res.status(400).json({ error: 'Message content is required' });
            }

            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized: User ID is missing' });
            }

            const useCase = new EditMessage();
            const editedMessage = useCase.execute(id, content, userId);

            res.json(editedMessage);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // DELETE: Delete a message
    static deleteMessage = async (req: Request, res: Response) => {

        const { id } = req.params;
        const userId = (req as any).user?.id || (req as any).user?._id;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: User ID is missing' });
        }

        if (!id) {
            return res.status(400).json({ error: 'Message ID is required' });
        }

        try {

            const useCase = new DeleteMessage();
            const deletedMessage = await useCase.execute(id, userId);
            res.json({ message: 'Message deleted', deletedMessage });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

}
