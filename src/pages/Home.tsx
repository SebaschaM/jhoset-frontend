import { useState } from "react";
import { QrScannerComponent } from "../components";
import useQR from "../hook/useQR";
import { ModalWithForm } from "../components/ModalWithForm ";

export const Home = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [validationResult, setValidationResult] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(true); // Estado para controlar el modal
  const { handleValidateQR } = useQR();
  ///MODAL

  const handleStartScan = () => {
    setShowScanner(true);
  };

  const handleScanResult = async (message: string) => {
    setShowScanner(false);

    console.log("QR escaneado:", message); // Verifica qué valor tiene el QR escaneado

    try {
      const { statusCode } = await handleValidateQR();

      if (statusCode === 200) {
        setValidationResult("QR validado correctamente.");
        setIsModalOpen(true); // Mostrar el modal si la validación es exitosa
      } else {
        setValidationResult("No se pudo marcar la asistencia.");
      }
    } catch (error) {
      setValidationResult("Ocurrió un error al validar el QR.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Marca tu asistencia
        </h1>
        <p className="mb-6 text-center text-gray-500">
          Para marcar tu asistencia, escanea el siguiente código QR utilizando
          la cámara de tu dispositivo.
        </p>

        {!showScanner && (
          <button
            onClick={handleStartScan}
            className="w-full py-3 text-lg font-semibold text-white transition-all duration-300 bg-gray-700 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-400"
          >
            Escanear Código QR
          </button>
        )}

        {showScanner && (
          <div className="mt-6 animate-fade-in">
            <QrScannerComponent onScan={handleScanResult} />
          </div>
        )}

        {validationResult && (
          <p className="mt-4 text-lg font-bold text-center text-green-500">
            {validationResult}
          </p>
        )}
      </div>

      <ModalWithForm isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};
