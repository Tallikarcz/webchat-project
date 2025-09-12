import { MessageModel } from "../../models/Message";
import { UserModel } from "../../models/User"; 

export class DeleteUser {

    async execute(userId: string): Promise<{success: true, message: string}> {

        if (!userId) {
            throw new Error("userId is required");
        }

        // Find user by ID
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        // Delete user
        await user.deleteOne();

        // Business Rule: All messages associated with the user should also be deleted
        await MessageModel.deleteMany({ $or: [ { senderId: user._id }, { receiverId: user._id } ] });
        
        return { success: true, message: "User and associated messages deleted successfully" };
    }
}