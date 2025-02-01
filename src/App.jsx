import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [data, setData] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FileUpload setData={setData} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
