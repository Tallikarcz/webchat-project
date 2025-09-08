import { MessageModel } from "../../models/Message";
import { UserModel } from "../../models/User";

export class SendMessage {

    async execute(content: string, senderId: string, receiverId: string) {
        // Business Rule: no empty messages
        if (!content || content.trim() === "") {
            throw new Error("Message can't be empty");
        }

        const sender = await UserModel.findById(senderId);
        const receiver = await UserModel.findById(receiverId);

        if (!sender || !receiver) {
            throw new Error("Sender or receiver not found");
        }

        // Create new message
        const message = await MessageModel.create({
            content,
            senderId,
            receiverId,
        });

        return message;
    }
}
