import User from "../entities/User";

export default class UserRepository {

    private users: User[] = []

    constructor(initialUsers: User[]) {
        this.users = initialUsers;
    }

    public findAll(): User[] {
        return this.users;
    }

    public findById(id: number): User | undefined {
        return this.users.find(user => user.id === id);
    }

    public addUser(user: User): void {
        this.users.push(user);
    }

    public updateUser(id: number, newUserData: Partial<User>): User {
        const user = this.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        Object.assign(user, newUserData);
        return user;
    }

    public deleteUser(id: number): User {
        const user = this.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        this.users = this.users.filter(user => user.id !== id);
        return user;
    }

    public getNextId(): number {
        if (this.users.length === 0) return 1;
        return this.users[this.users.length - 1].id + 1;
    }
}