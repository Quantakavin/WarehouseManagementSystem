import "../../styles/Dashboard.scss";
import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/SideBar";
import TLoanChart from "../../components/charts/Chart";
import Cards from "../../components/cards/cards";
import RMAChart from "../../components/charts/Chart2";

function Dashboards() {
  return (
    <>
      <div className="home">
        <br></br>
        <h1 className="homeTitle">
          {localStorage.getItem("username")}'s Dashboard{""}
        </h1>

        <Cards />
        <TLoanChart title={undefined} dataKey={undefined} grid={undefined} />
        <RMAChart title={undefined} dataKey={undefined} grid={undefined} />
      </div>
    </>
  );
}

export default Dashboards;
