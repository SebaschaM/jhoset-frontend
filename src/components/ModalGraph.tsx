import { ReactNode } from "react";

interface ModalGraphProps {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
}

export const ModalGraph = ({
  isOpen,
  closeModal,
  children,
}: ModalGraphProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-5xl p-6 bg-white rounded-lg shadow-lg">
        {/* Botón "X" en la esquina superior derecha */}
        <button
          className="absolute text-2xl text-gray-600 top-3 right-4 hover:text-gray-900 focus:outline-none"
          onClick={closeModal}
        >
          &times;
        </button>
        <div className="mt-4 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
