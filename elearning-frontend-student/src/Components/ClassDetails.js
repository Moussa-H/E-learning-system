import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFiles,
  loadFiles,
  error,
  classesSliceSelector,
} from "../redux/classesSlice/slice";
import Withdraw from "./Withdraw";// Adjust the import path as necessary

export default function ClassDetails() {
  const { classId } = useParams();
  const dispatch = useDispatch();
  const {
    files,
    loading,
    error: reduxError,
  } = useSelector(classesSliceSelector);

  useEffect(() => {
    const fetchClassFiles = async () => {
      dispatch(fetchFiles());
      try {
        const { data } = await axios.get(
          `http://localhost:8080/files?classId=${classId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(loadFiles(data));
      } catch (e) {
        dispatch(error(e.message));
      }
    };

    fetchClassFiles();
  }, [classId, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (reduxError) return <p>Error: {reduxError}</p>;

  return (
    <div>
      <h1>Class Files</h1>
      {files.length  ? (
        files.map((file) => (
          <div key={file._id} className="file-card">
            <h3>{file.fileName}</h3>
            <p>Uploaded by: {file.uploadedBy}</p>
            <p>Uploaded at: {new Date(file.uploadedAt).toLocaleString()}</p>
            <a
              href={`http://localhost:8080/uploads/${file.filePath}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View File
            </a>
          </div>
        ))
      ) : (
        <p>No files available for this class.</p>
      )}
      <Withdraw classId={classId} />
    </div>
  );
}
