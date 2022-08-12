import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Cards from "../../components/cards/Cards";
import BarAndPieCharts from "../../components/charts/BarAndPieCharts";
import LineCharts from "../../components/charts/LineCharts";
import "../../styles/Dashboard.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";
import { ChangeTab } from "../../app/reducers/SidebarSlice";

const Dashboards = () => {
  // implement switch case

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ChangeTab({ currenttab: "Dashboard" }));
  }, []);

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
    <Box sx={{ pl: 3, pr: 3, pt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1 style={{ marginBottom: 0 }}>
            {localStorage.getItem("username")}'s Dashboard
          </h1>
        </Grid>
        <Grid item xs={12}>
          <Cards />
        </Grid>
        <Grid item xs={12}>
          <BarAndPieCharts />
        </Grid>
        <Grid item xs={12}>
          <LineCharts title={undefined} dataKey={undefined} grid={undefined} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboards;
