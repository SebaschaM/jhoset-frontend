import useUser from "../../hook/useUser";

interface ModalActivateUserProps {
  userId: number | null;
  onClose: () => void;
  onUserActivated: () => void; // Nueva prop para actualizar la lista de usuarios
}

const ModalActivateUser = ({
  userId,
  onClose,
  onUserActivated,
}: ModalActivateUserProps) => {
  const { handleActivateEmployee } = useUser();

  const onConfirmActivate = async () => {
    if (userId !== null) {
      const { statusCode, message } = await handleActivateEmployee(userId);
      console.log(statusCode, message);

      if (statusCode === 200) {
        // Actualizar la lista de usuarios
        onUserActivated();
        onClose(); // Cerrar el modal
      }

      alert(message);
    } else {
      alert("Error: ID de usuario no válido.");
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Activar Usuario</h2>
      <p className="mb-4">¿Deseas activar el usuario?</p>
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirmActivate}
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default ModalActivateUser;
