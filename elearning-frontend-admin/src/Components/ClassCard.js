import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import FileUpload from "./FileUpload";

const ClassCards = () => {
  const { userId } = useParams(); // Get userId from URL
  const [classes, setClasses] = useState([]);
console.log(userId);
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/enrollments/classes?userId=${userId}`
        );
        setClasses(response.data.classes);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, [userId]);

  return (
     <>
    <Container>
      <h1>Classes for User: {userId}</h1>
      <Row>
        {classes.map((classInfo, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{classInfo.title}</Card.Title>
                <Card.Text>{classInfo.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    <FileUpload />
    </>
  );
};

export default ClassCards;
