import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function History() {

  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [topicFilter, setTopicFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch history
  const fetchHistory = async () => {
    try {
      const res = await api.get("/progress/history");
      setHistory(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load history");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  /* ----------------- Stats ----------------- */

  const total = history.length;

  const solved = history.filter(
    h => (h.status || "SOLVED") === "SOLVED"
  ).length;

  const avgTime =
    history.length > 0
      ? Math.round(
          history.reduce(
            (sum, h) => sum + (h.timeTaken || h.time || 0),
            0
          ) / history.length
        )
      : 0;

  /* ----------------- Filters ----------------- */

  const topics = [
    "All",
    ...new Set(
      history.map(h => h.question?.topic).filter(Boolean)
    )
  ];

  const filtered = history.filter(h => {

    const title =
      h.question?.title ||
      h.title ||
      h.questionTitle ||
      "";

    const topic =
      h.question?.topic ||
      h.topic ||
      "";

    const status = h.status || "SOLVED";

    const matchesSearch =
      title.toLowerCase().includes(search.toLowerCase());

    const matchesTopic =
      topicFilter === "All" || topic === topicFilter;

    const matchesStatus =
      statusFilter === "All" || status === statusFilter;

    return matchesSearch && matchesTopic && matchesStatus;
  });

  /* ----------------- UI ----------------- */

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          📜 Submission History
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <StatCard title="Total" value={total} />

          <StatCard title="Solved" value={solved} />

          <StatCard title="Avg Time" value={`${avgTime}s`} />

        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-md w-64"
          />

          <select
            value={topicFilter}
            onChange={e => setTopicFilter(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            {topics.map(t => (
              <option key={t}>{t}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option>All</option>
            <option>SOLVED</option>
            <option>UNSOLVED</option>
          </select>

        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Question</th>
                <th className="px-4 py-3">Topic</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500"
                  >
                    No records found
                  </td>
                </tr>
              )}

              {filtered.map(h => (

                <tr
                  key={h.id}
                  className="border-b hover:bg-gray-50"
                >

                  {/* Date */}
                  <td className="px-4 py-2">

                    {h.createdAt
                      ? new Date(h.createdAt).toLocaleDateString()
                      : "—"}

                  </td>

                  {/* Question */}
                  <td className="px-4 py-2 font-medium">

                    {h.question?.title ||
                     h.title ||
                     h.questionTitle ||
                     "N/A"}

                  </td>

                  {/* Topic */}
                  <td className="px-4 py-2">

                    {h.question?.topic ||
                     h.topic ||
                     "N/A"}

                  </td>

                  {/* Time */}
                  <td className="px-4 py-2">

                    {(h.timeTaken || h.time || 0) + "s"}

                  </td>

                  {/* Status */}
                  <td className="px-4 py-2">

                    <StatusBadge status={h.status} />

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

/* ----------------- Components ----------------- */

function StatCard({ title, value }) {

  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">

      <p className="text-gray-500 text-sm">{title}</p>

      <p className="text-2xl font-bold text-blue-600 mt-1">
        {value}
      </p>

    </div>
  );
}

function StatusBadge({ status }) {

  const value = status || "SOLVED";

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium
      ${
        value === "SOLVED"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {value}
    </span>
  );
}
