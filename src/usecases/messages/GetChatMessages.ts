import User from "../../entities/User";
import Message from "../../entities/Message";
import MessageRepository from "../../repository/MessageRepository";

export class GetChatMessages {
    private messageRepo: MessageRepository;

    constructor(messageRepo: MessageRepository) {
        this.messageRepo = messageRepo;
    }
    execute(userId: number, peerId: number): Message[] {
        return this.messageRepo.findMessagesByChat(userId, peerId)
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    }
}

