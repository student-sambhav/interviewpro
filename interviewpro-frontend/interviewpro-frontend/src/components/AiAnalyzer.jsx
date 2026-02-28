import React, { useState } from "react";
import axios from "axios";

const AiAnalyzer = () => {
  const [problem, setProblem] = useState("");
  const [language, setLanguage] = useState("C++");
  const [code, setCode] = useState("");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");
    setResult("");

    try {
      // Get JWT token from localStorage
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8080/api/ai/analyze",
        {
          problem,
          language,
          code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setResult(response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data ||
          "Something went wrong while analyzing code."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>🤖 AI Code Analyzer</h2>

      {/* Problem */}
      <input
        type="text"
        placeholder="Problem Name (e.g. Two Sum)"
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        style={styles.input}
      />

      {/* Language */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={styles.input}
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
        style={styles.textarea}
      />

      {/* Button */}
      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={styles.button}
      >
        {loading ? "Analyzing..." : "Analyze Code"}
      </button>

      {/* Error */}
      {error && <p style={styles.error}>❌ {error}</p>}

      {/* Result */}
      {result && (
        <div style={styles.resultBox}>
          <h3>📊 AI Result</h3>
          <pre style={styles.result}>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default AiAnalyzer;

/* Inline Styles */
const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
    background: "#121212",
    color: "#fff",
    borderRadius: "8px",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "none",
    fontSize: "16px",
  },

  textarea: {
    width: "100%",
    minHeight: "250px",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "4px",
    fontFamily: "monospace",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "18px",
    cursor: "pointer",
  },

  error: {
    color: "#ff4d4d",
    marginTop: "15px",
  },

  resultBox: {
    marginTop: "25px",
    background: "#1e1e1e",
    padding: "15px",
    borderRadius: "6px",
  },

  result: {
    whiteSpace: "pre-wrap",
    fontSize: "14px",
  },
};