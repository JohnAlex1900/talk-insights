import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FileUpload = ({ setData }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validFileTypes = ["audio/mp3", "audio/wav", "audio/mpeg"];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && !validFileTypes.includes(selectedFile.type)) {
      setError("Invalid file type. Please upload an mp3, wav, or mpeg file.");
      setFile(null);
    } else {
      setError("");
      setFile(selectedFile);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setError("Please select an audio file before uploading.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/upload",
        formData
      );

      if (response.data) {
        setData(response.data);
        navigate("/dashboard");
      } else {
        setError("Unexpected response. Please try again.");
      }
    } catch (error) {
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
        className="block w-full border rounded-lg cursor-pointer p-2"
      />

      <button
        onClick={uploadFile}
        disabled={loading || !file}
        className="bg-orange-400 hover:bg-orange-600 text-white py-2 px-6 rounded-lg mt-4 disabled:bg-gray-300"
      >
        {loading ? "Processing..." : "Upload"}
      </button>
    </div>
  );
};

export default FileUpload;
