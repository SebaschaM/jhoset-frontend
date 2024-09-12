import { AdminLayout } from "../../layout/AdminLayout";  
import useUser from "../../hook/useUser";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaBan } from "react-icons/fa"; // Importamos los íconos necesarios

interface User {
  user_id: number;
  name: string;
  last_name: string;
  username: string;
  email: string;
  isActive: boolean;
}

export const AdminUsers = () => {
  const { handleGetAllUsers } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const onGetAllUsers = async () => {
    const { data } = await handleGetAllUsers();
    setUsers(data);
    setFilteredUsers(data); // Inicialmente los usuarios filtrados son todos los usuarios
  };

  useEffect(() => {
    onGetAllUsers();
  }, []);

  // Filtrar usuarios según la barra de búsqueda
  useEffect(() => {
    const filtered = users.filter((user) =>
      `${user.name} ${user.last_name} ${user.username} ${user.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  // Array de cabeceras para la tabla
  const headers = ["#", "ID", "Nombre", "Apellido", "Username", "Email", "Estado", "Acciones"];

  const openModal = (user: User | null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Lista de Usuarios</h1>
        <button 
          onClick={() => openModal(null)}
          className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
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
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-6 py-3 text-sm font-semibold text-left text-gray-700 border-b">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.user_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900 border-b">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-900 border-b">{user.user_id}</td>
                <td className="px-6 py-4 text-sm text-gray-900 border-b">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900 border-b">{user.last_name}</td>
                <td className="px-6 py-4 text-sm text-gray-900 border-b">{user.username}</td>
                <td className="px-6 py-4 text-sm text-gray-900 border-b">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-900 border-b">{user.isActive ? "Activo" : "Inactivo"}</td>
                <td className="flex px-6 py-4 space-x-2 text-sm text-gray-900 border-b">
                  <button
                    title="Editar"
                    onClick={() => openModal(user)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    title="Eliminar"
                    onClick={() => openModal(user)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                  <button
                    title="Bloquear"
                    onClick={() => openModal(user)}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    <FaBan />
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
            <h2 className="mb-4 text-xl font-bold">
              {selectedUser ? `Acción para: ${selectedUser.name}` : "Crear Usuario"}
            </h2>
            <p className="mb-4">
              {selectedUser
                ? `Puedes realizar acciones para el usuario ${selectedUser.username}.`
                : "Aquí puedes crear un nuevo usuario."}
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
