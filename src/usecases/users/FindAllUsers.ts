import { UserModel } from "../../models/User";

export class FindAllUsers {

    async execute(): Promise<any> {

        const users = await UserModel.find();
        if (!users || users.length === 0) {
            throw new Error("No users found");
        }
        return users;
    }
}
