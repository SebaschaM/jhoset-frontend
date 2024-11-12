import { useState } from "react";
import { QrScannerComponent } from "../components";
import useQR from "../hook/useQR";
import { ModalWithForm } from "../components/ModalWithForm ";

export const Home = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [validationResult, setValidationResult] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleValidateQR } = useQR();

  // Función para manejar el escaneo del QR
  const handleStartScan = () => {
    // Obtener la hora actual
    const currentHour = new Date().getHours();
    console.log(currentHour);
    // Validar si la hora está entre las 6 AM (06:00) y 6 PM (18:00)
    if (currentHour >= 1 && currentHour < 18) {
      setShowScanner(true);
    } else {
      // Mostrar mensaje de error si está fuera del rango
      alert("Fuera de horario.");
      
      // Hacer que el mensaje desaparezca después de 3 segundos
      setTimeout(() => {
        setValidationResult(null);
      }, 3000);
    }
  };

  // Función para manejar el resultado del escaneo
  const handleScanResult = async () => {
    setShowScanner(false);

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

    // Hacer que el mensaje desaparezca después de 2 segundos
    setTimeout(() => {
      setValidationResult(null);
    }, 2000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-lg p-8 transition-all duration-300 ease-in-out bg-white rounded-lg shadow-lg">
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
            className="w-full py-3 text-lg font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
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
          <p className="mt-4 text-lg font-bold text-center text-green-500 transition-opacity duration-500 ease-in-out">
            {validationResult}
          </p>
        )}
      </div>

      <ModalWithForm isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};
