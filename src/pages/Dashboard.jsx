import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { MdDownload } from "react-icons/md";
import "chart.js/auto";

const Dashboard = ({ data }) => {
  const [selectedFeatures, setSelectedFeatures] = useState({
    summary: true,
    sentiment: true,
    categories: true,
  });
  const [loading, setLoading] = useState(false);

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("https://talk-insights-backend.onrender.com/analysis")
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching analysis:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (data && data.sentiment_analysis) {
      setChartData({
        labels: ["Positive", "Neutral", "Negative"],
        datasets: [
          {
            label: "Sentiment Analysis",
            data: [
              data.sentiment_analysis.positive,
              data.sentiment_analysis.neutral,
              data.sentiment_analysis.negative,
            ],
            backgroundColor: ["#4caf50", "#ffeb3b", "#f44336"],
          },
        ],
      });
    }
  }, [data]);

  const toggleFeature = (feature) => {
    setSelectedFeatures((prev) => ({ ...prev, [feature]: !prev[feature] }));
  };

  const exportData = () => {
    const exportContent = JSON.stringify(data, null, 2);
    const blob = new Blob([exportContent], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "call_summary.json";
    link.click();
  };

  if (loading) return <p>Loading...</p>;
  if (!data || !data.summary) return <p>No analysis available.</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-dark-blue mb-4">
        Call Analysis Dashboard
      </h2>

      <div className="flex space-x-4 mb-4">
        {Object.keys(selectedFeatures).map((feature) => (
          <button
            key={feature}
            onClick={() => toggleFeature(feature)}
            className={`px-4 py-2 rounded ${
              selectedFeatures[feature]
                ? "bg-orange-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {feature.charAt(0).toUpperCase() + feature.slice(1)}
          </button>
        ))}
        <MdDownload
          className="text-xl text-orange-500 cursor-pointer"
          onClick={exportData}
          title="Export Data"
        />
      </div>

      {selectedFeatures.summary && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-dark-blue">Summary</h3>
          <p className="text-gray-700">{data.summary}</p>
        </div>
      )}

      {selectedFeatures.sentiment && chartData && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-dark-blue">
            Sentiment Analysis
          </h3>
          <Bar data={chartData} />
        </div>
      )}

      {selectedFeatures.categories && (
        <div>
          <h3 className="text-xl font-semibold text-dark-blue">Categories</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(data.categories || {}).map(
              ([category, details]) => (
                <div key={category} className="p-4 bg-gray-100 rounded-lg">
                  <h4 className="text-lg font-semibold">{category}</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {details.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
