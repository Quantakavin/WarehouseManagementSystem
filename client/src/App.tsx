import React from "react";
import Login from "./pages/Login";
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
    </Routes>
    </>
  );
}

export default App;
