import { attendanceApi } from "../api/attendanceApi";
import { handleApiError } from "../helpers/errorHandler";
import { CreateUserFormInputs, ModifyUserFormInputs } from "../interface/User";
import Cookies from "js-cookie";

const useUser = () => {
  const handleGetAllUsers = async () => {
    try {
      const response = await attendanceApi.get("/admin/list-users");
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  };

  const handleGetAllUsersActive = async () => {
    try {
      const response = await attendanceApi.get("/admin/list-users-active");
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  };

  const handleGetEmployee = async (user_id: number) => {
    try {
      const response = await attendanceApi.get(
        `/admin/get-employee/${user_id}`
      );
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  };

  const handleCreateEmployee = async (data: CreateUserFormInputs) => {
    try {
      const response = await attendanceApi.post("/admin/create-user", data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  };

  const handleDeleteEmployee = async (user_id: number) => {
    try {
      const response = await attendanceApi.delete(
        `/admin/delete-user/${user_id}`
      );
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  };

  const handleDeactivateEmployee = async (user_id: number) => {
    try {
      const response = await attendanceApi.put(`/admin/deactivate-user`, {
        user_id,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return handleApiError(error);
    }
  };

  const handleActivateEmployee = async (user_id: number) => {
    try {
      const response = await attendanceApi.put(`/admin/activate-user`, {
        user_id,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return handleApiError(error);
    }
  };

  const handleModifyEmployee = async (data: ModifyUserFormInputs) => {
    try {
      const response = await attendanceApi.put(`/admin/update-user`, data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  };

  const handleMarkAttendance = async (dni: string, attendanceDate: string, attendanceHour: string) => {
    try {
      const token = Cookies.get("authTokenQR");

      const response = await attendanceApi.post(
        "/user/mark-attendance",
        {
          dni,
          attendanceDate,
          attendanceHour,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  };

  const handleGetShifts = async () => {
    try {
      const response = await attendanceApi.get("/user/shifts");
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  };

  const handleAssignShift = async (shift_id: number, user_id: number) => {
    try {
      const response = await attendanceApi.post("/user/assign-shift", {
        shift_id,
        user_id
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  const handleGetHistoryAttendance = async (user_id: number) => {
    try {
      const response = await attendanceApi.get(`/user/attendance-history/${user_id}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  return {
    handleGetAllUsers,
    handleGetEmployee,
    handleCreateEmployee,
    handleDeleteEmployee,
    handleDeactivateEmployee,
    handleActivateEmployee,
    handleModifyEmployee,
    handleGetAllUsersActive,
    handleGetShifts,
    handleMarkAttendance,
    handleAssignShift,
    handleGetHistoryAttendance
  };
};

export default useUser;
