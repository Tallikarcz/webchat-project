import UserRepository from "../../repository/UserRepository";
import User from "../../entities/User";

export class CreateUser {
    private userRepo: UserRepository;
    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    execute(name: string, email: string, password: string): User {

        if (!name) {
            throw new Error("name is required");
        }

        if (!email) {
            throw new Error("email is required");
        }

        if (!password) {
            throw new Error("password is required");
        }
        // Business Rule: email must be unique
        const existingUser = this.userRepo.findAll().find(user => user.email === email);
        if (existingUser) {
            throw new Error("email is already in use");
        }
        // Create new user with auto generated ID
        const newUser = new User(this.userRepo.getNextId(), name, email, password);
        this.userRepo.addUser(newUser);
        return newUser;
    }
}
