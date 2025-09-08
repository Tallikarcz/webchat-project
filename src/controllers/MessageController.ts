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
            const { userId, peerId } = req.params;
            if (!userId || !peerId) {
                return res.status(400).json({ error: 'User ID and Peer ID are required' });
            }

            const useCase = new GetChatMessages();
            const messages = await useCase.execute(userId.toString(), peerId.toString());
            res.json(messages);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // POST: Send a new message
    static sendMessage = async (req: Request, res: Response) => {
        try {
            const { content, senderId, receiverId } = req.body;

            if (!senderId || !receiverId) {
                return res.status(400).json({ error: 'Sender ID and Receiver ID are required' });
            }

            const useCase = new SendMessage();
            const newMessage = await useCase.execute(content, senderId, receiverId);

            res.status(201).json(newMessage);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }

    }

    // PUT: Edit an existing message
    static editMessage = (req: Request, res: Response) => {
        try {
            const { msgId } = req.params;
            const { content, userId } = req.body;

            const useCase = new EditMessage();
            const editedMessage = useCase.execute(msgId, content, userId);

            res.json(editedMessage);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // DELETE: Delete a message
    static deleteMessage = async (req: Request, res: Response) => {

        const { msgId } = req.params;
        const { userID } = req.body;
        try {

            const useCase = new DeleteMessage();
            const deletedMessage = await useCase.execute(msgId, userID);
            res.json({ message: 'Message deleted', deletedMessage });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

}
