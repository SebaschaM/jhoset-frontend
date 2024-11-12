import useUser from "../../hook/useUser";

interface ModalDeactivateUserProps {
  userId: number | null;
  onClose: () => void;
  onUserDeactivated: () => void; // Nueva prop para actualizar la lista de usuarios
}

const ModalDeactivateUser = ({ userId, onClose, onUserDeactivated }: ModalDeactivateUserProps) => {
  const { handleDeactivateEmployee } = useUser();

  const onConfirmDeactivate = async () => {
    if (userId !== null) {
      const { statusCode, message } = await handleDeactivateEmployee(userId);
      console.log(statusCode, message);

      if (statusCode === 200) {
        // Actualizar la lista de usuarios
        onUserDeactivated();
        onClose(); // Cerrar el modal
      }

      alert(message);
    } else {
      alert("Error: ID de usuario no válido.");
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Desactivar Usuario</h2>
      <p className="mb-4">¿Deseas desactivar el usuario?</p>
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirmDeactivate}
          className="px-4 py-2 text-white bg-yellow-600 rounded hover:bg-yellow-700"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default ModalDeactivateUser;
