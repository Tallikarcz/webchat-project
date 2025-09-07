import User from "../../entities/User";
import Message from "../../entities/Message";
import MessageRepository from "../../repository/MessageRepository";

export class DeleteMessage {
    private messageRepo: MessageRepository;

    constructor(messageRepo: MessageRepository) {
        this.messageRepo = messageRepo;
    }

    execute(messageId: number, user: User): Message {
        
        // Business Rule: only the user who sent the message can delete it
        const message = this.messageRepo.findMessageById(messageId);
        if (!message) {
            throw new Error("Message not found");
        }

        // Business Rule: only the user who sent the message can delete it
        if (message.user.id !== user.id) {
            throw new Error("You do not have permission to delete this message");
        }

        // Delete message from repository
        return this.messageRepo.deleteMessage(messageId);
    }
}

