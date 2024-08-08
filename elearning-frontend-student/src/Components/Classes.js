import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClasses,
  loadClasses,
  error,
  classesSliceSelector,
} from "../redux/classesSlice/slice";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Classes() {
  const dispatch = useDispatch();
  const classes = useSelector(classesSliceSelector);

  const fetchingclasses = async () => {
    dispatch(fetchClasses());
    try {
      const { data } = await axios.get("http://127.0.0.1:8080/classes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("API Response:", data); // Debugging: Log API response
      dispatch(loadClasses(data));
    } catch (e) {
      console.error("API Error:", e); // Debugging: Log API error
      dispatch(error(e.message));
    }
  };

  useEffect(() => {
    fetchingclasses();
  }, [dispatch]);

  console.log("Redux State - Classes:", classes); // Debugging: Log Redux state

  return (
    <div className="container mt-5">
      <h1>All Classes</h1>
      {classes.list && classes.list.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Class Title</th>
              <th scope="col">Description</th>
              <th scope="col">Start Date</th>
              <th scope="col">End Date</th>
            </tr>
          </thead>
          <tbody>
            {classes.list.map((classitem) => (
              <tr key={classitem._id}>
                <td>{classitem.title}</td>
                <td>{classitem.description}</td>
                <td>{new Date(classitem.createdAt).toLocaleDateString()}</td>
                <td>{new Date(classitem.updatedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No classes available.</p>
      )}
    </div>
  );
}
