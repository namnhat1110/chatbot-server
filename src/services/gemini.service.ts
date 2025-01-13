import {
  GenerativeModel,
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { CacheService } from "@services/cache.service";

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor(private apiKey: string, private cacheService: CacheService) {
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-pro",
      safetySettings: [
        {
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
      ],
    });
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const cacheKey = this.generateCacheKey(prompt);
      const cachedResponse = this.cacheService.get<string>(cacheKey);

      if (cachedResponse) {
        return cachedResponse;
      }

      const result = await this.model.generateContent(prompt);
      const response = result.response.text();

      this.cacheService.set(cacheKey, response);
      return response;
    } catch (error) {
      console.error("Gemini AI Error:", error);
      throw new Error("Failed to generate AI response");
    }
  }

  private generateCacheKey(prompt: string): string {
    return `ai_response_${prompt.toLowerCase().trim()}`;
  }
}
