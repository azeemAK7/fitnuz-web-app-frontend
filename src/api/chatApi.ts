import api from "./api";
import { ChatMessage, ChatResponse } from "../types/chatTypes";

export const sendChatMessage = async (
  message: string,
  history: ChatMessage[]
): Promise<string> => {
  const response = await api.post<ChatResponse>("/public/chat", {
    message,
    history,
  });
  return response.data.reply;
};
