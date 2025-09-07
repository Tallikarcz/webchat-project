import UserRepository from "../../repository/UserRepository";
import User from "../../entities/User";

export class FindAllUsers {
    private userRepo: UserRepository;
    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    execute(): User[] {

        const users = this.userRepo.findAll();
        if (users.length === 0) {
            throw new Error("No users found");
        }
        return users;
    }
}