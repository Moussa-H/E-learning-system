import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Pages/Dashboard";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />{" "}
          {/* Notice the /* to handle nested routes */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
