import { UserModel } from "../../models/User";

export class FindUser {

    async execute(userId: string): Promise<any> {

        const user = await UserModel.findById({userId});
        if (!user) {
            throw new Error("User not found");
        }
        return user.toObject();
    }
}
