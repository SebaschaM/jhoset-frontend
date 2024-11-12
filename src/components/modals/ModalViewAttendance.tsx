import { useEffect, useState } from "react";
import useUser from "../../hook/useUser";

interface ModalViewAttendanceProps {
  userId: number;
  onClose: () => void;
}

const ModalViewAttendance = ({ userId, onClose }: ModalViewAttendanceProps) => {
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const { handleGetHistoryAttendance } = useUser();

  const fetchAttendance = async () => {
    const { data } = await handleGetHistoryAttendance(userId);
    setAttendanceData(data);
  };

  useEffect(() => {
    fetchAttendance();
  }, [userId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-xl font-bold text-gray-800">
          Historial de asistencias
        </h2>
        {attendanceData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-left text-gray-700 border-b border-gray-300">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-left text-gray-700 border-b border-gray-300">
                    Hora de Entrada
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-left text-gray-700 border-b border-gray-300">
                    Hora de Salida
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-left text-gray-700 border-b border-gray-300">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((attendance, index) => (
                  <tr key={index} className="transition-colors hover:bg-gray-100">
                    <td className="px-6 py-4 text-sm text-gray-800 border-b border-gray-300">
                      {attendance.date_marked}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 border-b border-gray-300">
                      {attendance.check_in_time || "No registrado"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 border-b border-gray-300">
                      {attendance.check_out_time || "No registrado"}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 border-b border-gray-300">
                      {attendance.attendanceStatus_id === 3 ? (
                        <span className="px-2 py-1 text-green-700 bg-green-100 rounded-full">
                          Presente
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-red-700 bg-red-100 rounded-full">
                          Ausente
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No se encontraron asistencias.</p>
        )}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalViewAttendance;
