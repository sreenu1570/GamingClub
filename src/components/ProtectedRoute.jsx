import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../storage";

export default function ProtectedRoute() {
  return getCurrentUser()
    ? <Outlet />
    : <Navigate to="/login" replace />;
}