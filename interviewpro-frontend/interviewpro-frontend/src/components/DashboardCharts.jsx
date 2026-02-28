import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const DashboardCharts = ({ topicData, timeData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

      {/* Solved by Topic */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Solved by Topic</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={topicData}>
            <XAxis dataKey="topic" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Avg Time Trend */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Avg Time Trend</h3>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={timeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="time"
              stroke="#16a34a"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default DashboardCharts;
