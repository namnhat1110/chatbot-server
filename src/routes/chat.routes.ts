import { Router } from "express";
import { ChatController } from "@controllers/chat.controller";

export const createChatRouter = (chatController: ChatController): Router => {
  const router = Router();

  router.post("/chat", chatController.handleChat);
  router.get("/history", chatController.getHistory);

  return router;
};
