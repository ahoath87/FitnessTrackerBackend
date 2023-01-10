import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id="home">
      <h2> Welcome to Fitness Tracker! </h2>
      <div id="login-button">
        <p> Login Here!</p>
        <button>
          <Link to="/login">Login</Link>
        </button>
      </div>
      <div id="register-button">
        <p>Dont have an account? Register Here!</p>
        <button>
          <Link to="/register">Register</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
