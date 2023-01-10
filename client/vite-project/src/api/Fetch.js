const API_URL = "http://localhost:5000/api";

export const publicRoutines = async () => {
    try {
        const response = await fetch(`${API_URL}/routines`);
        const data = await response.json();
        console.log("this is data in fetch", data);
        return data;
    } catch (error) {
        console.error(error);
    }
};