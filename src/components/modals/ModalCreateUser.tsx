import { useForm, SubmitHandler } from "react-hook-form";
import useUser from "../../hook/useUser";
import { CreateUserFormInputs } from "../../interface/User";

interface ModalCreateUserProps {
  onClose: () => void;
  onUserCreated: () => void;
}

const ModalCreateUser = ({ onClose, onUserCreated }: ModalCreateUserProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormInputs>();
  const { handleCreateEmployee } = useUser();

  const onFormSubmit: SubmitHandler<CreateUserFormInputs> = async (data) => {
    const { statusCode, message } = await handleCreateEmployee(data);

    if (statusCode === 201) {
      onUserCreated();
      onClose();
    }

    alert(message);
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Crear Usuario</h2>
      <p className="mb-4">Aquí puedes crear un nuevo usuario.</p>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Username</label>
          <input
            {...register("username", {
              required: "El username es obligatorio",
            })}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
            placeholder="Username"
          />
          {errors.username && (
            <span className="text-sm text-red-500">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "El formato del email es incorrecto",
              },
            })}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Contraseña</label>
          <input
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
            })}
            type="password"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
            placeholder="Contraseña"
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">DNI</label>
          <input
            {...register("dni", {
              required: "El DNI es obligatorio",
              minLength: {
                value: 8,
                message: "El DNI debe tener exactamente 8 caracteres",
              },
              maxLength: {
                value: 8,
                message: "El DNI debe tener exactamente 8 caracteres",
              },
              pattern: {
                value: /^[0-9]{8}$/,
                message: "El DNI debe contener solo números",
              },
              valueAsNumber: false,
            })}
            type="text"
            maxLength={8}
            minLength={8}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
            placeholder="DNI"
          />
          {errors.dni && (
            <span className="text-sm text-red-500">{errors.dni.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Nombre</label>
          <input
            {...register("name", { required: "El nombre es obligatorio" })}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
            placeholder="Nombre"
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Apellido</label>
          <input
            {...register("last_name", {
              required: "El apellido es obligatorio",
            })}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
            placeholder="Apellido"
          />
          {errors.last_name && (
            <span className="text-sm text-red-500">
              {errors.last_name.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Rol</label>
          <select
            {...register("role_id", {
              required: "El rol es obligatorio",
              valueAsNumber: true, // Convertir el valor a número
            })}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded"
          >
            <option value={2}>Rol de empleado</option>
            <option value={1}>Rol de administrador</option>
          </select>
          {errors.role_id && (
            <span className="text-sm text-red-500">
              {errors.role_id.message}
            </span>
          )}
        </div>

        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
          >
            Confirmar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalCreateUser;
