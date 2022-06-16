import NavBar from "../Components/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  PointElement,
  LineElement,
  LineController,
  Title,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  BarElement,
  BarController,
  LinearScale,
  PointElement,
  LineElement,
  LineController
);

function Dashboards() {
  return (
    <>
      <NavBar />

      <div className="container">
        <h1> Dashboard</h1>
      </div>
    </>
  );
}

export default Dashboards;
