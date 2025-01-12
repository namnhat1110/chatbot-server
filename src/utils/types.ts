export enum Role {
  USER = "user",
  ASSISTANT = "assistant",
}

export interface IMessage extends Document {
  role: Role;
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  response: string;
}
