import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authpage from "./pages/Authpage";
import Home from "./pages/Home";
import Meeting from "./pages/Meeting"
import Dashboard from "./pages/Dashboard"
import Test from "./pages/Test";
import './index.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/h" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/test" element={<Test />} /> 
        <Route path="/" element={<Authpage/>} />
        <Route path="/Meeting" element={<Meeting/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
