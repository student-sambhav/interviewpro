import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Practice() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {

    api.get("/questions")
      .then(res => setQuestions(res.data))
      .catch(() => alert("Failed to load questions"));

  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          🚀 Practice Questions
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {questions.map(q => (

            <div
              key={q.id}
              className="bg-white rounded-xl shadow
                         hover:shadow-lg transition
                         p-6 border-l-4 border-indigo-500"
            >

              {/* Title */}
              <h2 className="text-xl font-bold">
                {q.title}
              </h2>

              {/* Topic */}
              <p className="text-gray-600 mt-1">
                Topic: <b>{q.topic}</b>
              </p>

              {/* Difficulty */}
              <div className="mt-2">

                <span className={`px-3 py-1 rounded-full text-sm font-semibold

                  ${q.difficulty === "Easy" && "bg-green-100 text-green-700"}
                  ${q.difficulty === "Medium" && "bg-yellow-100 text-yellow-700"}
                  ${q.difficulty === "Hard" && "bg-red-100 text-red-700"}

                `}>

                  {q.difficulty}

                </span>

              </div>

              {/* Button */}
              <div className="mt-4">

                <Link
                  to={`/practice/${q.id}`}
                  className="inline-block bg-indigo-600
                             text-white px-4 py-2 rounded
                             hover:bg-indigo-700 transition"
                >
                  Solve →
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}
