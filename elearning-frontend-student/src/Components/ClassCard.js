import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ClassCard({
  classData,
  onEnroll,
  displaybutton,
  displayfiles,
}) {
  const navigate = useNavigate();

  const handleEnroll = async () => {
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8080/enrollments",
        { classId: classData._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      onEnroll(classData._id);
    } catch (e) {
      console.error("Error enrolling in class:", e);
    }
  };

  const handleViewDetails = () => {
    navigate(`classdetails/${classData._id}`);
  };

  return (
    <div className="class-card">
      <h2>{classData.title}</h2>
      <p>{classData.description}</p>
      {displaybutton && <button onClick={handleEnroll}>Enroll</button>}
      {displayfiles && (
        <button onClick={handleViewDetails}>View Details</button>
      )}
    </div>
  );
}
