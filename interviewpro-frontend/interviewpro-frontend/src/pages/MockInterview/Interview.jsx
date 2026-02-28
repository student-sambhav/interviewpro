import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Interview() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const totalTime = state.duration * 60;

  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t === 1) submit();
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const submit = () => {
    navigate("/mock/result");
  };

  return (
    <div>
      <h3>Time Left: {Math.floor(timeLeft/60)}:{timeLeft%60}</h3>

      <h4>Question {index+1}</h4>

      {/* Show Question Here */}

      <button onClick={()=>setIndex(index+1)}>Next</button>
      <button onClick={submit}>Submit</button>
    </div>
  );
}