import Message from "../entities/Message";

export default class MessageRepository {

    private messages: Message[] = []

    constructor(initialMessages: Message[]) {
        this.messages = initialMessages;
    }

    public findAll(): Message[] {
        return this.messages;
    }

    public findMessagesByChat(userId: number, peerId: number): Message[] {
        return this.messages.filter(message =>
            (message.senderId === userId && message.recieverId === peerId) ||
            (message.senderId === peerId && message.recieverId === userId)
        );
    }

    public findMessageById(id: number): Message | undefined {
        return this.messages.find(message => message.id === id);
    }

    public findMessageByUserId(userId: number): Message[] {
        return this.messages.filter(message => message.user.id === userId);
    }

    public addMessage(message: Message): void {
        this.messages.push(message);
    }

    public editMessage(id: number, newMessageContent: string): Message {
        const message = this.findMessageById(id)
        if (!message) {
            throw new Error("Message not found");
        }
        message.content = newMessageContent
        return message;
    }

    public deleteMessage(id: number): Message {

        const message = this.findMessageById(id)
        if (!message) {
            throw new Error("Message not found");
        }
        this.messages = this.messages.filter(msg => msg.id !== id);
        return message;
    }


    public getNextId(): number {
        if (this.messages.length === 0) return 1;
        return this.messages[this.messages.length - 1].id + 1;
    }
}