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

const Chart2 = ({ title, dataKey, grid }) => {
  const [error, setError] = useState(null);
  const [rma, setRMA] = useState([]);

  // Get Total Request Made from TLoan
  const getTloansRMARequest = async () => {
    const response = await axios.get(`${config.baseURL}/getRMAStats`);

    setRMA(response.data);
    console.log(rma);
  };

  useEffect(() => {
    getTloansRMARequest();
  }, []);

  return (
    <div className="chart">
      <h4 style={{ textAlign: "left" }}>Current RMA Requests</h4>
      <br />
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={rma}>
          <XAxis dataKey="Month" stroke="#5550bd" />
          <YAxis />
          <Line type="monotone" dataKey="Requests" stroke="#5550bd" />
          <Tooltip />
          {dataKey}
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart2;
