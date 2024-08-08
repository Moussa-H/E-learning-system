import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

import Classes from "../Components/Classes";
import EnrollClasses from "../Components/EnrollClasses";
import UnenrollClasses from "../Components/UnEnrollClasses";
import ClassDetails from "../Components/ClassDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"; // Import custom CSS

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="content">
            <Routes>
              <Route path="/" element={<Classes />} />
              <Route path="enrollclasses" element={<EnrollClasses />} />
              <Route path="unenrollclasses" element={<UnenrollClasses />} />
              <Route
                path="enrollclasses/classdetails/:classId"
                element={<ClassDetails />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
