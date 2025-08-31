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
      {/* <h1 className="text-2xl font-semibold mb-4">Profile Dashboard</h1> */}
      <div className=" max-w-3xl m-auto">
        <ProfileForm profile={profile} onSave={onSave} saving={saving} />
        
      </div>
    </div>
  );
}
