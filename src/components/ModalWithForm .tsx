import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import useUser from "../hook/useUser";

interface ModalWithFormProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

interface FormValues {
  dni: number;
}

export const ModalWithForm = ({
  isModalOpen,
  closeModal,
}: ModalWithFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { handleMarkAttendance } = useUser();

  useEffect(() => {
    if (isModalOpen) {
      // Cuando el modal está abierto, habilitamos el estado visible para animación
      setIsVisible(true);
    } else {
      // Si el modal se cierra, esperamos el tiempo de la animación para desmontar
      setTimeout(() => setIsVisible(false), 300); // 300ms coincide con la duración de la animación
    }
  }, [isModalOpen]);

  // Obtener la fecha y hora actual
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };

  const getCurrentHour = () => {
    const now = new Date();
    let hour = now.getHours(); // Obtiene la hora actual en formato 24 horas
    const isPM = hour >= 12; // Determina si es AM o PM
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // Convierte el formato de 24 horas a 12 horas (12 AM o PM es una excepción)
    const period = isPM ? "PM" : "AM"; // Determina si es AM o PM
    return `${formattedHour}:00 ${period}`; // Retorna la hora en formato 12 horas con 00 en minutos
  };

  // Actualizar la hora actual en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval); // Limpiar el intervalo cuando se desmonta el componente
  }, []);

  // Función para registrar la asistencia
  const onSubmit: SubmitHandler<FormValues> = async (dataForm) => {
    const body = {
      dni: Number(dataForm.dni),
      attendanceDate: getCurrentDateTime(),
      attendanceHour: getCurrentHour(),
    };

    setIsLoading(true);

    const { message, statusCode } = await handleMarkAttendance(
      body.dni.toString(),
      body.attendanceDate,
      body.attendanceHour
    );

    if (statusCode === 200 || 201) {
      closeModal();
    }
    alert(message);
    setIsLoading(false);
    reset();
  };

  return (
    isVisible && (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${
          isModalOpen ? "opacity-100" : "opacity-0"
        }`}
        style={{ backdropFilter: "blur(5px)" }} // Efecto de desenfoque en el fondo
      >
        <div
          className={`relative w-full max-w-md p-8 mx-4 bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${
            isModalOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-10 h-10 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
              <p className="text-gray-600">Validando asistencia...</p>
            </div>
          ) : (
            <>
              {/* Botón para cerrar el modal con una "X" */}
              <button
                title="Cerrar"
                onClick={closeModal}
                className="absolute p-2 text-gray-600 transition-colors duration-300 top-2 right-2 hover:text-gray-900"
              >
                <FaTimes size={15} />
              </button>

              <h2 className="mb-4 text-xl font-bold text-center text-gray-800">
                ¡Por favor, registra tu asistencia!
              </h2>

              {/* Formulario usando React Hook Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-gray-600">DNI</label>

                  <input
                    type="text"
                    maxLength={8}
                    minLength={8}
                    placeholder="Ingresa tu DNI"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.dni ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("dni", {
                      required: "El campo DNI es obligatorio.",
                      pattern: {
                        value: /^\d{8}$/,
                        message: "El DNI debe contener 8 dígitos.",
                      },
                    })}
                  />
                </div>
                {errors.dni && (
                  <p className="text-sm text-red-500">{errors.dni.message}</p>
                )}
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white transition duration-300 bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                  Registrar Asistencia
                </button>

                {/* Mostrar hora actual en tiempo real */}
                <div className="text-center text-gray-600">
                  <p>Hora actual:</p>
                  <p className="text-lg font-bold">{currentTime}</p>
                </div>
              </form>

              {/* Botón de cerrar */}
              <button
                onClick={closeModal}
                className="w-full px-4 py-2 mt-4 text-white transition duration-300 bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                Cerrar
              </button>
            </>
          )}
        </div>
      </div>
    )
  );
};
