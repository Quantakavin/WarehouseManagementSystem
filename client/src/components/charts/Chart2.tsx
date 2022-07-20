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

function Chart2({ title, dataKey, grid }) {
  const [error, setError] = useState(null);
  const [rma, setRMA] = useState([]);
  const [date, setDate] = useState(new Date());

  // Get Total Request Made from TLoan
  const getTloansRMARequest = async () => {
    const response = await axios.get(`${config.baseURL}/getRMAStats`, {
      headers: {
        TestDate: "24",
      },
    });

    // Test accessing resonse headers for date
    // console.log(response.data.headers["Request-Date"]);
    setRMA(response.data);
    console.log(rma);
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
        <h4 style={{ textAlign: "left" }}>Pending RMA Requests</h4>
        <br></br>
        <ResponsiveContainer width="100%" aspect={4 / 1}>
          <LineChart data={rma}>
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

export default Chart2;
