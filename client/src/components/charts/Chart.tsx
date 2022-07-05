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
import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config";

function Charts({ title, dataKey, grid }) {
  const [error, setError] = useState(null);
  const [tloan, setTloan] = useState([]);

  useEffect(() => {}, []);
  // Get Total Request Made from TLoan
  const getTloansRMARequest = async () => {
    const response = await axios.get(`${config.baseURL}/getTloanStats`);

    setTloan(response.data);
    console.log(tloan);
  };

  useEffect(() => {
    getTloansRMARequest();
  }, []);

  return (
    <>
      <div className="chart">
        <ResponsiveContainer width="100%" aspect={4 / 1}>
          <LineChart data={tloan}>
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
