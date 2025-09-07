import UserRepository from "../../repository/UserRepository";
import User from "../../entities/User";

export class FindUser {
    private userRepo: UserRepository;
    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    execute(userId: number): User {
        const user = this.userRepo.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
}