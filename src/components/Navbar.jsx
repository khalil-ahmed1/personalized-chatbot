import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { token, user, logout } = useAuth();
  const { pathname } = useLocation();

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg">
          🎓 Academic Chatbot
        </Link>

        <div className="flex items-center gap-4">
          {token && (
            <>
              <Link
                to="/chat"
                className={`px-3 py-1 rounded ${
                  pathname === "/chat"
                    ? "bg-gray-900 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                Chat
              </Link>
              <Link
                to="/dashboard"
                className={`px-3 py-1 rounded ${
                  pathname === "/dashboard"
                    ? "bg-gray-900 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                Dashboard
              </Link>
              <span className="hidden sm:inline text-sm text-gray-500">
                Hi, {user?.name || "Student"}
              </span>
              <button
                onClick={logout}
                className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
          {!token && (
            <Link
              to="/login"
              className="px-3 py-1 rounded bg-gray-900 text-white"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
