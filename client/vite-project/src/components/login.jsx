import React, { useState } from "react";
import { LoginUser } from "../api/auth";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div id="loginform">
      <h2>Login!</h2>
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            const token = await LoginUser(username, password);
            setToken(token);
            localStorage.setItem("token", token);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <div id="login-inputs">
          <input
            type="text"
            id="User-login"
            value={username}
            placeholder="username"
            onChange={(event) => setUsername(event.target.value)}
          ></input>
          <input
            type="text"
            id="Password-login"
            value={password}
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <button id="button-login" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
