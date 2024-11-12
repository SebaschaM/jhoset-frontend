import { attendanceApi } from "../api/attendanceApi";
import { handleApiError } from "../helpers/errorHandler";
import Cookies from "js-cookie";

const useQR = () => {
  const handleGetTokenAuth = async () => {
    try {
      const response = await attendanceApi.get(`/qr/generate-token-auth`);

      const token = response.headers["x-qr-token"];

      if (token) {
        Cookies.set("authTokenQR", token, { expires: 1 / 24, secure: true }); // 1 hora
      }

      return {};
    } catch (error) {
      return handleApiError(error);
    }
  };

  const handleGetQRImage = async () => {
    try {
      // Obtener el token de las cookies
      const token = Cookies.get("authTokenQR");

      const { data } = await attendanceApi.get(`/qr/generate-qr`, {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar el token a la cabecera
        },
      });

      return data.data;
    } catch (error) {
      return handleApiError(error);
    }
  };

  const handleValidateQR = async () => {
    try {
      // Obtener el token de las cookies
      const token = Cookies.get("authTokenQR");

      const { data } = await attendanceApi.get(`/qr/validate-qr`, {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar el token a la cabecera
        },
      });

      return data;
    } catch (error) {
      return handleApiError(error);
    }
  };

  return {
    handleGetTokenAuth,
    handleGetQRImage,
    handleValidateQR,
  };
};

export default useQR;
