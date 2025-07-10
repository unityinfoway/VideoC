import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authpage from "./pages/Authpage";
import Home from "./pages/Home";
import Template from "./pages/Template"
import Graphics from "./pages/Graphics"
import Contact from "./pages/Contact"
import Cartpage from "./pages/Cartpage"
import './index.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Authpage/>} />
        <Route path="/templates" element={<Template />} />
        <Route path="/Graphics" element={<Graphics />} />
        <Route path="/Contact" element={<Contact/>} />
        <Route path="/cart" element={<Cartpage/>} />


      </Routes>
    </Router>
  );
};

export default App;
