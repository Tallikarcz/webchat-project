import { Request, Response } from 'express';
import UserRepository from '../repository/UserRepository';
import MessageRepository from '../repository/MessageRepository';
import User from '../entities/User';
import { CreateUser } from '../usecases/users/CreateUser';
import { FindAllUsers } from '../usecases/users/FindAllUsers';
import { FindUser } from '../usecases/users/FindUser';

const userRepository = new UserRepository([]);
const messageRepository = new MessageRepository([]);

export class UserController {

    // GET: Get all users
    static getAllUsers = (req: Request, res: Response) => {
        try {
            const useCase = new FindAllUsers(userRepository);
            const users = useCase.execute();
            res.json(users);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    // GET: Get user by ID
    static getUserById = (req: Request, res: Response) => {

        try {
            const { id } = req.params;
            const useCase = new FindUser(userRepository);
            const user = useCase.execute(Number(id));
            res.json(user);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    };

    // GET: Get messages by user ID
    static getUserMessages = (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = userRepository.findById(Number(id));

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        }

        catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    // POST: Create a new user
    static createUser = (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;
            const useCase = new CreateUser(userRepository);
            const newUser = useCase.execute(name, email, password);
            res.status(201).json(newUser);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // PUT: Update an existing user
    static updateUser = (req: Request, res: Response) => {

        try {
            const { id } = req.params;
            const { name, email } = req.body;
            if (!name || !email) {
                return res.status(400).json({ error: 'Name and email are required' });
            }

            const user = userRepository.findById(Number(id));
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            user.name = name;
            user.email = email;
            res.json(user);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // DELETE: Delete a user (and their associated messages)
    static deleteUser = (req: Request, res: Response) => {
        try {
            const userId = Number(req.params.id);

            if (isNaN(userId)) {
                return res.status(400).json({ error: 'Invalid user ID' });
            }

            const user = userRepository.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const messages = messageRepository.findMessageByUserId(userId);

            // Delete associated messages
            messages.forEach(message => {
                messageRepository.deleteMessage(message.id);
            });

            // Delete user
            userRepository.deleteUser(user.id);
            res.json({ message: 'User and associated messages deleted' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }

    }
}