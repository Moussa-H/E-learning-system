import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const AddClassPopup = ({ show, handleClose, fetchClasses }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/classes",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Class added:", response.data);
      fetchClasses(); // Refresh the classes list
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error adding class:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Class</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter class title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDescription" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter class description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddClassPopup;
