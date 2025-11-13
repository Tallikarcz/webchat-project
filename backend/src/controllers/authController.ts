import { Request, Response } from 'express';
import { LoginUser } from '../usecases/auth/LoginUser';
import { SignupUser } from '../usecases/auth/SignupUser';
import { FindUser } from '../usecases/users/FindUser';

export class AuthController {

    // POST: Login user
    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const useCase = new LoginUser();
            const result = await useCase.execute(email, password);

            res.cookie('jwt', result.token, { httpOnly: true, maxAge: 3600000 });
            res.json({ message: 'Login successful', ...result });
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    }

    // POST: Create user
    static signup = async (req: Request, res: Response) => {
        try {
            const { username, email, password } = req.body;
            const useCase = new SignupUser();
            const result = await useCase.execute(username, email, password);

            res.cookie('jwt', result.token, { httpOnly: true, maxAge: 3600000 });
            res.json({ message: 'Signup successful', ...result });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // GET: Get current user
    static me = async (req: Request, res: Response) => {
        try {
            const userId = (req as any).userId;
            if (!userId) {
                return res.status(401).json({ error: 'Not authenticated' });
            }

            const useCase = new FindUser();
            const user = await useCase.execute(userId);
            res.json( user );
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    }

    // POST: Logout user (clear cookie)
    static logout = async (req: Request, res: Response) => {
        try {
            // Clear the jwt cookie.
            res.clearCookie('jwt');
            return res.json({ message: 'Logged out' });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}