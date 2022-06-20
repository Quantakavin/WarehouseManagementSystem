import TopBar from "./components/header/TopBar";
import Sidebar from "./components/SideBar";
import React from "react";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPageLogin";
import Dashboard from "./pages/Dashboards";
import Products from "./pages/Products";

import {
  Routes,
  Route,
} from "react-router-dom";
// import TopBar from "./components/TopBar";
// import SideBar from "./components/SideBar";

const App: React.FC = () => { 

  return (
    
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/landingpage" element={<LandingPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/products" element={<Products />} />
    </Routes>
  );
}

export default App;
