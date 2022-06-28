import "../../styles/Dashboard.scss";
import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/SideBar";
import Chart from "../../components/charts/Chart";
import Cards from "../../components/cards/cards";

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
