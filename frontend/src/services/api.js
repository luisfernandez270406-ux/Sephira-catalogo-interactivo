const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

export const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error en la petición");
  }

  return data;
};