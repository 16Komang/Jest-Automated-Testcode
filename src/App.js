import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/websitereact/Home';
import Login from './components/websitereact/Login';
import Calculator from './components/websitereact/Calculator';
import Todolist from './components/websitereact/Todolist';
import Navbar from './components/websitereact/Navbar';
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Todolist" element={<Todolist />} />
        <Route path="/Calculator" element={<Calculator />} />
        <Route path="/Navbar" element={<Navbar />} />
      </Routes>
    </Router>
  );
};

export default App;
