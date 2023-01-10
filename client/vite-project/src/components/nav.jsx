import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

const Nav = () => {
    const logout = () => {
        localStorage.clear();
    }

    return (
        <header id="navbar">
            <h1>Fitness Tracker</h1>
            <div id="links">
                <div id="Home-link">
                    <Link to="/">Home</Link>
                </div>
                <div id="Register-link">
                    <Link to="/register">Register</Link>
                </div>
                <div id="Login-link">
                    <Link to="/login">Login</Link>
                </div>
                <div>
                    <Link to="/routines">Routines</Link>
                </div>
                <button onClick={logout}>Log Out</button>
            </div>
        </header>
    )
}

export default Nav;