import "../../styles/Dashboard.scss";
import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/SideBar";
import TLoanChart from "../../components/charts/Chart";
import CardsManager from "../../components/cards/cardsManager";
import RMAChart from "../../components/charts/Chart2";
import { useAppSelector } from '../../app/hooks'
import { selectRole } from '../../app/reducers/CurrentUserSlice';

function DashboardManager() {


// implement switch case

const userrole = useAppSelector(selectRole)

switch(userrole) {
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
    <>
      <div className="home">
        <br></br>
        <h1 className="homeTitle">
          {localStorage.getItem("username")}'s Dashboard{""}
        </h1>

        <CardsManager  />
        <TLoanChart title={undefined} dataKey={undefined} grid={undefined} />
        <RMAChart title={undefined} dataKey={undefined} grid={undefined} />
      </div>
    </>
  );
}

export default DashboardManager;
