import React from "react";
import { useState } from "react";
import { registerUser } from "../api/auth";

const Register = ({setToken}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <h2>Register!</h2>
            <form onSubmit={async (event) => {
                try {
                    event.preventDefault();
                    const token = await registerUser(username, password);
                    setToken(token);
                    localStorage.setItem("token", token);
                    console.log("this is token in register", token);
                } catch (error) {
                    console.error(error);
                }
            }}>
                <input type="text" id="User" value={username} placeholder="username" onChange={(event) => setUsername(event.target.value)}></input>
                <input type="text" id="Password" value={password} placeholder="password" onChange={(event) => setPassword(event.target.value)}></input>
                <button id="button" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Register;