import { useEffect, useState } from "react";
import useUser from "../../hook/useUser";
import { useForm } from "react-hook-form";
import { Shift } from "../../interface/User";

interface ModalEditShiftProps {
  userId: number;
  shiftId: number;
  onClose: () => void;
  onUserEdited: () => void; // Agrega la función de refresco como prop
}

interface FormValues {
  shift: string;
}

const ModalEditShift = ({
  userId,
  onClose,
  shiftId,
  onUserEdited,
}: ModalEditShiftProps) => {
  const { handleGetShifts, handleAssignShift } = useUser();
  const [shifts, setShifts] = useState<Shift[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const selectedShiftId = parseInt(data.shift);
    await handleAssignShift(selectedShiftId, userId);

    onUserEdited();

    onClose();
  };

  const onGetShifts = async () => {
    const { data } = await handleGetShifts();
    setShifts(data);
  };

  useEffect(() => {
    onGetShifts();
  }, []);

  useEffect(() => {
    if (shifts.length > 0) {
      if (
        shiftId !== -1 &&
        shifts.some((shift) => shift.shift_id === shiftId)
      ) {
        setValue("shift", shiftId.toString());
      } else {
        setValue("shift", "");
      }
    }
  }, [shiftId, shifts, setValue]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Editar turno</h2>
        <p>Seleccionar el turno para el empleado</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="shift"
            >
              Seleccionar turno
            </label>

            <select
              id="shift"
              {...register("shift", { required: "Selecciona un turno" })}
              className={`w-full px-3 py-2 border ${
                errors.shift ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring focus:ring-indigo-200`}
            >
              <option value="">Selecciona un turno...</option>
              {shifts.map((shift) => (
                <option key={shift.shift_id} value={shift.shift_id.toString()}>
                  {shift.shift_start} - {shift.shift_end}
                </option>
              ))}
            </select>

            {errors.shift && (
              <p className="mt-2 text-sm text-red-600">
                {String(errors.shift.message)}
              </p>
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
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditShift;
