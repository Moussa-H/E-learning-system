import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEnrollments,
  loadEnrollments,
  error,
  classesSliceSelector,
} from "../redux/classesSlice/slice";
import ClassCard from "./ClassCard";

export default function EnrollClasses() {
  const dispatch = useDispatch();
  const {
    enrollList,
    loading,
    error: reduxError,
  } = useSelector(classesSliceSelector);

  const fetchEnrolledClasses = async () => {
    dispatch(fetchEnrollments());
    try {
      const { data } = await axios.get(
        "http://127.0.0.1:8080/enrollments/enrolled-classes",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(loadEnrollments(data)); // Ensure data structure matches your needs
    } catch (e) {
      dispatch(error(e.message));
    }
  };

  useEffect(() => {
    fetchEnrolledClasses();
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (reduxError) return <p>Error: {reduxError}</p>;

  return (
    <div className="flex-classes">
      <h1>Enrolled Classes</h1>
      <div>
        {enrollList ? (
          enrollList.map((classItem) => (
            <ClassCard
              key={classItem._id}
              classData={classItem}
              displayfiles={true}
            />
          ))
        ) : (
          <p>No enrolled classes available.</p>
        )}
      </div>
    </div>
  );
}
