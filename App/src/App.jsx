import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authpage from "./pages/Authpage";
import Home from "./pages/Home";
import Template from "./pages/Template"
import Graphics from "./pages/Graphics"
import Contact from "./pages/Contact"
import Cartpage from "./pages/Cartpage"
import Checkout from "./pages/Checkout"
import Dashboard from "./pages/Dashboard"
import Test from "./pages/Test";
import './index.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Authpage/>} />
        <Route path="/templates" element={<Template />} />
        <Route path="/Graphics" element={<Graphics />} />
        <Route path="/Contact" element={<Contact/>} />
        <Route path="/cart" element={<Cartpage/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
