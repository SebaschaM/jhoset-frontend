import { AdminLayout } from "../../layout/AdminLayout";
import useUser from "../../hook/useUser";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaBan, FaCheck } from "react-icons/fa";
import ModalCreateUser from "../../components/modals/ModalCreateUser";
import ModalEditUser from "../../components/modals/ModalEditUser";
import ModalDeleteUser from "../../components/modals/ModalDeleteUser";
import ModalDeactivateUser from "../../components/modals/ModalDeactivateUser";
import ModalActivateUser from "../../components/modals/ModalActivateUser";

interface User {
  user_id: number;
  name: string;
  last_name: string;
  username: string;
  email: string;
  isActive: boolean;
}

type ActionType = "create" | "edit" | "delete" | "deactivate" | "activate";

export const AdminUsers = () => {
  const { handleGetAllUsers } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [modalAction, setModalAction] = useState<ActionType>("create");

  const onGetAllUsers = async () => {
    const { data } = await handleGetAllUsers();
    setUsers(data);
    setFilteredUsers(data);
  };

  useEffect(() => {
    onGetAllUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      `${user.name} ${user.last_name} ${user.username} ${user.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  const openModal = (action: ActionType, userId: number | null = null) => {
    setModalAction(action);
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUserId(null);
    setIsModalOpen(false);
  };

  const onUserCreated = () => {
    // Actualizar la lista de usuarios
    onGetAllUsers();
  };

  const renderModal = () => {
    switch (modalAction) {
      case "edit":
        return (
          <ModalEditUser
            userId={selectedUserId}
            onClose={closeModal}
            onUserModified={onGetAllUsers}
          />
        );
      case "delete":
        return (
          <ModalDeleteUser
            userId={selectedUserId}
            onClose={closeModal}
            onUserDeleted={onGetAllUsers} // Actualizar la lista de usuarios
          />
        );
      case "deactivate":
        return (
          <ModalDeactivateUser
            userId={selectedUserId}
            onClose={closeModal}
            onUserDeactivated={onGetAllUsers} // Actualizar la lista de usuarios
          />
        );
      case "activate":
        return (
          <ModalActivateUser
            userId={selectedUserId}
            onClose={closeModal}
            onUserActivated={onGetAllUsers} // Actualizar la lista de usuarios
          />
        );
      case "create":
      default:
        return (
          <ModalCreateUser onClose={closeModal} onUserCreated={onUserCreated} />
        );
    }
  };

  // Encabezados de la tabla
  const tableHeaders = [
    "#",
    "Nombre",
    "Apellido",
    "Username",
    "Email",
    "Estado",
    "Acciones",
  ];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Lista de Usuarios</h1>
        <button
          onClick={() => openModal("create")}
          className="px-4 py-2 text-white transition-all duration-200 ease-in-out bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700"
        >
          Crear Usuario
        </button>
      </div>

      {/* Barra de búsqueda */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar usuario..."
        className="w-full px-4 py-2 mb-6 transition-all border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-sm font-semibold text-left text-gray-700 border-b"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user.user_id}
                className="transition-colors duration-150 hover:bg-gray-100"
              >
                <td className="px-6 py-4 text-sm text-gray-700 border-b">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">
                  {user.last_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">
                  {user.username}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">
                  {user.isActive ? (
                    <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                      Activo
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
                      Inactivo
                    </span>
                  )}
                </td>
                <td className="flex px-6 py-4 space-x-2 text-sm text-gray-700 border-b">
                  <button
                    title="Editar"
                    onClick={() => openModal("edit", user.user_id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    title="Eliminar"
                    onClick={() => openModal("delete", user.user_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                  <button
                    title="Desactivar"
                    onClick={() => openModal("deactivate", user.user_id)}
                    className={`text-yellow-500 hover:text-yellow-700`}
                    disabled={!user.isActive} // Deshabilitar si ya está inactivo
                  >
                    <FaBan
                      className={`${!user.isActive ? "text-black" : ""}`}
                    />
                  </button>
                  <button
                    title="Activar"
                    onClick={() => openModal("activate", user.user_id)}
                    className={`text-green-500 hover:text-green-700`}
                    disabled={user.isActive} // Deshabilitar si ya está activo
                  >
                    <FaCheck
                      className={`${user.isActive ? "text-black" : ""}`}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            {renderModal()}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
