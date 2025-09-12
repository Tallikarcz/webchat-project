import { Request, Response } from 'express';
import { CreateUser } from '../usecases/users/CreateUser';
import { FindAllUsers } from '../usecases/users/FindAllUsers';
import { FindUser } from '../usecases/users/FindUser';
import bcrypt from 'bcrypt'
import { DeleteUser } from '../usecases/users/DeleteUser';


export class UserController {

    // GET: Get all users
    static getAllUsers = async (req: Request, res: Response) => {
        try {
            const useCase = new FindAllUsers();
            const users = await useCase.execute();
            res.json(users);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    // GET: Get user by ID
    static getUserById = async (req: Request, res: Response) => {

        try {
            const { id } = req.params;
            const useCase = new FindUser();
            const user = await useCase.execute(id);
            res.json(user);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    };

    // POST: Create a new user
    static createUser = async (req: Request, res: Response) => {
        try {
            const { username, email, password } = req.body;
            const useCase = new CreateUser();

            // Hash the password before storing
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await useCase.execute(username, email, hashedPassword);
            res.status(201).json(newUser);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // // PUT: Update an existing user
    // static updateUser = (req: Request, res: Response) => {

    //     try {
    //         const { id } = req.params;
    //         const { name, email } = req.body;
    //         if (!name || !email) {
    //             return res.status(400).json({ error: 'Name and email are required' });
    //         }

    //         const user = userRepository.findById(Number(id));
    //         if (!user) {
    //             return res.status(404).json({ error: 'User not found' });
    //         }

    //         user.name = name;
    //         user.email = email;
    //         res.json(user);
    //     } catch (error: any) {
    //         res.status(400).json({ error: error.message });
    //     }
    // }

    // DELETE: Delete a user (and their associated messages)
    static deleteUser = async (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            if (!userId) {
                return res.status(400).json({ error: 'User ID is required' });
            }

            const useCase = new DeleteUser();
            const result = await useCase.execute(userId);

            res.json(result);

        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}