import { useState } from "react";
import { QrScannerComponent } from "../components";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [showScanner, setShowScanner] = useState(false); // Estado para mostrar/ocultar el escáner
  const navigate = useNavigate(); // Hook para navegación interna

  const handleStartScan = () => {
    setShowScanner(true); // Mostrar el escáner cuando se hace clic en el botón
  };

  // Función que recibe el mensaje escaneado desde el componente QrScannerComponent
  const handleScanResult = (message: string) => {
    setShowScanner(false); // Ocultar el escáner después de escanear

    // Verificar si el mensaje es un enlace
    if (message.startsWith("http://") || message.startsWith("https://")) {
      // Si es una URL externa, redirigir fuera de la aplicación
      window.location.href = message;
    } else {
      // Si es una ruta interna, usar navigate
      navigate(message);
    }
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

        {/* Botón para iniciar el escaneo de QR */}
        {!showScanner && (
          <button
            onClick={handleStartScan}
            className="w-full py-3 text-lg font-semibold text-white transition-all duration-300 bg-gray-700 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-400"
          >
            Escanear Código QR
          </button>
        )}

        {/* Mostrar el componente de escaneo QR */}
        {showScanner && (
          <div className="mt-6 animate-fade-in">
            <QrScannerComponent onScan={handleScanResult} />
          </div>
        )}
      </div>
    </div>
  );
};
