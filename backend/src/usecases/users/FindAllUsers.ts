import { UserModel } from "../../models/User";
import { sanitizeUser } from "../../utils/sanitizeUser";

export class FindAllUsers {

    async execute(): Promise<any> {

        const users = await UserModel.find();
        if (!users || users.length === 0) {
            throw new Error("No users found");
        }
        return users.map(u => sanitizeUser(u));
    }
}
