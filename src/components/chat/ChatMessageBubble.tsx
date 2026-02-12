import { ChatMessage } from "../../types/chatTypes";

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

const ChatMessageBubble = ({ message }: ChatMessageBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-gradient-to-r from-purple-600 to-red-500 text-white rounded-br-sm"
            : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessageBubble;
