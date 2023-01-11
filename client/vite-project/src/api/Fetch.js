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

export const createNewRoutine = async (token, name, goal, isPublic) => {
  try {
    const response = await fetch(`${API_URL}/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    });
    const newRoutine = await response.json();
    console.log("this is new ROutine", newRoutine);
    return newRoutine;
  } catch (error) {
    console.error(error);
  }
};

export const patchUpdateRoutine = async (token, routineToEdit, name, goal, isPublic) => {
  try {
    const response = await fetch(`${API_URL}/routines/${routineToEdit.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic
      })
    });
    const updatedRoutine = await response.json();
    console.log("this is updatedRoutine in fetch", updatedRoutine);
    return updatedRoutine
  } catch (error) {
    console.error(error);
  }
}

export const fetchDeleteRoutine = async (token, routineToDelete) => {
  try {
    const response = await fetch(`${API_URL}/routines/${routineToDelete.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    const routinesWithoutDeletedOne = await response.json();
    return routinesWithoutDeletedOne
  } catch (error) {
    console.error(error);
  }
}