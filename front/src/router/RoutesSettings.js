import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ status, children }) => {
  return status ? children : <Navigate to="/" />;
};

export const AlreadyLoginRoute = ({ status, children }) => {
  return status ? <Navigate to="/login" /> : children;
};
