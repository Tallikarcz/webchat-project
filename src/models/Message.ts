import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  content: { type: String, required: true },
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  type: { type: String, enum: ['text', 'image', 'video'], default: 'text' },
});

export const MessageModel = model('Message', messageSchema);
