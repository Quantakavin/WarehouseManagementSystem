import axios from "axios";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import config from "../../config/config";
import "../../styles/chart.scss";

function Charts({ title, dataKey, grid }) {
  const [error, setError] = useState(null);
  const [tloan, setTloan] = useState([]);
  const [date, setDate] = useState(new Date());

  // Get Total Request Made from TLoan
  const getTloansRMARequest = async () => {
    const response = await axios.get(`${config.baseURL}/getTloanStats`);

    setTloan(response.data);
    console.log(tloan);
  };

  useEffect(() => {
    getTloansRMARequest();
  }, []);

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1);

    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="chart">
        <h4 style={{ textAlign: "left" }}>Current T-Loan Requests</h4>
        <br></br>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
          <LineChart data={tloan}>
            <XAxis dataKey="Month" stroke="#5550bd" />
            <YAxis></YAxis>
            <Line type="monotone" dataKey="Requests" stroke="#5550bd" />
            <Tooltip />
            {dataKey}
            {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
          </LineChart>
        </ResponsiveContainer>
        <h1 className="Date">Last Updated {date.toLocaleTimeString()}</h1>
      </div>
    </>
  );
}

export default Charts;
