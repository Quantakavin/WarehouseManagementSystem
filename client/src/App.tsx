import React from "react";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPageLogin";
import Dashboard from "./pages/Dashboards";
import Products from "./pages/Products";
import "./index.css";
import {
  Routes,
  Route,
} from "react-router-dom";

const App: React.FC = () => { 

  return (
    <>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/landingpage" element={<LandingPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/products" element={<Products />} />
    </Routes>
    </>
  );
}

export default App;
