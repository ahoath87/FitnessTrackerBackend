import React, {useState} from "react";
import { LoginUser } from "../api/auth";

const Login = ({setToken}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <h2>Login!</h2>
            <form onSubmit={async (event) => {
                try {
                    event.preventDefault();
                    const token = await LoginUser(username, password);
                    setToken(token);
                    localStorage.setItem("token", token);
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

export default Login;