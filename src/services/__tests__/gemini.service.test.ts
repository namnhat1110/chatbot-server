import { GeminiService } from "@services/gemini.service";
import { CacheService } from "@services/cache.service";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

jest.mock("@google/generative-ai");

describe("GeminiService", () => {
  let geminiService: GeminiService;
  let cacheService: CacheService;
  let mockModel: GenerativeModel;

  beforeEach(() => {
    cacheService = new CacheService();
    mockModel = {
      generateContent: jest.fn(),
    } as unknown as GenerativeModel;
    (GoogleGenerativeAI as jest.Mock).mockImplementation(() => ({
      getGenerativeModel: () => mockModel,
    }));
    geminiService = new GeminiService("fake-api-key", cacheService);
  });

  it("should generate a response and cache it", async () => {
    const prompt = "Prompt";
    const responseText = "Response";
    (mockModel.generateContent as jest.Mock).mockResolvedValue({
      response: {
        text: () => responseText,
      },
    });

    const response = await geminiService.generateResponse(prompt);

    expect(response).toBe(responseText);
    expect(
      cacheService.get<string>(`ai_response_${prompt.toLowerCase().trim()}`)
    ).toBe(responseText);
  });

  it("should return cached response if available", async () => {
    const prompt = "Prompt";
    const cachedResponse = "Cached response";
    cacheService.set(
      `ai_response_${prompt.toLowerCase().trim()}`,
      cachedResponse
    );

    const response = await geminiService.generateResponse(prompt);

    expect(response).toBe(cachedResponse);
    expect(mockModel.generateContent).not.toHaveBeenCalled();
  });

  it("should throw an error if AI response generation fails", async () => {
    const prompt = "Hello";
    (mockModel.generateContent as jest.Mock).mockRejectedValue(
      new Error("AI Error")
    );

    await expect(geminiService.generateResponse(prompt)).rejects.toThrow(
      "Failed to generate AI response"
    );
  });
});
