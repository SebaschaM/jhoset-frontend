// Este archivo centraliza el manejo de errores
export const handleApiError = (error: any) => {
  if (error.response) {
    // El servidor respondió con un código de estado que está fuera del rango 2xx
    console.error("Error de respuesta:", error.response);
    return {
      message: error.response.data.message || "Error del servidor",
      status: error.response.status,
    };
  } else if (error.request) {
    // No se recibió respuesta del servidor
    console.error("No se recibió respuesta del servidor:", error.request);
    return {
      message:
        "No se recibió respuesta del servidor. Intenta de nuevo más tarde.",
      status: null,
    };
  } else {
    // Algo sucedió al configurar la solicitud que desencadenó un error
    console.error("Error al configurar la solicitud:", error.message);
    return {
      message: "Error inesperado. Por favor, intenta nuevamente.",
      status: null,
    };
  }
};
