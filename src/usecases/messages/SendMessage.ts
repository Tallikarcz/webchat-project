import Message from "../../entities/Message";
import User from "../../entities/User";
import MessageRepository from "../../repository/MessageRepository";

export class SendMessage {
    private messageRepo: MessageRepository;

    constructor(messageRepo: MessageRepository) {
        this.messageRepo = messageRepo;
    }

    execute(content: string, sender: User, receiver: User): Message {
        // Business Rule: no empty messages
        if (!content || content.trim() === "") {
            throw new Error("El mensaje no puede estar vacío");
        }

        // Create new message with auto generated ID
        const message = new Message(this.messageRepo.getNextId(), content, sender, sender.id, receiver.id, new Date());

        // Save to repository
        this.messageRepo.addMessage(message);

        return message;
    }
}
