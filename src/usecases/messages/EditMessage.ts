import Message from "../../entities/Message"; 
import User from "../../entities/User";
import MessageRepository from "../../repository/MessageRepository";

export class EditMessage {
    private messageRepo: MessageRepository;

    constructor(messageRepo: MessageRepository) {
        this.messageRepo = messageRepo;
    }

    execute(id: number, newContent: string, user: User): Message {
        // Business Rule: no empty messages
        if (!newContent || newContent.trim() === "") {
            throw new Error("El mensaje no puede estar vacío");
        }

        // Find existing message by ID
        const message = this.messageRepo.findMessageById(id);
        if (!message) {
            throw new Error("Mensaje no encontrado");
        }

        // Business Rule: only the user who sent the message can edit it
        if (message.user.id !== user.id) {
            throw new Error("No tienes permiso para editar este mensaje");
        }

        message.content = newContent;
        return message;
    }
}
