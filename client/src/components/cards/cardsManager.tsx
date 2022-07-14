import "./cards.scss";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../config/config";
import GetLoansOverview from "../../api/dashboard/GetLoansOverview";
import GetRMAsOverview from "../../api/dashboard/GetRMAsOverview";
import GetTLoanRMAChart from "../../api/dashboard/GetTLoanRMAChart";

function cardsManager() {
  // T-Loan Overview
  const [CurrentTloans, setCurrentTloans] = useState([]);
  const [PendingTloans, setPendingTloans] = useState([]);
  const [DraftTloans, setDraftTloans] = useState([]);
  const [ExtendedTloans, setExtenddedTloans] = useState([]);

  // RMA Overview
  const [RequestedRMAs, setRequesteddRMAs] = useState([]);
  const [PendingRMAs, setPendingRMAs] = useState([]);
  const [ClosedRMAs, setClosedRMAs] = useState([]);

  // getcurrentTloans
  const getcurentTloans = async () => {
    const response = await axios.get(`${config.baseURL}/getcurentTloans`);

    setCurrentTloans(response.data);
  };

  useEffect(() => {
    getcurentTloans();
  }, []);

  // getpendingTloans
  const getpendingTloans = async () => {
    const response = await axios.get(`${config.baseURL}/getpendingTloans`);

    setPendingTloans(response.data);
  };

  // getdraftTloans
  const getdraftTloans = async () => {
    const response = await axios.get(`${config.baseURL}/getdraftTloans`);

    setDraftTloans(response.data);
  };

  useEffect(() => {
    getdraftTloans();
  }, []);

  // getextendedTloans
  const getextendedTloans = async () => {
    const response = await axios.get(`${config.baseURL}/getpendingTloans`);

    setPendingTloans(response.data);
  };

  useEffect(() => {
    getextendedTloans();
  }, []);

  // getrequestedRMAs
  const getrequestedRMAs = async () => {
    const response = await axios.get(`${config.baseURL}/getcurrentRMAs`);

    setRequesteddRMAs(response.data);
  };

  useEffect(() => {
    getrequestedRMAs();
  }, []);

  // getpendingRMAs
  const getpendingdRMAs = async () => {
    const response = await axios.get(`${config.baseURL}/getpendingRMAs`);

    setPendingRMAs(response.data);
  };

  useEffect(() => {
    getpendingdRMAs();
  }, []);

  // getclosedRMAs
  const getclosedRMAs = async () => {
    const response = await axios.get(`${config.baseURL}/getcloseRMAs`);

    setClosedRMAs(response.data);
  };

  useEffect(() => {
    getclosedRMAs();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">T-Loan Overview</span>
        <div>
          <div>
            <span className="Current">Approved</span>
            <h1 className="Current">{CurrentTloans.length}</h1>
          </div>
          <div>
            <span className="Drafts">Rejected</span>
            <h1 className="Drafts">{DraftTloans.length}</h1>
          </div>
        </div>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">RMA Overview</span>
        <div>
          <div>
            <span className="Current">Approved</span>
            <h1 className="Current">{RequestedRMAs.length}</h1>
          </div>
          <div>
            <span className="Drafts">Rejected</span>
            <h1 className="Current">{PendingRMAs.length}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default cardsManager;
