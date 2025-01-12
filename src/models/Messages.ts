import { IMessage, Role } from "@utils/types";
import { Schema, model } from "mongoose";

const MessageSchema = new Schema<IMessage>({
  role: { type: String, required: true, enum: Role },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Message = model<IMessage>("Message", MessageSchema);
