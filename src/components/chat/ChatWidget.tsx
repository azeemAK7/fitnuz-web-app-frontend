import { useState, useRef, useEffect } from "react";
import { IoChatbubbleEllipsesSharp, IoClose, IoSend } from "react-icons/io5";
import type { ChatMessage } from "../../types/chatTypes";
import { sendChatMessage } from "../../api/chatApi";
import ChatMessageBubble from "./ChatMessageBubble";

const WELCOME_MESSAGE: ChatMessage = {
  role: "model",
  content:
    "Hi there! I'm your FitNuz shopping assistant. I can help you find products, compare prices, and answer questions about our catalog. What are you looking for today?",
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Send history without the welcome message
      const history = updatedMessages
        .filter((_, i) => i !== 0)
        .slice(0, -1); // exclude the message we just sent (it goes as `message`)

      const reply = await sendChatMessage(trimmed, history);
      setMessages((prev) => [...prev, { role: "model", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Floating button
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-red-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center max-sm:bottom-4 max-sm:right-4 max-sm:w-12 max-sm:h-12 cursor-pointer"
        aria-label="Open chat"
      >
        <IoChatbubbleEllipsesSharp className="text-2xl max-sm:text-xl" />
      </button>
    );
  }

  // Chat panel
  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[520px] bg-gray-50 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 max-sm:bottom-0 max-sm:right-0 max-sm:w-full max-sm:h-full max-sm:rounded-none">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-red-500 text-white px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <IoChatbubbleEllipsesSharp className="text-lg" />
          <span className="font-semibold text-sm">FitNuz Assistant</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close chat"
        >
          <IoClose className="text-lg" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <ChatMessageBubble key={i} message={msg} />
        ))}

        {isLoading && (
          <div className="flex justify-start mb-3">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex gap-1.5 items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200 bg-white shrink-0">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about our products..."
            className="flex-1 px-4 py-2.5 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-gray-50"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-red-500 text-white flex items-center justify-center hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0 cursor-pointer"
            aria-label="Send message"
          >
            <IoSend className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
