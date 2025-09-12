import { MessageModel } from "../../models/Message";

    interface IMessage {
        id: string;
        content: string;
        senderId: string;
        receiverId: string;
        timestamp: Date;
        type: string;
    }

export class GetChatMessages {

    async execute(userId: string, peerId: string): Promise<IMessage[]> {
        const messages = await MessageModel.find({
            $or: [
                { senderId: userId, receiverId: peerId },
                { senderId: peerId, receiverId: userId }
            ]
        }).sort({ timestamp: 1 }).exec();

        return messages.map(msg => ({
            id: msg._id.toString(),
            content: msg.content,
            senderId: msg.senderId.toString(),
            receiverId: msg.receiverId.toString(),
            timestamp: msg.timestamp,
            type: msg.type
        }));
    }
}

