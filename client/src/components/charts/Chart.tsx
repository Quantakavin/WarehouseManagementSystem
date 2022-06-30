import "../../styles/chart.scss";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { Title } from "react-bootstrap/lib/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/config";
function Charts({ title, dataKey, grid }) {
  const [TloansRMARequest, setTloansRMARequest] = useState([]);

  const data = [
    {
      name: "Jan",
      request: 2000,
    },
    {
      name: "Feb",
      request: 3000,
    },
    {
      name: "March",
      request: 2000,
    },
    {
      name: "April",
      request: 2780,
    },
    {
      name: "May",
      request: 1890,
    },
    {
      name: "June",
      request: 2390,
    },
    {
      name: "July",
      request: 3490,
    },
  ];

  useEffect(() => {}, []);

  // Get Total Request Made from TLoan and RMA
  const getTloansRMARequest = async () => {
    const response = await axios.get(`${config.baseURL}/getTloanRMMAStats`);

    console.log(response.data[0].TLoanRequests);
    data.push(response.data[0].TLoanRequests);
    console.log(data);
  };

  useEffect(() => {
    getTloansRMARequest();
  }, []);

  return (
    <>
      <div className="chart">
        <ResponsiveContainer width="100%" aspect={4 / 1}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#5550bd" />
            <YAxis></YAxis>
            <Line type="monotone" dataKey="request" stroke="#5550bd" />
            <Tooltip />
            {dataKey}
            {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default Charts;
