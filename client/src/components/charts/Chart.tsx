import "../../styles/chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";


function Charts({ title, dataKey, grid }) {
  const data = [
    {
      name: "Jan",
      request: 4000,
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

  return (
    <>
      <ResponsiveContainer width="100%" aspect={5 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <YAxis></YAxis>
          <Line type="monotone" dataKey="request" stroke="#5550bd" />
          <Tooltip />{dataKey}
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default Charts;
