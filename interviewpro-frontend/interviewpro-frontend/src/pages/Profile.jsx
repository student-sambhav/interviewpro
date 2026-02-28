import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Profile() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/analytics/summary");
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load profile");
    }
  };

  if (!data) return <p className="p-6">Loading...</p>;

  const level = Math.floor(data.totalSolved / 10) + 1;
  const progressPercent = (data.totalSolved % 10) * 10;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">

        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <h1 className="text-3xl font-bold mb-2">
            👤 My Profile
          </h1>

          <p className="text-gray-600">
            Track your progress & achievements
          </p>

          {/* Level Section */}
          <div className="mt-6">
            <h3 className="font-semibold mb-1">
              🎮 Level {level}
            </h3>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-indigo-600 h-3 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-sm text-gray-500 mt-1">
              {data.totalSolved % 10} / 10 solves to next level
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          <StatCard title="Solved" value={data.totalSolved} />
          <StatCard title="Avg Time" value={`${data.avgTime.toFixed(1)}s`} />
          <StatCard title="Current Streak" value={data.currentStreak} />
          <StatCard title="Best Streak" value={data.maxStreak} />

        </div>

        {/* Achievements Section */}
        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            🏆 Achievements
          </h2>

          {data.achievements.length === 0 && (
            <p className="text-gray-500">
              No achievements unlocked yet. Start solving!
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {data.achievements.map((a, index) => (

              <div
                key={index}
                className="bg-gradient-to-r from-yellow-100 to-yellow-200 
                           p-4 rounded-lg shadow text-center 
                           hover:scale-105 transition"
              >
                <div className="text-4xl">
                  {a.icon}
                </div>

                <h3 className="font-bold mt-2">
                  {a.name}
                </h3>

              </div>

            ))}

          </div>

        </div>

      </div>
    </div>
  );
}

/* ---------- Stat Card ---------- */

function StatCard({ title, value }) {

  return (
    <div className="bg-white rounded-xl shadow p-4 text-center hover:shadow-lg transition">

      <p className="text-gray-500 text-sm">{title}</p>

      <p className="text-2xl font-bold text-indigo-600 mt-1">
        {value}
      </p>

    </div>
  );
}
