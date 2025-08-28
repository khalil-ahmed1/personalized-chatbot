import { useState } from "react";

export default function ProfileForm({ profile, onSave, saving }) {
  const [form, setForm] = useState({
    name: profile.name || "",
    semester: profile.semester || "5",
    subjects: profile.subjects || [],
    strengths: profile.strengths || "",
    weaknesses: profile.weaknesses || "",
    interests: profile.interests || "",
  });

  const [subjectInput, setSubjectInput] = useState("");

  const addSubject = () => {
    const s = subjectInput.trim();
    if (!s) return;
    if (form.subjects.includes(s)) return;
    setForm({ ...form, subjects: [...form.subjects, s] });
    setSubjectInput("");
  };

  const removeSubject = (s) =>
    setForm({ ...form, subjects: form.subjects.filter((x) => x !== s) });

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl shadow p-4">
      <h2 className="font-semibold mb-4">Student Profile</h2>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Semester</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={form.semester}
            onChange={(e) => setForm({ ...form, semester: e.target.value })}
          >
            {Array.from({ length: 8 }, (_, i) => String(i + 1)).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Subjects</label>
          <div className="flex gap-2">
            <input
              className="flex-1 border rounded px-3 py-2"
              placeholder="e.g., NLP"
              value={subjectInput}
              onChange={(e) => setSubjectInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSubject();
                }
              }}
            />
            <button
              type="button"
              onClick={addSubject}
              className="px-3 py-2 rounded bg-gray-900 text-white"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {form.subjects.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"
              >
                {s}
                <button
                  type="button"
                  onClick={() => removeSubject(s)}
                  className="text-red-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Strengths</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.strengths}
            onChange={(e) => setForm({ ...form, strengths: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Weaknesses</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.weaknesses}
            onChange={(e) => setForm({ ...form, weaknesses: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Interests</label>
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Comma-separated, e.g., AI, ML"
            value={form.interests}
            onChange={(e) => setForm({ ...form, interests: e.target.value })}
          />
        </div>
      </div>

      <button
        disabled={saving}
        className="mt-4 px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}
