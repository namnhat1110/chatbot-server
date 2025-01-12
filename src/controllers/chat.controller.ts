import { Request, Response } from "express";
import { ChatRequest, ChatResponse, Role } from "@utils/types";
import { GeminiService } from "@services/gemini.service";
import { MessageService } from "@services/message.service";

export class ChatController {
  constructor(
    private geminiService: GeminiService,
    private messageService: MessageService
  ) {}

  handleChat = async (
    req: Request<{}, {}, ChatRequest>,
    res: Response<ChatResponse>
  ) => {
    try {
      const userMessage = req.body.message;

      await this.messageService.saveMessage(Role.USER, userMessage);

      const response = await this.geminiService.generateResponse(userMessage);

      await this.messageService.saveMessage(Role.ASSISTANT, response);

      res.json({ response });
    } catch (error) {
      console.error("Chat Error:", error);
      res.status(500).json({ response: "An error occurred" });
    }
  };

  getHistory = async (_req: Request, res: Response) => {
    try {
      const messages = await this.messageService.getHistory();
      res.json(messages);
    } catch (error) {
      console.error("History Error:", error);
      res.status(500).json({ response: "An error occurred" });
    }
  };
}
