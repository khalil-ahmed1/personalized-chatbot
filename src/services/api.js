import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const useMock = (import.meta.env.VITE_USE_MOCK || "true") === "true";

const http = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// ---------- MOCK STORAGE HELPERS ----------
const LS = {
  get(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  },
  set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  },
};

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- API FUNCTIONS ----------
const api = {
  auth: {
    async login({ email, password }) {
      if (useMock) {
        await delay(400);
        if (!email || !password) throw new Error("Email & password required");
        const user = { id: "u1", name: "Student User", email };
        return { token: "mock-token-123", user };
      }
      const { data } = await http.post("/auth/login", { email, password });
      return data;
    },
    async register(payload) {
      if (useMock) {
        await delay(500);
        const user = {
          id: "u1",
          name: payload.name || "Student User",
          email: payload.email,
        };
        return { token: "mock-token-123", user };
      }
      const { data } = await http.post("/auth/register", payload);
      return data;
    },
  },

  student: {
    async getProfile() {
      if (useMock) {
        await delay(300);
        return (
          LS.get("mock-profile", {
            name: "Student User",
            semester: "5",
            subjects: ["NLP", "DBMS"],
            strengths: "Problem-solving",
            weaknesses: "Time management",
            interests: "AI, ML, NLP",
          }) || {}
        );
      }
      const { data } = await http.get("/student/profile");
      return data;
    },

    async updateProfile(profile) {
      if (useMock) {
        await delay(400);
        LS.set("mock-profile", profile);
        return { success: true };
      }
      const { data } = await http.put("/student/profile", profile);
      return data;
    },
  },

  chat: {
    async send({ message, history }) {
      if (useMock) {
        await delay(600);
        // simple rule-based mock
        let reply =
          "Thanks! I’m your academic guide. I’ll use your profile and resources to help you.";
        if (/syllabus/i.test(message))
          reply = "Please specify the subject. E.g., 'NLP syllabus unit-wise'.";
        if (/previous|year|qp|question/i.test(message))
          reply =
            "You can find PYQs in the Knowledge Base. I can fetch specific subjects if you tell me which.";
        if (/rag|retrieval/i.test(message))
          reply =
            "RAG = retrieve relevant chunks (FAISS/Chroma), then generate with context.";

        return {
          reply,
          sources: ["mock:kb/syllabus.pdf", "mock:notes/unit1.md"],
        };
      }
      const { data } = await http.post("/chat/query", { message, history });
      return data;
    },
  },
};

export default api;
