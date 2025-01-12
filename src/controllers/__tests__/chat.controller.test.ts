import { Request, Response } from "express";
import { ChatController } from "@controllers/chat.controller";
import { GeminiService } from "@services/gemini.service";
import { MessageService } from "@services/message.service";
import { Role } from "@utils/types";
import { CacheService } from "@services/cache.service";

jest.mock("@services/gemini.service");
jest.mock("@services/message.service");

describe("ChatController", () => {
  let chatController: ChatController;
  let cacheService: CacheService;
  let geminiService: GeminiService;
  let messageService: MessageService;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    cacheService = new CacheService();
    geminiService = new GeminiService("fake-api-key", cacheService);
    messageService = new MessageService();
    chatController = new ChatController(geminiService, messageService);

    req = { body: { message: "Prompt" } };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("should handle chat", async () => {
    (geminiService.generateResponse as jest.Mock).mockResolvedValue("Response");
    (messageService.saveMessage as jest.Mock).mockResolvedValue({});

    await chatController.handleChat(req as Request, res as Response);

    expect(messageService.saveMessage).toHaveBeenCalledWith(
      Role.USER,
      "Prompt"
    );
    expect(geminiService.generateResponse).toHaveBeenCalledWith("Prompt");
    expect(messageService.saveMessage).toHaveBeenCalledWith(
      Role.ASSISTANT,
      "Response"
    );
    expect(res.json).toHaveBeenCalledWith({ response: "Response" });
  });

  it("should get history", async () => {
    const messages = [{ role: Role.USER, content: "Prompt" }];
    (messageService.getHistory as jest.Mock).mockResolvedValue(messages);

    await chatController.getHistory(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith(messages);
  });
});
