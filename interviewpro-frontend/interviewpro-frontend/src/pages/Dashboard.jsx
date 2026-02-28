import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import DashboardCharts from "../components/DashboardCharts";

import {
  FaCheckCircle,
  FaClock,
  FaFire,
  FaBolt,
  FaTrophy
} from "react-icons/fa";

const TOTAL_QUESTIONS = 50;

export default function Dashboard() {

  const [data, setData] = useState(null);
  const [topicChart, setTopicChart] = useState([]);
  const [timeChart, setTimeChart] = useState([]);

  // ===== AI States =====
  const [problem, setProblem] = useState("");
  const [language, setLanguage] = useState("C++");
  const [code, setCode] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [aiLoading, setAiLoading] = useState(false);


  // ================= Fetch Analytics =================
  const fetchAnalytics = async () => {
    try {
      const res = await api.get("/analytics/summary");

      setData(res.data);

      // Topic Chart
      const topicData = res.data.topicStats?.map(t => ({
        topic: t.topic,
        count: t.count,
      })) || [];

      setTopicChart(topicData);

      // Time Trend
      const timeData = res.data.timeTrend?.map(t => ({
        date: t.date,
        time: t.time,
      })) || [];

      setTimeChart(timeData);

    } catch (err) {
      console.error(err);
      alert("Failed to load dashboard");
    }
  };


  // ================= AI Analyze =================
  const analyzeCode = async () => {

    if (!code.trim()) {
      alert("Please enter your code first");
      return;
    }

    try {

      setAiLoading(true);
      setAiResult("");

      const res = await api.post("/ai/analyze", {
        problem,
        language,
        code
      });

      setAiResult(res.data);

    } catch (err) {
      console.error(err);
      alert("AI analysis failed");

    } finally {
      setAiLoading(false);
    }
  };


  useEffect(() => {
    fetchAnalytics();
  }, []);


  if (!data) return <p className="p-6">Loading...</p>;


  const progressPercent = Math.min(
    Math.round((data.totalSolved / TOTAL_QUESTIONS) * 100),
    100
  );


  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">

      <Navbar />


      {/* ================= Progress ================= */}
      <div className="px-6 mt-6">

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

          <div className="flex justify-between mb-3">
            <h3 className="font-semibold text-gray-700 dark:text-gray-200">
              Interview Preparation Progress
            </h3>

            <span className="font-bold text-blue-600">
              {progressPercent}%
            </span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 
                         h-3 rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {data.totalSolved} / {TOTAL_QUESTIONS} Questions Completed
          </p>

        </div>
      </div>


      {/* ================= Cards ================= */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-6 gap-4">

        <Card title="Solved" value={data.totalSolved} />
        <Card title="Avg Time" value={`${data.avgTime?.toFixed(1)}s`} />
        <Card title="Strong" value={data.strongTopic || "-"} />
        <Card title="Weak" value={data.weakTopics?.join(", ") || "-"} />
        <Card title="🔥 Streak" value={data.currentStreak} />
        <Card title="🏆 Best" value={data.maxStreak} />

      </div>


      {/* ================= Charts ================= */}
      <div className="p-6">
        <DashboardCharts
          topicData={topicChart}
          timeData={timeChart}
        />
      </div>


      {/* ================= Achievements ================= */}
      {data.achievements && (

        <div className="p-6">

          <h2 className="text-xl font-bold mb-3 text-gray-700 dark:text-white">
            Achievements
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

            {data.achievements.map((a, i) => (

              <div
                key={i}
                className={`p-4 rounded-xl text-center shadow
                ${a.unlocked
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                }`}
              >

                <div className="text-3xl">{a.icon}</div>
                <p className="font-semibold mt-2">{a.name}</p>

              </div>

            ))}

          </div>

        </div>
      )}


      {/* ================= AI Code Analyzer ================= */}
      <div className="p-6">

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-white">
            🤖 AI Code Analyzer
          </h2>


          {/* Problem */}
          <input
            type="text"
            placeholder="Problem Name (e.g. Two Sum)"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="w-full mb-3 p-3 rounded-lg border dark:bg-gray-700 dark:text-white"
          />


          {/* Language */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full mb-3 p-3 rounded-lg border dark:bg-gray-700 dark:text-white"
          >
            <option>C++</option>
            <option>Java</option>
            <option>Python</option>
            <option>JavaScript</option>
          </select>


          {/* Code */}
          <textarea
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-60 p-3 rounded-lg border font-mono dark:bg-gray-700 dark:text-white"
          />


          {/* Button */}
          <button
            onClick={analyzeCode}
            disabled={aiLoading}
            className="mt-4 w-full bg-gradient-to-r from-green-400 to-blue-500 
                       text-white py-3 rounded-lg font-semibold 
                       hover:opacity-90 transition"
          >
            {aiLoading ? "Analyzing..." : "Analyze Code"}
          </button>


          {/* Result */}
          {aiResult && (
            <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">

              <h3 className="font-semibold mb-2 text-gray-700 dark:text-white">
                AI Feedback
              </h3>

              <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
                {aiResult}
              </pre>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}



/* ================= Card Component ================= */

function Card({ title, value }) {

  const iconMap = {
    "Solved": <FaCheckCircle size={26} />,
    "Avg Time": <FaClock size={26} />,
    "Strong": <FaFire size={26} />,
    "Weak": <FaBolt size={26} />,
    "🔥 Streak": <FaFire size={26} />,
    "🏆 Best": <FaTrophy size={26} />
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 
                    text-white p-6 rounded-xl shadow-lg 
                    transform transition duration-300 hover:scale-105">

      <div className="flex justify-between items-center">

        <div>
          <h3 className="text-sm opacity-80">{title}</h3>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>

        <div className="opacity-80">
          {iconMap[title]}
        </div>

      </div>
    </div>
  );
}