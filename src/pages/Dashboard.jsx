import { useEffect, useState } from "react";
import api from "../services/api.js";
import ProfileForm from "../components/ProfileForm.jsx";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    api.student.getProfile().then((p) => {
      if (mounted) setProfile(p);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const onSave = async (next) => {
    setSaving(true);
    await api.student.updateProfile(next);
    setProfile(next);
    setSaving(false);
  };

  if (!profile) return <p className="mt-8">Loading profile…</p>;

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-semibold mb-4">Profile Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <ProfileForm profile={profile} onSave={onSave} saving={saving} />
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="font-semibold mb-2">How this helps RAG</h2>
          <p className="text-sm text-gray-600">
            Your semester, subjects, and interests guide the retrieval of
            syllabus sections, notes, and PYQs. The chatbot uses this context to
            answer precisely.
          </p>
        </div>
      </div>
    </div>
  );
}
