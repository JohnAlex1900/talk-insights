import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/analysis");

        console.log("Backend response:", response.data); // Debugging log

        if (response.data.error) {
          setError(response.data.error);
        } else {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching analysis data:", error);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-10 text-blue-500">
        Loading analysis data...
      </div>
    );
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-darkblue mb-4">
        Call Analysis Dashboard
      </h1>

      {/* Summary Section */}
      {data && data.summary && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold">Summary</h2>
          <p className="text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        {data && data.categories && data.categories.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {data.categories.map((category, index) => (
                <span
                  key={index}
                  className="bg-orange-100 text-orange-600 py-1 px-4 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bar Chart */}
        {data && data.sentiments && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Sentiment Analysis</h2>
            <Bar
              data={{
                labels: ["Positive", "Neutral", "Negative"],
                datasets: [
                  {
                    label: "Sentiments",
                    data: [
                      data.sentiments.positive || 0,
                      data.sentiments.neutral || 0,
                      data.sentiments.negative || 0,
                    ],
                    backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
                  },
                ],
              }}
            />
          </div>
        )}
      </div>

      <button
        onClick={() => navigate("/")}
        className="bg-orange-500 text-white py-2 px-6 rounded-lg mt-6 hover:bg-orange-700"
      >
        Back to Upload
      </button>
    </div>
  );
};

export default Dashboard;
