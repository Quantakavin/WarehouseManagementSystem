import { Card, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import config from "../../config/config";
import "../../styles/chart.scss";

const COLORS = ["#0088FE", "#00C49F"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function Chart3({}) {
  const [tloanrequest, settloanRequest] = useState([]);

  // Get Tloan Request Grouped By Companies

  const getTloansCompanies = async () => {
    const response = await axios.get(`${config.baseURL}/getTloanType`);

    settloanRequest(response.data);
    console.log(tloanrequest);
  };

  useEffect(() => {
    getTloansCompanies();
  }, []);

  const [requesttypes, setrequesttypes] = useState([]);

  // Get Types of Tloan

  const getTloanTypes = async () => {
    const response = await axios.get(`${config.baseURL}/getPieChart`);

    setrequesttypes(response.data);
    console.log(requesttypes);
  };

  useEffect(() => {
    getTloanTypes();
  }, []);

  // const data = [
  //   {
  //     time: "SERVO DYNAMICS PTE LTD",
  //     users: 60,
  //   },
  //   {
  //     time: "LEAPTRON ENGINEERING PTE LTD",
  //     users: 45,
  //   },
  //   {
  //     time: "DIRAK ASIA PTE LTD",
  //     users: 15,
  //   },
  //   {
  //     time: "PRECISION MOTION CONTROL PTE LTD",
  //     users: 22,
  //   },
  //   {
  //     time: "PORTWELL SINGAPORE PTE LTD",
  //     users: 5,
  //   },
  // ];

  // function Chart3() {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Card sx={{ height: "100%", width: "98%", p: 2 }}>
          <h4 style={{ textAlign: "left" }}>TLoan Requests Grouped By Type</h4>
          <ResponsiveContainer width="100%" height="100%" aspect={4 / 1}>
            <PieChart width={600} height={400}>
              <Pie
                data={requesttypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={134}
                fill="#8884d8"
                dataKey="Requests"
              >
                {requesttypes.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card sx={{ height: "100%", width: "100%", p: 2 }}>
          <Grid container>
            <Grid item xs={12}>
              <h4 style={{ textAlign: "left" }}>
                TLoan Requests Grouped By Companies
              </h4>
            </Grid>
            <Grid item xs={12}>
              <ResponsiveContainer width="100%" aspect={4 / 1}>
                <BarChart width={100} height={300} data={tloanrequest}>
                  <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
                  <XAxis dataKey="Company" stroke="#8884d8" />
                  <YAxis />
                  <Bar label={true} dataKey="Requests" fill="#8884d8" />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Chart3;
