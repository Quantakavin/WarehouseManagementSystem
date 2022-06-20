import TopBar from "../components/header/TopBar";
import Sidebar from "../components/SideBar";
import { Card } from "react-bootstrap";
import "../styles/Dashboard.css";
import { Container } from "react-bootstrap";
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
  // const [top10sales, settop10sales] = useState([]);
  // const [html, sethtml] = useState([]);
  // const [bestseller, setbestseller] = useState([]);
  // const [top10saleslabel, settop10saleslabel] = useState([]);

  // let barcharttitle = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Top 10 Products Bought",
  //     },
  //   },
  // };

  // let p = {
  //   labels: top10saleslabel,
  //   datasets: [
  //     {
  //       label: "Number of products bought",
  //       data: top10sales,
  //       backgroundColor: "#3492eb",
  //       borderColor: "rgba(0,0,0,1)",
  //       // borderWidth: 2,
  //     },
  //   ],
  // };

  // setbestseller(
  //   <>
  //     <Bar data={p} options={barcharttitle} />
  //   </>
  // );

  // useEffect(() => {
  //   // top 10 best-seller product
  //   axios
  //     .get(``)
  //     .then(async (response) => {
  //       let top10products = response.data.rows;

  //       let quantity = [];
  //       let label = [];
  //       top10products.map((product) => {
  //         let obj = {};
  //         obj[product.product_id] = Number(product.quantity);
  //         quantity.push(Number(product.quantity));
  //         label.push(product.product_id);
  //         return null;
  //       });
  //       settop10sales(quantity);
  //       settop10saleslabel(label);
  //     });
  // }, []);

  return (
    <>
      <header>
        <TopBar />
      </header>
      <div className="dashboard-container">
        <Sidebar />

        <div className="dashboard">
          <Card className="TLoanCard">
            <Card.Body>
              <Card.Title>T-Loan Overview</Card.Title>
              
            
              <Card.Text>
              Current
              </Card.Text>
              <Card.Text>
              Drafts
              </Card.Text>
            </Card.Body>
          </Card>
          
          <Card className="RMACard">
            <Card.Body>
              <Card.Title>RMA Overview</Card.Title>
              
            
              <Card.Text>
              Current
              </Card.Text>
              <Card.Text>
              Drafts
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="TLoanRMAstats">
            <Card.Body>
              <Card.Title>T-Loan and RMA Statistic</Card.Title>
              
            </Card.Body>
          </Card>
         

         
        </div>
      </div>
    </>
  );
}

export default Dashboards;
