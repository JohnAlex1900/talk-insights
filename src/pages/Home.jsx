import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import Analysis from "../components/Analysis";

const Home = () => {
  const [data, setData] = useState(null);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <h1 className="text-4xl font-bold text-blue-700 mb-2">Talk Insights</h1>
      <p className="text-lg text-blue-300 mb-6">
        Upload your call audio to get AI-powered summaries & insights
      </p>
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <FileUpload setData={setData} />
      </div>
      {data && <Analysis data={data} />}
    </div>
  );
};

export default Home;
