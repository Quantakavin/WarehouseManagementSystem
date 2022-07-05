import "../../styles/Dashboard.scss";
import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/SideBar";
import Charts from "../../components/charts/Chart";
import Cards from "../../components/cards/cards";

function Dashboards() {
  return (
    <>
      <div className="home">
        <br></br>
        <h1 className="homeTitle">Dashboard</h1>

        <Cards />
        <Charts title={undefined} dataKey={undefined} grid={undefined} />
      </div>
    </>
  );
}

export default Dashboards;
