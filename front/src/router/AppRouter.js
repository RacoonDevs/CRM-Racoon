import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../views/auth/Login";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
