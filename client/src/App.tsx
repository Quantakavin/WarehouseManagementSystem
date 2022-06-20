import TopBar from "./components/header/TopBar";
import Sidebar from "./components/SideBar";
import React from "react";
import Login from "./pages/Login";
import "./index.css";
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
    </Routes>
  );
}

export default App;
