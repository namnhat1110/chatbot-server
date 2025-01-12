import { Message } from "@models/Messages";
import { IMessage, Role } from "@utils/types";

export class MessageService {
  async saveMessage(role: Role, content: string): Promise<IMessage> {
    try {
      return await Message.create({ role, content });
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to save message");
    }
  }

  async getHistory(): Promise<IMessage[]> {
    try {
      return await Message.find().sort({ timestamp: 1 });
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch message history");
    }
  }
}
