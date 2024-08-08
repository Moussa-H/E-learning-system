import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ListStudents = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8080/enrollments/allusersenrolled"
        );
        const data = response.data.classesWithUsers;

    
        const studentMap = {};

        Object.values(data).forEach((classInfo) => {
          classInfo.students.forEach((student) => {
            if (!studentMap[student.userId]) {
              studentMap[student.userId] = {
                username: student.username,
                email: student.email,
                classCount: 0,
              };
            }
            studentMap[student.userId].classCount += 1;
          });
        });

        setStudents(Object.values(studentMap));
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleViewClasses = (userId) => {
    navigate(`class-cards/${userId}`);
  };

  return (
    <div>
      <h1>List of Students Enrolled in Classes</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Number of Enrollments</th>
            <th>Action</th> {/* Add action column */}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.username}</td>
              <td>{student.email}</td>
              <td>{student.classCount}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleViewClasses(student.userId)}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListStudents;
