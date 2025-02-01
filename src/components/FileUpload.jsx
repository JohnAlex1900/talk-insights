import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import axios from "axios";

const FileUpload = ({ setData }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  const validFileTypes = ["audio/mp3", "audio/wav", "audio/mpeg"];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && !validFileTypes.includes(selectedFile.type)) {
      setError("Please upload a valid audio file (mp3, wav, or mpeg).");
      setFile(null);
    } else {
      setError("");
      setFile(selectedFile);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setError("No file selected. Please choose an audio file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/upload/",
        formData
      );

      if (response.data && response.status === 200) {
        setData(response.data);
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setError("Unexpected response. Please try again.");
      }
    } catch (error) {
      console.error("Upload failed", error);
      setError("Error uploading file. Please check your connection.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
      />

      <button
        onClick={uploadFile}
        disabled={loading || !file}
        className="bg-orange-400 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg mt-4 transition-all disabled:bg-gray-300"
      >
        {loading ? "Processing..." : "Upload"}
      </button>
    </div>
  );
};

export default FileUpload;
