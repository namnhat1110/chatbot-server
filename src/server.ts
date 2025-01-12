import express, { Express } from "express";
import cors from "cors";
import { GeminiService } from "@services/gemini.service";
import { MessageService } from "@services/message.service";
import { ChatController } from "@controllers/chat.controller";
import { config } from "@utils/config";
import { createChatRouter } from "@routes/chat.routes";
import { connectDB } from "@database/connect";
import { CacheService } from "@services/cache.service";
import { apiLimiter } from "@utils/rateLimit";

const app: Express = express();
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(apiLimiter);

connectDB();

const cacheService = new CacheService();
const geminiService = new GeminiService(config.geminiApiKey, cacheService);
const messageService = new MessageService();
const chatController = new ChatController(geminiService, messageService);

app.use("/api", createChatRouter(chatController));

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ response: "Something broke!" });
  }
);

app.listen(config.port, () => {
  console.log(`[server]: Server is running at http://localhost:${config.port}`);
});
