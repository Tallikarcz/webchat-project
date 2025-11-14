import { MessageModel } from "../../models/Message";

interface IMessage {
    id: string;
    content: string;
    senderId?: string;
    receiverId?: string;
    timestamp?: Date;
    type?: string;
}

export class GetChatMessages {
    async execute(chatId: string): Promise<IMessage[]> {
        const messages = await MessageModel.find({ chat: chatId })
            .sort({ createdAt: 1 })
            .lean()
            .exec();

        return messages.map((msg: any) => ({
            id: msg._id?.toString?.() ?? "",
            content: msg.content ?? msg.text ?? "",
            senderId: (msg.senderId ?? msg.sender)?.toString?.(),
            receiverId: (msg.receiverId ?? msg.receiver)?.toString?.(),
            timestamp: msg.createdAt ?? msg.timestamp,
            type: msg.type,
        }));
    }
}

