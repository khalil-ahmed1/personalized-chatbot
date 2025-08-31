export default function MessageBubble({ role, content, muted }) {
  const isUser = role === "user";
  return (
    <div className={`my-2 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 text-base ${
          isUser
            ? "bg-gray-900 text-white"
            : muted
            ? "bg-gray-300 text-gray-900"
            : "bg-gray-300"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
