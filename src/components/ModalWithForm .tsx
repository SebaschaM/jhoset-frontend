import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { GoSearch } from "react-icons/go";

interface ModalWithFormProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

interface FormValues {
  dni: string;
  name: string;
}

export const ModalWithForm = ({ isModalOpen, closeModal }: ModalWithFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    getValues, // Añadimos el tipo de getValues
  } = useForm<FormValues>(); // Definir el tipo de datos para useForm
  const [nameDNI, setNameDNI] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");

  // Actualizar la hora actual en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval); // Limpiar el intervalo cuando se desmonta el componente
  }, []);

  // Función para buscar el nombre según el DNI
  const handleSearchDNI = (dni: string) => {
    // Simular una búsqueda en la base de datos o llamada a una API
    if (dni === "12345678") {
      setNameDNI("Juan Pérez");
      setValue("name", "Juan Pérez"); // Establecer el valor del campo de nombre
      clearErrors("name"); // Limpiar errores del nombre si los hay
    } else {
      setNameDNI("");
      setError("name", { type: "manual", message: "DNI no encontrado" });
    }
  };

  // Función para registrar la asistencia
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Datos del formulario:", data);
    closeModal(); // Cerrar el modal después de registrar la asistencia
  };

  return (
    isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="max-w-md p-8 mx-auto bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-center">
            ¡Asistencia marcada correctamente!
          </h2>

          {/* Formulario usando React Hook Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center">
              {/* Input de DNI */}
              <input
                type="text"
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
              <button
                type="button"
                title="Buscar DNI"
                className="p-2 ml-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
                onClick={() => handleSearchDNI(getValues("dni"))} // Buscar nombre
              >
                <GoSearch />
              </button>
            </div>
            {errors.dni && (
              <p className="text-sm text-red-500">{errors.dni.message}</p>
            )}

            {/* Campo de Nombre (se muestra después de buscar el DNI) */}
            <div className="flex flex-col">
              <label className="text-gray-600">Nombre</label>
              <input
                type="text"
                {...register("name")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Botón para registrar asistencia */}
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
        </div>
      </div>
    )
  );
};
