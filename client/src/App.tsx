import TopBar from "./components/header/TopBar";
import Sidebar from "./components/SideBar";
import React from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboards";
import Products from "./pages/Products";
import BinLocations from "./pages/BinLocations";
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/binlocations" element={<BinLocations />} />
    </Routes>
  );
};

export default App;
