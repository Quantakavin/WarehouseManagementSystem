import "../../styles/Dashboard.scss";
import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/SideBar";
import Charts from "../../components/charts/Chart";
import Cards from "../../components/cards/cards";
import Chart2 from "../../components/charts/Chart2";

function Dashboards() {
  return (
    <>
      <div className="home">
        <br></br>
        <h1 className="homeTitle">Dashboard</h1>

        <Cards />
        <Charts title={undefined} dataKey={undefined} grid={undefined} />
        <Chart2 title={undefined} dataKey={undefined} grid={undefined} />
      </div>
    </>
  );
}

export default Dashboards;
