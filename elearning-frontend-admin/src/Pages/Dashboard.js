import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import ListStudents from "../Components/ListStudentsEnroll";
import Classes from "../Components/Classes";
import ClassCard from "../Components/ClassCard";
import "bootstrap/dist/css/bootstrap.min.css";
import RequestWithdrawal from "../Components/RequestWithdrawal";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>
        <div className="col-md-9 p-4">
          <Routes>
            <Route path="/" element={<Classes />} />
            <Route path="studentsenroll" element={<ListStudents />} />
            <Route path="Withdrawal" element={<RequestWithdrawal />} />
            <Route
              path="studentsenroll/class-cards/:userId"
              element={<ClassCard />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
