import { Card, Grid } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import "../../styles/chart.scss";

const data = [
  {
    time: "SERVO DYNAMICS PTE LTD",
    users: 60,
  },
  {
    time: "LEAPTRON ENGINEERING PTE LTD",
    users: 45,
  },
  {
    time: "DIRAK ASIA PTE LTD",
    users: 15,
  },
  {
    time: "PRECISION MOTION CONTROL PTE LTD",
    users: 22,
  },
  {
    time: "PORTWELL SINGAPORE PTE LTD",
    users: 5,
  },
];

function Chart3() {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Card sx={{height: "100%", width: "98%", p: 2}}>
          <Grid container>
            <Grid item xs={12}>
              <h4 style={{ textAlign: "left" }}>
                TLoan Requests Grouped By Companies
              </h4>
            </Grid>
            <Grid item xs={12}>
              <ResponsiveContainer width="100%" aspect={4 / 1}>
                <BarChart width={100} height={300} data={data}>
                  <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
                  <XAxis dataKey="time" stroke="#8884d8" />
                  <YAxis />
                  <Bar label={true} dataKey="users" fill="#8884d8" />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card sx={{height: "100%", width: "100%", p: 2}}>
          <Grid container>
            <Grid item xs={12}>
              <h4 style={{ textAlign: "left" }}>
                TLoan Requests Grouped By Companies
              </h4>
            </Grid>
            <Grid item xs={12}>
              <ResponsiveContainer width="100%" aspect={4 / 1}>
                <BarChart width={100} height={300} data={data}>
                  <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
                  <XAxis dataKey="time" stroke="#8884d8" />
                  <YAxis />
                  <Bar label={true} dataKey="users" fill="#8884d8" />
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
