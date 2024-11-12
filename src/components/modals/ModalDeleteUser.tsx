import useUser from "../../hook/useUser";

interface ModalDeleteUserProps {
  userId: number | null;
  onClose: () => void;
  onUserDeleted: () => void; // Nueva prop para actualizar la lista de usuarios
}

const ModalDeleteUser = ({ userId, onClose, onUserDeleted }: ModalDeleteUserProps) => {
  const { handleDeleteEmployee } = useUser();

  const onConfirmDelete = async () => {
    if (userId !== null) {
      const { statusCode, message } = await handleDeleteEmployee(userId);
    

      if (statusCode === 200) {
        // Llamar a la función para actualizar la lista de usuarios
        onUserDeleted();
        onClose();
      }

      alert(message);
    } else {
      alert("Error: ID de usuario no válido.");
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Eliminar Usuario</h2>
      <p className="mb-4">
        ¿Estás seguro de que deseas eliminar al usuario con ID: {userId}?
      </p>
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirmDelete}
          className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default ModalDeleteUser;
