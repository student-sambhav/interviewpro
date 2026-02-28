import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import toast from "react-hot-toast";

const Solve = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("");
  const [time, setTime] = useState(0);
  const [loading, setLoading] = useState(true);

  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);

  // ⏱ Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 📥 Fetch Question
  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const fetchQuestion = async () => {
    try {
      const res = await axios.get(`/questions/${id}`);
      setQuestion(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load question", err);
      toast.error("Failed to load question");
      setLoading(false);
    }
  };

  // ▶ Run Code
  const handleRun = async () => {
    if (!code.trim()) {
      toast.error("Write some code first!");
      return;
    }

    try {
      setRunning(true);
      setResult(null);

      const res = await axios.post("/submission/run", {
        questionId: question.id,
        sourceCode: code,
      });

      setResult(res.data);

    } catch (err) {
      console.error("Run failed", err);
      toast.error("Error running code");
    }

    setRunning(false);
  };

  // 📤 Submit Progress
  const handleSubmit = async () => {
    if (!code.trim()) {
      toast.error("Please write some code first!");
      return;
    }

    try {
      await axios.post("/progress", {
        questionId: question.id,
        status: result?.status === "PASSED" ? "SOLVED" : "ATTEMPTED",
        attempts: 1,
        timeTaken: time,
      });

      toast.success("Progress Saved Successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Save failed", err);
      toast.error("Failed to save progress");
    }
  };

  // ⏳ Loading State
  if (loading) {
    return <p className="p-6 text-xl">Loading...</p>;
  }

  if (!question) {
    return <p className="p-6 text-red-500">Question not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">
        {question.title}
      </h1>

      {/* Meta */}
      <p className="text-gray-600 mb-6">
        Topic: {question.topic} | Difficulty: {question.difficulty}
      </p>

      {/* Description (if exists) */}
      {question.description && (
        <div className="mb-6 p-4 bg-gray-100 rounded">
          {question.description}
        </div>
      )}

      {/* Code Editor */}
      <textarea
        className="w-full h-64 border rounded p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Write your Java code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      {/* Bottom Bar */}
      <div className="flex justify-between items-center mt-4">

        {/* Timer */}
        <p className="text-gray-700">
          ⏱ Time: {time}s
        </p>

        <div className="flex gap-4">

          {/* Run Button */}
          <button
            onClick={handleRun}
            disabled={running}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium"
          >
            {running ? "Running..." : "Run"}
          </button>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium"
          >
            Submit
          </button>

        </div>
      </div>

      {/* Result Section */}
      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Execution Result</h3>

          <p>
            Status:
            <span
              className={`ml-2 font-bold ${
                result.status === "PASSED"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {result.status}
            </span>
          </p>

          <p>
            Passed: {result.passed}/{result.total}
          </p>
        </div>
      )}

    </div>
  );
};

export default Solve;