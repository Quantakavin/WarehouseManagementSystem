import Cards from "../../components/cards/cards";
import TopBar from "../../components/header/TopBar";
import Sidebar from "../../components/SideBar";
import { Card } from "react-bootstrap";
import "../../styles/Dashboard.scss";
import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "../../components/charts/Chart";

function Dashboards() {
  return (
    <>
      <div className="home">
        <Cards />
        <Chart title={undefined} dataKey={undefined} grid={undefined} />
      </div>
    </>
  );
}

export default Dashboards;
