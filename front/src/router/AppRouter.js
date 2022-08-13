import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AccountContext } from "../AppContext/AppProvider";
import { AlreadyLoginRoute, PrivateRoute } from "./RoutesSettings";
import Sidebar from "../components/Sidebar/Sidebar";
import Login from "../views/auth/Login";
import Dashboard from "../views/dashboard/Dasboard";
import Projects from "../views/projects/Projects";
import Tasks from "../views/tasks/Tasks";
import Users from "../views/users/Users";

const AppRouter = () => {
  const { userData } = useContext(AccountContext);
  console.log(userData);
  return (
    <>
      <Router>
        <Routes>
          {userData.sesion !== true && (
            <Route
              path="*"
              element={
                <AlreadyLoginRoute status={userData.sesion}>
                  <Login />
                </AlreadyLoginRoute>
              }
            />
          )}
          {userData.sesion === true && (
            <Route
              path="*"
              element={
                <PrivateRoute status={userData.sesion}>
                  <AuthRoutes />
                </PrivateRoute>
              }
            />
          )}
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
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/proyectos" element={<Projects />} />
          <Route path="/tareas" element={<Tasks />} />
          <Route path="/usuarios" element={<Users />} />
        </Routes>
      </Sidebar>
    </>
  );
};
