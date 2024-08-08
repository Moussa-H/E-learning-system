// Register.js
import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    role: "student", // Set default role to 'student'
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/users",
        formData
      );
      console.log(response.data);
      navigate("/login"); // Redirect to login page on success
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      setError("Invalid username or other error occurred");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </Form.Group>

        <Form.Group controlId="formUsername" className="mt-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </Form.Group>

        <Form.Group controlId="formRole" className="mt-3">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="student">Student</option>
            {/* You can add more roles here if needed */}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
