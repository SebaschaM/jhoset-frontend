import Cookies from "js-cookie";
import { attendanceApi } from "../api/attendanceApi";
import { handleApiError } from "../helpers/errorHandler";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await attendanceApi.post("/auth/login-user", {
        username,
        password,
      });

      const { token } = response.data;

      Cookies.set("token", token, { expires: 1 });

      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  };

  const handleAuthLogout = async () => {
    try {
      Cookies.remove("token");
      navigate("/login");
    } catch (error) {
      return handleApiError(error);
    }
  };

  return {
    handleLogin,
    handleAuthLogout,
  };
};

export default useAuth;
