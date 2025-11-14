import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  content: { type: String, required: true },
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  type: { type: String, enum: ['text', 'image', 'video'], default: 'text' },
},
  { 
    timestamps: true // CreatedAt / UpdatedAt
   });

   // Index to optimize queries by chat and creation time
   messageSchema.index({ chat: 1, createdAt: 1 });

export const MessageModel = model('Message', messageSchema);
