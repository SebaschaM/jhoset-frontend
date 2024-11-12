import { AdminLayout } from "../../layout/AdminLayout";
import useUser from "../../hook/useUser";
import { useEffect, useState } from "react";
import ModalEditAttendance from "../../components/modals/ModalEditShift";
import ModalViewAttendance from "../../components/modals/ModalViewAttendance";

interface User {
  user_id: number;
  name: string;
  last_name: string;
  username: string;
  email: string;
  shift_id: number | null; // shift_id puede ser null si no tiene horario definido
}

export const AdminAttendance = () => {
  const { handleGetAllUsersActive } = useUser();
  const [usersActive, setUsersActive] = useState<User[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedShiftId, setSelectedShiftId] = useState<number | null>(null);

  const onGetAllUsersActive = async () => {
    const { data } = await handleGetAllUsersActive();
    setUsersActive(data);
  };

  useEffect(() => {
    onGetAllUsersActive();
  }, []);

  const openEditModal = (userId: number, shiftId: number | null) => {
    setSelectedUserId(userId);
    setSelectedShiftId(shiftId ?? -1);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUserId(null);
    setSelectedShiftId(null);
  };

  const openViewModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedUserId(null);
    setSelectedShiftId(null);
  };

  const tableHeaders = [
    "#",
    "Nombre",
    "Apellido",
    "Username",
    "Email",
    "Horario Definido",
    "Acciones asistencia",
  ];

  return (
    <AdminLayout>
      <h1 className="mb-4 text-3xl font-bold text-gray-800">
        Panel de asistencia
      </h1>

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
            {usersActive.map((user, index) => (
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
                  {user.shift_id ? (
                    <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                      Definido
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
                      No Definido
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 border-b">
                  <button
                    onClick={() => openEditModal(user.user_id, user.shift_id)}
                    className="px-2 py-1 mr-2 text-sm text-white bg-indigo-600 rounded-md"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => openViewModal(user.user_id)}
                    className="px-2 py-1 text-sm text-white bg-red-600 rounded-md"
                  >
                    Historial
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditModalOpen &&
        selectedUserId !== null &&
        selectedShiftId !== null && (
          <ModalEditAttendance
            shiftId={selectedShiftId}
            userId={selectedUserId}
            onClose={closeEditModal}
            onUserEdited={onGetAllUsersActive} // Pasa la función de refresco
          />
        )}

      {isViewModalOpen && selectedUserId !== null && (
        <ModalViewAttendance userId={selectedUserId} onClose={closeViewModal} />
      )}
    </AdminLayout>
  );
};
