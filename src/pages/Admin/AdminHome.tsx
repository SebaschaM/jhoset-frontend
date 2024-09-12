import React, { useState } from "react";
import { AdminLayout } from "../../layout/AdminLayout";
import { FaUser, FaChartLine, FaDollarSign, FaTasks } from "react-icons/fa";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { ModalGraph } from "../../components";

// Datos para los gráficos
const data = [
  { name: "Ene", value: 2400 },
  { name: "Feb", value: 1398 },
  { name: "Mar", value: 9800 },
  { name: "Abr", value: 3908 },
  { name: "May", value: 4800 },
  { name: "Jun", value: 3800 },
];

const quarterlyData = [
  { quarter: "Q1", earnings: 10000 },
  { quarter: "Q2", earnings: 15000 },
  { quarter: "Q3", earnings: 20000 },
  { quarter: "Q4", earnings: 25000 },
];

const pieData = [
  { name: "Activos", value: 400 },
  { name: "Inactivos", value: 300 },
  { name: "Pendientes", value: 300 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export const AdminHome = () => {
const [modalGraph, setModalGraph] = useState<string | null>(null);

  const openModal = (graph: string) => setModalGraph(graph);
  const closeModal = () => setModalGraph(null);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold">Dashboard de Administración</h1>

        {/* Tarjetas */}
        <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Tarjeta 1 */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
            <FaUser className="text-3xl text-blue-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Usuarios Activos</p>
              <p className="text-lg font-semibold">1200</p>
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
            <FaChartLine className="text-3xl text-green-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Visitas Mensuales</p>
              <p className="text-lg font-semibold">8,000</p>
            </div>
          </div>

          {/* Tarjeta 3 */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
            <FaDollarSign className="text-3xl text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Ingresos Totales</p>
              <p className="text-lg font-semibold">$25,000</p>
            </div>
          </div>

          {/* Tarjeta 4 */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
            <FaTasks className="text-3xl text-red-500" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Tareas Pendientes</p>
              <p className="text-lg font-semibold">45</p>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {/* Gráfico de líneas */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-lg font-semibold">
              Tendencia de Usuarios
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={data}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
            <button
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={() => openModal("line")}
            >
              Ver más
            </button>
          </div>

          {/* Gráfico de barras */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-lg font-semibold">Ingresos Mensuales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
            <button
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={() => openModal("bar")}
            >
              Ver más
            </button>
          </div>

          {/* Gráfico de torta */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-lg font-semibold">
              Usuarios Activos/Inactivos
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <button
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={() => openModal("pie")}
            >
              Ver más
            </button>
          </div>

          {/* Gráfico de área */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-lg font-semibold">
              Ganancias Trimestrales
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={quarterlyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
            <button
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={() => openModal("area")}
            >
              Ver más
            </button>
          </div>
        </div>

        {/* Modal para gráficos extendidos */}
        <ModalGraph isOpen={modalGraph !== null} closeModal={closeModal}>
          {modalGraph === "line" && (
            <>
              <h2 className="mb-4 text-lg font-semibold">
                Tendencia de Usuarios - Vista Extendida
              </h2>
              <ResponsiveContainer width="100%" height={500}>
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </>
          )}

          {modalGraph === "bar" && (
            <>
              <h2 className="mb-4 text-lg font-semibold">
                Ingresos Mensuales - Vista Extendida
              </h2>
              <ResponsiveContainer width="100%" height={500}>
                <BarChart
                  data={data}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}

          {modalGraph === "pie" && (
            <>
              <h2 className="mb-4 text-lg font-semibold">
                Usuarios Activos/Inactivos - Vista Extendida
              </h2>
              <ResponsiveContainer width="100%" height={500}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={200}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </>
          )}

          {modalGraph === "area" && (
            <>
              <h2 className="mb-4 text-lg font-semibold">
                Ganancias Trimestrales - Vista Extendida
              </h2>
              <ResponsiveContainer width="100%" height={500}>
                <AreaChart
                  data={quarterlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="earnings"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </>
          )}
        </ModalGraph>
      </div>
    </AdminLayout>
  );
};
