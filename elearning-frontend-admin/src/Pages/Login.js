import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
        "http://127.0.0.1:8080/auth",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      const errorMessage = error.response?.data?.message || "An error occurred";
      setError(errorMessage);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
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

        <Button variant="primary" type="submit" className="mt-4">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
