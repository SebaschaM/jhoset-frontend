import { useEffect, useState } from "react";
import useQR from "../hook/useQR";

export const MainQR = () => {
  const { handleGetQRImage, handleGetTokenAuth } = useQR();
  const [imageQR, setImageQR] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true); // Nuevo estado para controlar el loading

  const onGetQRImage = async () => {
    setIsLoading(true);
    const { qrCode } = await handleGetQRImage();
    setImageQR(qrCode);
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetTokenAuth();
    onGetQRImage(); // Combinar el efecto en uno solo para mayor claridad
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h1 className="mb-6 text-2xl font-semibold text-center text-gray-800">Acceso por Código QR</h1>
        <div className="flex justify-center items-center min-h-[300px]">
          {isLoading ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
              <p className="text-gray-500">Generando el código QR...</p>
            </div>
          ) : (
            <img
              src={imageQR}
              alt="QR Code"
              className="w-full h-auto transition-opacity duration-300 ease-in-out rounded-md"
            />
          )}
        </div>
      </div>
      <p className="mt-6 text-sm text-center text-gray-600">
        Escanea este código con tu dispositivo para obtener acceso.
      </p>
    </div>
  );
};
