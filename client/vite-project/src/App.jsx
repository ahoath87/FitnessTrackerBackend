import React, { useState } from 'react';
import './App.css'
import { Register } from './components/index';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div>
    <h1>Fitness Tracker</h1>
    <Register setToken={setToken}></Register>
    </div>
  )
}

export default App
