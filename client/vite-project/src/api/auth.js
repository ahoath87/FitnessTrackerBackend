const API_URL = "http://localhost:5000/api"

export const registerUser = async (username, password) => {
    try {
        const response = await
            fetch(`${API_URL}/users/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        username,
                        password,
                    },
                }),
            }
            );
            const {data: {token},} = await response.json();
            console.log("this is token in registerUser", token);
            return token;
    } catch (error) {
        console.error(error)
    }
}