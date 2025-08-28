import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const { login, register, loading } = useAuth();
  const nav = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) await register(form);
      else await login(form.email, form.password);
      nav("/chat");
    } catch (err) {
      setError(err?.message || "Something went wrong");
    }
  };

  return (
    <div className="grid place-items-center mt-10">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow"
      >
        <h1 className="text-xl font-semibold mb-1">
          {isRegister ? "Create account" : "Welcome back"}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {isRegister
            ? "Register to start your personalized guidance."
            : "Login to continue your session."}
        </p>

        {isRegister && (
          <div className="mb-4">
            <label className="block text-sm mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Your name"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            placeholder="you@college.edu"
            required
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            placeholder="••••••••"
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <button
          disabled={loading}
          className="w-full mt-4 bg-gray-900 text-white rounded py-2 hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
        </button>

        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          className="w-full mt-3 text-sm text-gray-600 hover:text-gray-900"
        >
          {isRegister
            ? "Already have an account? Login"
            : "New here? Create an account"}
        </button>
      </form>
    </div>
  );
}
