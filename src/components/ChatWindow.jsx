import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble.jsx";

export default function ChatWindow({ messages, onSend, loading }) {
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const submit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    onSend(text);
    setInput("");
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col h-[70vh]">
      <div className="flex-1 overflow-y-auto pr-1">
        {messages.map((m, idx) => (
          <MessageBubble key={idx} role={m.role} content={m.content} />
         
        ))}
        {loading && <MessageBubble role="assistant" content="Typing…" muted />}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={submit} className="mt-3 flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Ask about syllabus, notes, PYQs…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
            
            }
          }}
        />
        <button className="px-4 py-2 rounded bg-gray-900 text-white hover:opacity-90">
          Send
        </button>
      </form>
    </div>
  );
}
