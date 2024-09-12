import React, { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QrScannerComponentProps {
  onScan: (message: string) => void;
}

export const QrScannerComponent = ({ onScan }: QrScannerComponentProps) => {
  const qrRef = useRef(null);
  const [error, setError] = React.useState(""); // Almacena errores
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null); // Referencia al objeto html5QrCode

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("qr-reader");
    html5QrCodeRef.current = html5QrCode;

    // Configuración para ajustar el tamaño del escáner de forma responsiva
    const config = {
      fps: 10,
      qrbox: function (viewfinderWidth: number, viewfinderHeight: number) {
        const minEdgePercentage = 0.6; // Ajuste del tamaño del cuadro al 60% del ancho
        const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
        return {
          width: minEdgeSize * minEdgePercentage,
          height: minEdgeSize * minEdgePercentage,
        };
      },
    };

    const startCamera = async () => {
      try {
        await html5QrCode.start(
          { facingMode: "environment" }, // Preferir la cámara trasera
          config,
          (decodedText) => {
            onScan(decodedText); // Llamar a la función onScan con el valor escaneado
            // Verificar si el escáner está en ejecución antes de detenerlo
            if (html5QrCode.isScanning) {
              html5QrCode
                .stop()
                .then(() => {
                  console.log("QR Code scanning stopped.");
                })
                .catch((err) => {
                  console.error("Failed to stop QR Code scanning.", err);
                });
            }
          },
          (errorMessage) => {
            console.error("QR Code no se pudo leer: ", errorMessage);
          }
        );
      } catch (err) {
        console.error("Unable to start QR Scanner", err);
        setError("Unable to access camera.");
      }
    };

    startCamera();

    return () => {
      if (html5QrCode.isScanning) {
        html5QrCode
          .stop()
          .then(() => {
            console.log("Cleaned up QR Code scanning.");
          })
          .catch((err) => {
            console.error("Failed to clean up QR Code scanning.", err);
          });
      }
    };
  }, [onScan]);

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b">
      {/* Contenedor del lector QR */}
      <div className="w-full max-w-sm overflow-hidden">
        <div id="qr-reader" style={{ width: "100%" }} ref={qrRef}></div>
      </div>

      {error && (
        <div className="p-4 mt-4 text-red-700 bg-red-100 rounded-lg shadow-md">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};
