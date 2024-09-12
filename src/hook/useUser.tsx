import { attendanceApi } from "../api/attendanceApi";
import { handleApiError } from "../helpers/errorHandler";

const useUser = () => {
  const handleGetAllUsers = async () => {
    try {
      const response = await attendanceApi.get("/admin/list-users");
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  };

  return {
    handleGetAllUsers,
  };
};

export default useUser;
