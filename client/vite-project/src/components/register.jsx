import React from "react";
import { useState } from "react";
import { registerUser } from "../api/auth";

const Register = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div id="registerform">
      <h2>Register!</h2>
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            const token = await registerUser(username, password);
            setToken(token);
            localStorage.setItem("token", token);
            console.log("this is token in register", token);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <div id="inputs">
          <input
            type="text"
            id="Userreg"
            value={username}
            placeholder="username"
            onChange={(event) => setUsername(event.target.value)}
          ></input>
          <input
            type="text"
            id="Passwordreg"
            value={password}
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <button id="buttonreg" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
