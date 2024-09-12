import { FaHome, FaUsers, FaSignOutAlt, FaBusinessTime } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";

interface AsideProps {
  isOpen: boolean;
  onToggle: () => void;
}

// Módulos del Dashboard
const modules = [
  { name: "Inicio", icon: FaHome, path: "/admin/inicio" },
  { name: "Usuarios", icon: FaUsers, path: "/admin/usuarios" },
  { name: "Asistencia", icon: FaBusinessTime, path: "/admin/asistencia" },
];

export const Aside = ({ isOpen, onToggle }: AsideProps) => {
  const { handleAuthLogout } = useAuth();
  const location = useLocation(); // Obtener la ruta actual

  const onLogout = async () => {
    await handleAuthLogout();
  };

  return (
    <>
      {/* Overlay que oscurece la pantalla cuando el sidebar está abierto */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onToggle} // Al hacer clic en el overlay se cierra el menú
        ></div>
      )}

      <div
        className={`fixed inset-0 lg:relative lg:inset-auto bg-[#031019] text-white flex flex-col justify-between transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200 ease-in-out z-50 w-72`} // Ancho ajustado
      >
        {/* Cerrar sidebar en pantallas pequeñas */}
        <div className="flex justify-end p-4 lg:hidden">
          <button onClick={onToggle} className="text-2xl text-white">
            ×
          </button>
        </div>

        {/* Contenido del sidebar */}
        <div className="flex flex-col justify-between flex-1">
          {/* Logo */}
          <div className="flex flex-col items-center py-6 space-y-6">
            <img
              src="https://devioz.com/images/Logo.webp"
              alt="empresa"
              className="h-[6rem]"
            />

            {/* Recorrido dinámico por los módulos */}
            <div className="flex flex-col items-start w-full px-4 space-y-4">
              {modules.map((module, index) => {
                const Icon = module.icon;
                const isActive = location.pathname === module.path;

                return (
                  <Link
                    key={index}
                    to={module.path}
                    className={`flex items-center w-full py-2 px-4 rounded ${
                      isActive ? "bg-[#1F2937]" : "hover:bg-[#374151]"
                    }`}
                  >
                    <Icon />
                    <span className="ml-4">{module.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Información del usuario y cerrar sesión */}
          <div className="flex items-center justify-between p-6 gap-5 bg-[#1F2937] hover:bg-[#374151] transition-colors duration-200 ease-in-out">
            <div className="flex items-center gap-5">
              <img
                src="https://res.cloudinary.com/dvzjgzqbn/image/upload/v1720653918/rjsroyuxdsxk9gw3gtyw.jpg"
                alt="Profile"
                className="w-12 h-12 rounded-full" // Hacemos la imagen de perfil un poco más grande
              />
              <div className="ml-3">
                <p className="font-semibold uppercase">Username</p>
                <p className="text-sm text-gray-400 normal-case">user</p>
                <p className="text-sm text-gray-400">user@user.com</p>
              </div>
            </div>
            <button
              title="Cerrar sesión"
              onClick={onLogout}
              className="text-red-600 transition-colors duration-200 ease-in-out hover:text-red-800"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
