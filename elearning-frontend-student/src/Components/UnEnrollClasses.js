import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUnenrollments,
  loadUnenrollments,
  error,
  classesSliceSelector,
} from "../redux/classesSlice/slice";
import ClassCard from "./ClassCard";

export default function UnenrollClasses() {
  const dispatch = useDispatch();
  const {
    unenrollList,
    loading,
    error: reduxError,
  } = useSelector(classesSliceSelector);

  const fetchUnenrolledClasses = async () => {
    dispatch(fetchUnenrollments());
    try {
      const { data } = await axios.get(
        "http://127.0.0.1:8080/enrollments/unenrolled-classes",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(loadUnenrollments(data)); // Ensure data structure matches your needs
    } catch (e) {
      dispatch(error(e.message));
    }
  };

  useEffect(() => {
    fetchUnenrolledClasses();
  }, [dispatch]);

  const handleEnrollSuccess = (classId) => {
    // Fetch the updated list of unenrolled classes after a successful enrollment
    fetchUnenrolledClasses();
    // Optionally, show a success message or perform other actions
  };

  if (loading) return <p>Loading...</p>;
  if (reduxError) return <p>Error: {reduxError}</p>;

  return (
    <div>
      <h1>Unenrolled Classes</h1>
      {unenrollList ? (
        unenrollList.map((classItem) => (
          <ClassCard
            key={classItem._id}
            classData={classItem}
            onEnroll={handleEnrollSuccess}
            displaybutton={true}
          />
        ))
      ) : (
        <p>No unenrolled classes available.</p>
      )}
    </div>
  );
}
