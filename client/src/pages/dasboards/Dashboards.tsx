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
      <header>
        <TopBar />
      </header>
      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard">
          <h1 className="Title">Dashboard</h1>
          <Card className="TLoanCard">
            <Card.Body>
              <Card.Title>T-Loan Overview</Card.Title>
              <br></br>
              <Card.Text>Current</Card.Text>
              <Card.Text>Drafts</Card.Text>
              <Card.Text>Pending</Card.Text>
              <Card.Text>Extension</Card.Text>
            </Card.Body>
          </Card>

          {/* <Card className="TLoanCard2">
            <Card.Body>
              <Card.Title>T-Loan Overview</Card.Title>
              <br></br>
              <Card.Text>Current</Card.Text>
              <Card.Text>Drafts</Card.Text>
              <Card.Text>Pending</Card.Text>
              <Card.Text>Extension</Card.Text>
            </Card.Body>
          </Card> */}

           <Card className="RMACard">
            <Card.Body>
              <Card.Title>Current T-Loan and RMA Statistic</Card.Title>
              <Card.Text>Tloan Requests Made</Card.Text>
              <br></br>
              <Chart title={undefined} dataKey={undefined} grid={undefined} />
           
            </Card.Body>
          </Card> 
       
        </div>

       


      </div>
    </>
  );
}

export default Dashboards;
