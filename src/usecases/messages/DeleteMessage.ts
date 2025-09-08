import { MessageModel } from "../../models/Message";

export class DeleteMessage {

    async execute(messageId: string, userId: string): Promise<{success: boolean, deletedId: string, message: string}> {

        if (!messageId || !userId) {
            throw new Error("Message ID and User ID are required");
        }

        // Find existing message by ID
        const message = await MessageModel.findById(messageId);
        if (!message) {
            throw new Error("Message not found");
        }

        // Business Rule: only the user who sent the message can delete it
        if (message.senderId.toString() !== userId) {
            throw new Error("You do not have permission to delete this message");
        }

        // Delete message
        await message.deleteOne();
        return { success: true, deletedId: messageId, message: "Message deleted successfully" };
    }
}