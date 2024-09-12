import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import useAuth from "../../hook/useAuth";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
}

export const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const response = await handleLogin(data.username, data.password);

    if (response) {
      navigate("/admin/inicio");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="relative hidden bg-center bg-cover lg:flex lg:w-1/2"
        style={{
          backgroundImage:
            'url("https://s39940.pcdn.co/wp-content/uploads/2023/01/iStock-1383963898.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="flex items-center justify-center w-full bg-gray-100 lg:w-1/2">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
          <div className="flex justify-center">
            <img
              className="w-auto h-24"
              src="https://devioz.com/images/Logo.webp"
              alt="Devioz Logo"
            />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Iniciar sesión en tu cuenta
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Bienvenido de nuevo, por favor ingresa tus credenciales
          </p>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="username" className="sr-only">
                  Nombre de usuario
                </label>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Nombre de usuario"
                  {...register("username", {
                    required: "El nombre de usuario es obligatorio",
                  })}
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                {errors.username && (
                  <p className="text-sm text-red-500">
                    {String(errors.username.message)}
                  </p>
                )}
              </div>

              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Contraseña"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                  })}
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                <div
                  className="absolute inset-y-0 right-0 z-20 flex items-center px-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {String(errors.password.message)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Recordarme
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
