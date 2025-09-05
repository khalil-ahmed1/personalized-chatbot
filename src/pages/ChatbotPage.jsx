import { useState } from "react";
import ChatWindow from "../components/ChatWindow";
import api from "../services/api";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your academic guide. Ask me about syllabus, notes, or PYQs.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    const userMsg = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);
    try {
      const res = await api.chat.send({
        message: text,
        history: messages.slice(-10),
      });
      setMessages((m) => [...m, { role: "assistant", content: res.reply }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-semibold mb-4">Chat</h1>
      <ChatWindow messages={messages} onSend={sendMessage} loading={loading} />
    </div>
  );
}
