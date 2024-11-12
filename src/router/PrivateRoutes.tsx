import { Routes, Route, Outlet } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AdminHome, AdminUsers, AdminAttendance } from "../pages";

const PrivateRoutes = () => {
  return (
    <PrivateRoute>
      <Routes>
        <Route path="home" element={<AdminHome />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="attendance" element={<AdminAttendance />} />
      </Routes>
      <Outlet />
    </PrivateRoute>
  );
};

export default PrivateRoutes;
