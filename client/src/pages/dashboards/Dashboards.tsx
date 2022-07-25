import Cards from "../../components/cards/cards";
import LineCharts from "../../components/charts/LineCharts";
import BarCharts from "../../components/charts/BarCharts";
import PieCharts from "../../components/charts/PieCharts";
import "../../styles/Dashboard.scss";

import { Grid } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";

function Dashboards() {
  // implement switch case

  const userrole = useAppSelector(selectRole);

  switch (userrole) {
    case "Sales Engineer":
      // code block

      break;
    case "Technical Staff":
      // code block

      break;

    case "Sales Manager":
      // code block

      break;

    case "Sales Admin":
      break;
    default:
    // code block
  }
  // end of switch case

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1 className="homeTitle">
          {localStorage.getItem("username")}'s Dashboard{""}
        </h1>
      </Grid>
      <Grid item xs={12}>
        <Cards />
      </Grid>
      <Grid item xs={12}>
        <PieCharts title={undefined} dataKey={undefined} grid={undefined} />
      </Grid>
      <Grid item xs={12}>
        <LineCharts title={undefined} dataKey={undefined} grid={undefined} />
      </Grid>
      {/* <Grid item xs={6}>
        <RMAChart title={undefined} dataKey={undefined} grid={undefined} />
      </Grid> */}
      <Grid item xs={12}>
        <BarCharts title={undefined} dataKey={undefined} grid={undefined} />
      </Grid>
    </Grid>
  );
}

export default Dashboards;
