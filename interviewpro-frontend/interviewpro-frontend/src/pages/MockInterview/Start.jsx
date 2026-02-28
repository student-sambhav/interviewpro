import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Start() {
  const [duration, setDuration] = useState(30);
  const [difficulty, setDifficulty] = useState("Easy");

  const navigate = useNavigate();

  const startInterview = () => {
    navigate("/mock/interview", {
      state: { duration, difficulty }
    });
  };

  return (
    <div>
      <h2>Mock Interview</h2>

      <select onChange={(e)=>setDuration(e.target.value)}>
        <option>30</option>
        <option>45</option>
        <option>60</option>
      </select>

      <select onChange={(e)=>setDifficulty(e.target.value)}>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <button onClick={startInterview}>
        Start Interview
      </button>
    </div>
  );
}