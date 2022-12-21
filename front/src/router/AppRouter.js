import React, { Suspense, useContext, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Context from "../AppContext/Context";
import { AlreadyLoginRoute, PrivateRoute } from "./RoutesSettings";
import { Loading } from "../components/Loading";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
const Dashboard = lazy(() => import("../views/dashboard/Dasboard"));
const Sidebar = lazy(() => import("../components/Sidebar/Sidebar"));
const Profile = lazy(() => import("../views/profile/Profile"));
const Projects = lazy(() => import("../views/projects/Projects"));
const Tasks = lazy(() => import("../views/tasks/Tasks"));
const Config = lazy(() => import("../views/Config/Config"));
const Teams = lazy(() => import("../views/teams/Teams"));
const Users = lazy(() => import("../views/users/Users"));
const AddUsers = lazy(() => import("../views/users/CreateUsers"));
const EditUsers = lazy(() => import("../views/users/EditUsers"));

const AppRouter = () => {
  const { user } = useContext(Context);
  const [status, setStatus] = useState(null);
  useEffect(() => {
    setStatus(user.length <= 0 ? false : true);
  }, [user]);

  return (
    <Suspense fallback={<Loading />}>
      {status === null ? (
        <Loading />
      ) : (
        <Router>
          <Routes>
            {!status && (
              <Route
                path="*"
                element={
                  <AlreadyLoginRoute status={status}>
                    <AuthRoutes />
                  </AlreadyLoginRoute>
                }
              />
            )}
            {status && (
              <Route
                path="*"
                element={
                  <PrivateRoute status={status}>
                    <UserRoutes />
                  </PrivateRoute>
                }
              />
            )}
          </Routes>
        </Router>
      )}
    </Suspense>
  );
};

export default AppRouter;

const UserRoutes = () => {
  return (
    <>
      <Sidebar>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/proyectos" element={<Projects />} />
          <Route path="/tareas" element={<Tasks />} />
          <Route path="/configuraciones" element={<Config />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/usuarios" element={<Users />} />
          <Route path="/usuarios/agregar_usuarios" element={<AddUsers />} />
          <Route path="/usuarios/editar_usuario/:id" element={<EditUsers />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Sidebar>
    </>
  );
};

const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
};
