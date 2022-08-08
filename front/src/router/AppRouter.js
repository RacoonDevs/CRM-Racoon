import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Login from "../views/auth/Login";
import Dashboard from "../views/dashboard/Dasboard";
import Projects from "../views/projects/Projects";
import Tasks from "../views/tasks/Tasks";
import Users from "../views/users/Users";

const AppRouter = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<AuthRoutes />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;

const AuthRoutes = () => {
  return (
    <>
      <Sidebar>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/proyectos" element={<Projects />} />
          <Route path="/tareas" element={<Tasks />} />
          <Route path="/usuarios" element={<Users />} />
        </Routes>
      </Sidebar>
    </>
  );
};
