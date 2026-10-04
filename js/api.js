const API_URL = "https://fakestoreapi.noksha.dev/api/products";

export const getProducts = async () => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const { data } = await response.json();

        console.log("Productos cargados:", data);

        return data;

    } catch (error) {
        console.error("Error al cargar los productos:", error);

        throw error;
    }
};
