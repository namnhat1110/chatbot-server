import { MessageService } from "@services/message.service";
import { Message } from "@models/Messages";
import { Role } from "@utils/types";

jest.mock("@models/Messages");

describe("MessageService", () => {
  let messageService: MessageService;

  beforeEach(() => {
    messageService = new MessageService();
  });

  it("should save a message", async () => {
    const message = { role: Role.USER, content: "Hello" };
    (Message.create as jest.Mock).mockResolvedValue(message);

    const result = await messageService.saveMessage(Role.USER, "Hello");
    expect(result).toEqual(message);
  });

  it("should get message history", async () => {
    const messages = [{ role: Role.USER, content: "Hello" }];
    (Message.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockResolvedValue(messages),
    });

    const result = await messageService.getHistory();
    expect(result).toEqual(messages);
  });
});
