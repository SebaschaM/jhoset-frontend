import { useEffect, useState } from "react";
import useQR from "../hook/useQR";

export const MainQR = () => {
  const { handleGetQRImage, handleGetTokenAuth } = useQR();
  const [imageQR, setImageQR] = useState<string>("");

  const onGetQRImage = async () => {
    const {qrCode} = await handleGetQRImage();
    setImageQR(qrCode);
  };

  useEffect(() => {
    handleGetTokenAuth(); 
  }, []);

  useEffect(() => {
    onGetQRImage();
  }, []);

  return (
    <div>
      <h1>QR</h1>
      {imageQR ? (
        <img src={imageQR} alt="QR Code" />
      ) : (
        <p>Cargando el código QR...</p>
      )}
    </div>
  );
};
