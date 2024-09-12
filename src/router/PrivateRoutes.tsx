import { Routes, Route, Outlet } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AdminHome, AdminUsers, AdminAttendance } from "../pages";

const PrivateRoutes = () => {
  return (
    <PrivateRoute>
      <Routes>
        <Route path="inicio" element={<AdminHome />} />
        <Route path="usuarios" element={<AdminUsers />} />
        <Route path="asistencia" element={<AdminAttendance />} />
      </Routes>
      <Outlet />
    </PrivateRoute>
  );
};

export default PrivateRoutes;
