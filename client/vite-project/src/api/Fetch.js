const API_URL = "http://localhost:5000/api";

export const publicRoutines = async () => {
  try {
    const response = await fetch(`${API_URL}/routines`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const myRoutines = async (token, username) => {
  try {
    const response = await fetch(`${API_URL}/users/${username}/routines`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const routines = await response.json();

    return routines;
  } catch (error) {
    console.error(error);
  }
};
