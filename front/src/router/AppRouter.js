import React, { Suspense, useContext, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Context from "../AppContext/Context";
import { AlreadyLoginRoute, PrivateRoute } from "./RoutesSettings";
import { Loading } from "../components/Loading";
import Login from "../views/auth/Login";
const Dashboard = lazy(() => import("../views/dashboard/Dasboard"));
const Sidebar = lazy(() => import("../components/Sidebar/Sidebar"));
const Profile = lazy(() => import("../views/profile/Profile"));
const Projects = lazy(() => import("../views/projects/Projects"));
const Tasks = lazy(() => import("../views/tasks/Tasks"));
const Config = lazy(() => import("../views/Config/Config"));
const Users = lazy(() => import("../views/users/Users"));
const AddUsers = lazy(() => import("../views/users/CreateUsers"));
const EditUsers = lazy(() => import("../views/users/EditUsers"));

const AppRouter = () => {
  const { profile } = useContext(Context);
  return (
    <Suspense fallback={<Loading />}>
      {profile.sesion === null ? (
        <Loading />
      ) : (
        <Router>
          <Routes>
            {profile.sesion === false && (
              <Route
                path="*"
                element={
                  <AlreadyLoginRoute status={profile.sesion}>
                    <Login />
                  </AlreadyLoginRoute>
                }
              />
            )}
            {profile.sesion === true && (
              <Route
                path="*"
                element={
                  <PrivateRoute status={profile.sesion}>
                    <AuthRoutes />
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

const AuthRoutes = () => {
  return (
    <>
      <Sidebar>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/proyectos" element={<Projects />} />
          <Route path="/tareas" element={<Tasks />} />
          <Route path="/configuraciones" element={<Config />} />
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
