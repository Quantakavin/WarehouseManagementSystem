import React, { lazy } from "react";
import Demo from "../Pages/table";


// const DashboardPage
// const ProductsPage 
// const TloansPage
// const RMAPage
// cosnt BinLocationsPage


import { Router, RouteComponentProps } from "@reach/router";
import table from "../Pages/table";


const App = () => (
  <Router>
    <RouterPage path="/" pageComponent={<table />} />
  </Router>
);
export default App;

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props