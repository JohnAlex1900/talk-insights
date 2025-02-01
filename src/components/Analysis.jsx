import React from "react";

const Analysis = ({ data }) => {
  if (!data) return null;

  return (
    <div className="mt-6 p-6 bg-white text-gray-900 rounded-xl shadow-lg max-w-2xl">
      <h2 className="text-2xl font-bold text-darkBlue mb-3">Call Summary</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-lightBlue">Transcript</h3>
        <p className="text-textGray">{data.transcript}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-lightBlue">Summary</h3>
        <p className="text-textGray">{data.summary}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-lightBlue">Insights</h3>
        <p className="text-textGray">{data.insights}</p>
      </div>
    </div>
  );
};

export default Analysis;
