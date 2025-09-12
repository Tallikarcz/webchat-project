import { UserModel } from "../../models/User";
import { MessageModel } from "../../models/Message";

export class EditMessage {

    async execute(msgId: string, newContent: string, userId: string): Promise<any> {
        // Business Rule: no empty messages
        if (!newContent || newContent.trim() === "") {
            throw new Error("Message content cannot be empty");
        }

        // Find existing message by ID
        const message = await MessageModel.findById(msgId);
        if (!message) {
            throw new Error("Message not found");
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        // Business Rule: only the user who sent the message can edit it
        if (message.senderId.toString() !== userId) {
            throw new Error("You do not have permission to edit this message");
        }

        message.content = newContent;

        // Save updated message
        await message.save();

        return message.toObject();
    }
}
