import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [classId, setClassId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClassIdChange = (e) => {
    setClassId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !classId) {
      setMessage("Please select a file and enter a class ID.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setMessage("");

      const response = await axios.post(
        "http://127.0.0.1:8080/file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            classId,
          },
        }
      );

      setMessage("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload File</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="classId" className="form-label">
            Class ID
          </label>
          <input
            type="text"
            className="form-control"
            id="classId"
            value={classId}
            onChange={handleClassIdChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            File
          </label>
          <input
            type="file"
            className="form-control"
            id="file"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
};

export default FileUpload;
