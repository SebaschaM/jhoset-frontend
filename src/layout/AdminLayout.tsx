import { ReactNode, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Aside } from "../components";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Aside
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="relative flex-1 p-4 overflow-auto">
        <button
          title="Abrir menú lateral"
          className="fixed p-4 text-white bg-gray-800 rounded-full shadow-md lg:hidden bottom-4 left-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};
