import  User  from "./User"

export default class Message {
    constructor(
        public id: number,
        public content: string,
        public user: User,
        public senderId: number,
        public recieverId: number,
        public timestamp: Date = new Date()
    ) {}
}