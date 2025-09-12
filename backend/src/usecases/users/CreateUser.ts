import { UserModel } from "../../models/User"; 

export class CreateUser {

    async execute(username: string, email: string, password: string): Promise<any> {

        if (!username) {
            throw new Error("username is required");
        }

        if (!email) {
            throw new Error("email is required");
        }

        if (!password) {
            throw new Error("password is required");
        }
        
        // Business Rule: email must be unique
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new Error("email is already in use");
        }

        // Create new user
        const newUser = await UserModel.create({
            username,
            email,
            password,
        });
        return newUser;
    }
}
