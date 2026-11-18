import { TOKEN_KEY } from "../constants/auth";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

export const request = async (path, options = {}) => {
  const token = localStorage.getItem(TOKEN_KEY);

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error en la petición");
  }

  return data;
};