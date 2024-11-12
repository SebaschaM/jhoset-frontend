import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useUser from "../../hook/useUser";
import { ModifyUserFormInputs } from "../../interface/User";
import { Role } from "../../enum/Role.enum";

interface ModalEditUserProps {
  userId: number | null;
  onClose: () => void;
  onUserModified: () => void;
}

const ModalEditUser = ({ userId, onClose, onUserModified }: ModalEditUserProps) => {
  const { handleModifyEmployee, handleGetEmployee } = useUser();
  const { register, handleSubmit, setValue, reset } =
    useForm<ModifyUserFormInputs>();

  const onGetEmployee = async (userId: number) => {
    const { data } = await handleGetEmployee(userId);

    if (data) {
      // Rellenar el formulario con los datos del usuario obtenidos
      setValue("user_id", data.user_id);
      setValue("username", data.username);
      setValue("email", data.email);
      setValue("dni", data.dni);
      setValue("name", data.name);
      setValue("last_name", data.last_name);
      setValue("role_id", data.role_id);
    }
  };

  useEffect(() => {
    if (userId) {
      onGetEmployee(userId);
    }
  }, [userId]);

  const onSubmit = async (formData: ModifyUserFormInputs) => {
    try {
      const { statusCode, message } = await handleModifyEmployee(formData);

      if (statusCode === 200) {
        onUserModified(); // Actualiza la lista de usuarios
      }

      alert(message);

      reset();
      onClose();
    } catch (error) {
      console.error("Error al modificar usuario:", error);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Editar Usuario</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Nombre de Usuario</label>
          <input
            {...register("username", { required: true })}
            className="w-full px-3 py-2 border rounded"
            type="text"
            placeholder="Nombre de usuario"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">
            Correo Electrónico
          </label>
          <input
            {...register("email", { required: true })}
            className="w-full px-3 py-2 border rounded"
            type="email"
            placeholder="Correo electrónico"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">DNI</label>
          <input
            {...register("dni", { required: true, valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded"
            type="number"
            placeholder="DNI"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Nombre</label>
          <input
            {...register("name", { required: true })}
            className="w-full px-3 py-2 border rounded"
            type="text"
            placeholder="Nombre"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Apellido</label>
          <input
            {...register("last_name", { required: true })}
            className="w-full px-3 py-2 border rounded"
            type="text"
            placeholder="Apellido"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Rol</label>
          <select
            {...register("role_id", { required: true })}
            className="w-full px-3 py-2 border rounded"
          >
            <option value={Role.EMPLOYEE}>Empleado</option>
            {/* <option value={Role.MANAGER}>Manager</option> */}
          </select>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            type="button"
            onClick={onClose}
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

export default ModalEditUser;
