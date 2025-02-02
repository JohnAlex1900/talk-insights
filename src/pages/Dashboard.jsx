import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { MdDownload } from "react-icons/md";
import "chart.js/auto";

const Dashboard = () => {
  const [selectedFeatures, setSelectedFeatures] = useState({
    summary: true,
    sentiment: true,
    categories: true,
    complaints: true,
    leads: true,
    positiveFeedback: true,
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    setLoading(true);
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
    if (data && data.sentiments) {
      setChartData({
        labels: ["Positive", "Neutral", "Negative"],
        datasets: [
          {
            label: "Sentiment Analysis",
            data: [
              data.sentiments.positive,
              data.sentiments.neutral,
              data.sentiments.negative,
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

  const exportData = async () => {
    try {
      // Make a request to the backend to get the CSV file
      const response = await fetch(
        "https://talk-insights-backend.onrender.com/export"
      ); // Adjust URL as necessary
      if (!response.ok) {
        throw new Error("Failed to export data");
      }

      // Get the CSV file as a Blob from the response
      const blob = await response.blob();

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);

      // Set the download filename
      link.download = "call_summary.csv";

      // Simulate a click on the link to start the download
      link.click();
    } catch (error) {
      console.error("Error exporting data:", error);
    }
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
          <h3 className="text-xl font-semibold text-dark-blue mb-4">
            Categories
          </h3>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data.categories.map((category, index) => (
              <div
                key={index}
                className="p-6 bg-orange-500 text-white rounded-lg shadow-lg flex items-center justify-center transition-transform transform hover:scale-105"
              >
                <h4 className="text-lg font-semibold">{category}</h4>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedFeatures.complaints && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-dark-blue">Complaints</h3>
          <p className="text-gray-700">
            {data.complaints && data.complaints.length > 0
              ? data.complaints.map((complaint, index) => (
                  <div key={index} className="p-4 bg-red-100 rounded-lg mb-2">
                    <h4 className="text-lg font-semibold text-red-500">
                      {complaint.severity} complaint
                    </h4>
                    <p>{complaint.description}</p>
                  </div>
                ))
              : "No complaints"}
          </p>
        </div>
      )}

      {selectedFeatures.leads && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-dark-blue">Leads</h3>
          <p className="text-gray-700">
            {data.leads && data.leads.length > 0
              ? data.leads.map((lead, index) => (
                  <div key={index} className="p-4 bg-blue-100 rounded-lg mb-2">
                    <h4 className="text-lg font-semibold text-blue-500">
                      Potential Lead
                    </h4>
                    <p>{lead.description}</p>
                  </div>
                ))
              : "No leads"}
          </p>
        </div>
      )}

      {selectedFeatures.positiveFeedback && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-dark-blue">
            Positive Feedback
          </h3>
          <p className="text-gray-700">
            {data.positiveFeedback && data.positiveFeedback.length > 0
              ? data.positiveFeedback.map((feedback, index) => (
                  <div key={index} className="p-4 bg-green-100 rounded-lg mb-2">
                    <h4 className="text-lg font-semibold text-green-500">
                      Positive Feedback
                    </h4>
                    <p>{feedback.description}</p>
                  </div>
                ))
              : "No positive feedback"}
          </p>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={exportData}
          className="flex items-center justify-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-300"
          title="Export Data"
        >
          <MdDownload className="text-2xl mr-2" />
          Export Data
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
