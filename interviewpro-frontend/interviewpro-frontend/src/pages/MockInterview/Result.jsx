export default function Result({ data }) {
  return (
    <div>
      <h2>Interview Report</h2>

      <p>Score: {data.score}</p>
      <p>Accuracy: {data.accuracy}%</p>
      <p>Avg Time: {data.avgTime}s</p>
      <p>Weak Topic: {data.weak}</p>
    </div>
  );
}