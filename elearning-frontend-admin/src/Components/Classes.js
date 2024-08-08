import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  fetchClasses,
  loadClasses,
  error,
  classesSliceSelector,
} from "../redux/classesSlice/slice";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Pagination } from "react-bootstrap";
import AddClassPopup from "../Components/AddClassPopup";

export default function Classes() {
  const dispatch = useDispatch();
  const classes = useSelector(classesSliceSelector);

  const [currentPage, setCurrentPage] = useState(1);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const classesPerPage = 10;

  const handleShowAddClassModal = () => setShowAddClassModal(true);
  const handleCloseAddClassModal = () => setShowAddClassModal(false);

  const fetchingClasses = async () => {
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
    fetchingClasses();
  }, [dispatch]);

  console.log("Redux State - Classes:", classes); // Debugging: Log Redux state

  // Get current classes
  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = classes.list.slice(
    indexOfFirstClass,
    indexOfLastClass
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(classes.list.length / classesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h1>All Classes</h1>
      <Button
        variant="primary"
        className="mb-3"
        onClick={handleShowAddClassModal}
      >
        Add Class
      </Button>
      <AddClassPopup
        show={showAddClassModal}
        handleClose={handleCloseAddClassModal}
        fetchClasses={fetchingClasses}
      />
      {classes.list && classes.list.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {currentClasses.map((classItem) => (
                <tr key={classItem.id}>
                  <td>{classItem.title}</td>
                  <td>{classItem.description}</td>
                  <td>{new Date(classItem.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            {pageNumbers.map((number) => (
              <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => paginate(number)}
              >
                {number}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      ) : (
        <p>No classes available.</p>
      )}
    </div>
  );
}
