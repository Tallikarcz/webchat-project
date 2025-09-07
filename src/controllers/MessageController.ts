import { Request, Response } from 'express';
import MessageRepository from '../repository/MessageRepository';
import UserRepository from '../repository/UserRepository';
import { SendMessage } from '../usecases/messages/SendMessage';
import { EditMessage } from '../usecases/messages/EditMessage';
import { GetChatMessages } from '../usecases/messages/GetChatMessages';

const messageRepository = new MessageRepository([]);
const userRepository = new UserRepository([]);

export class MessageController {

    // GET: Get message by ID
    static getMessageById = (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const message = messageRepository.findMessageById(Number(id));
            if (!message) {
                return res.status(404).json({ error: 'Message not found' });
            }
            res.json(message);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }

    }

    // GET: Get all messages
    static getAllMessages = (req: Request, res: Response) => {
        try {
            const messages = messageRepository.findAll();
            res.json(messages);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // GET: Get messages by chat (userId and peerId)
    static getChatMessages = (req: Request, res: Response) => {
        try {
            const { userId, peerId } = req.params;
            if (!userId || !peerId) {
                return res.status(400).json({ error: 'User ID and Peer ID are required' });
            }

            const useCase = new GetChatMessages(messageRepository);
            const messages = useCase.execute(Number(userId), Number(peerId));
            res.json(messages);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // POST: Create a new message
    static createMessage = (req: Request, res: Response) => {
        try {
            const { content, senderId, recieverId } = req.body;

            console.log("All users:", userRepository.findAll());
            console.log("Looking for senderId:", Number(senderId), "receiverId:", Number(recieverId));


            if (!senderId || !recieverId) {
                return res.status(400).json({ error: 'Sender ID and Receiver ID are required' });
            }

            const sender = userRepository.findById(Number(senderId));
            const receiver = userRepository.findById(Number(recieverId));
            console.log("Sender:", sender);
            console.log("Receiver:", receiver);
            if (!sender || !receiver) {
                return res.status(400).json({ error: 'User not found' });
            }

            if (!content || content.trim() === "") {
                return res.status(400).json({ error: 'Message content cannot be empty' });
            }
            
            const useCase = new SendMessage(messageRepository);
            const newMessage = useCase.execute(content, sender, receiver);

            res.status(201).json(newMessage);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }

    }

    // PUT: Edit an existing message
    static editMessage = (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { content, userId } = req.body;

            if (!id) {
                return res.status(400).json({ error: 'Message ID is required' });
            }

            const user = userRepository.findById(Number(userId));
            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }

            const useCase = new EditMessage(messageRepository);
            const editedMessage = useCase.execute(Number(id), content, user);

            res.json(editedMessage);
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    }

    // DELETE: Delete a message
    static deleteMessage = (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const deletedMessage = messageRepository.deleteMessage(Number(id));
            res.json({ message: 'Message deleted', deletedMessage });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

}
