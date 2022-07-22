import "../../styles/Dashboard.scss";
import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/SideBar";
import TLoanChart from "../../components/charts/Chart";
import Cards from "../../components/cards/cards";
import RMAChart from "../../components/charts/Chart2";
import BARChart from "../../components/charts/Chart3";
import PIEChart from "../../components/charts/Chart4";

import { useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";
import { Grid } from "@mui/material";

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
    <Grid container>
      <Grid item xs={12}>
        <h1 className="homeTitle">
          {localStorage.getItem("username")}'s Dashboard{""}
        </h1>
      </Grid>
      <Grid item xs={12}>
        <Cards />
      </Grid>
      <Grid item xs={6} sx={{ height: 350}}>
        <PIEChart title={undefined} dataKey={undefined} grid={undefined} />
      </Grid>
      <Grid item xs={6} sx={{ height: 350 }}>
        <PIEChart title={undefined} dataKey={undefined} grid={undefined} />
      </Grid>
      <Grid item xs={6}>
        <TLoanChart title={undefined} dataKey={undefined} grid={undefined} />
      </Grid>
      <Grid item xs={6}>
        <RMAChart title={undefined} dataKey={undefined} grid={undefined} />
      </Grid>
      <Grid item xs={12}>
        <BARChart title={undefined} dataKey={undefined} grid={undefined} />
      </Grid>
    </Grid>
  );
}

export default Dashboards;
