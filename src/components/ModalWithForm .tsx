import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { GoSearch } from "react-icons/go";
import { FaTimes } from "react-icons/fa"; // Importar el icono de la "X"
import useUser from "../hook/useUser";

interface ModalWithFormProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

interface FormValues {
  dni: number;
  name: string;
}

export const ModalWithForm = ({
  isModalOpen,
  closeModal,
}: ModalWithFormProps) => {
  const { handleVerifyDNIUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>(); // Definir el tipo de datos para useForm
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString(); // Formato ISO (e.g., 2024-10-06T19:30:00.000Z)
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
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const body = {
      dni: Number(data.dni),
      attendanceDate: getCurrentDateTime(),
    };

    console.log(body);

    /*setIsLoading(true);
    const { message } = await handleVerifyDNIUser(dni);
    alert(message);
    setIsLoading(false);
    closeModal();*/
  };

  return (
    isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative max-w-md p-8 mx-auto bg-white rounded-lg shadow-lg">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-10 h-10 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
              <p>Validando asistencia...</p>
            </div>
          ) : (
            <>
              {/* Botón para cerrar el modal con una "X" */}
              <button
                title="Cerrar"
                onClick={closeModal}
                className="absolute p-2 text-gray-600 top-2 right-2 hover:text-gray-900"
              >
                <FaTimes size={15} />
              </button>

              <h2 className="mb-4 text-xl font-bold text-center">
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
                  className="w-full px-4 py-2 text-white transition bg-green-600 rounded-lg hover:bg-green-700"
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
                className="w-full px-4 py-2 mt-4 text-white bg-gray-600 rounded-lg hover:bg-gray-700"
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
