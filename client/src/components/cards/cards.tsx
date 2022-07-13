import "./cards.scss";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../config/config";
import GetLoansOverview from "../../api/dashboard/GetLoansOverview";
import GetRMAsOverview from "../../api/dashboard/GetRMAsOverview";
import GetTLoanRMAChart from "../../api/dashboard/GetTLoanRMAChart";

function cards() {
  // T-Loan
  const [CurrentTloans, setCurrentTloans] = useState([]);
  const [PendingTloans, setPendingTloans] = useState([]);
  const [DraftTloans, setDraftTloans] = useState([]);
  const [ExtendedTloans, setExtenddedTloans] = useState([]);

  // RMA
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
            <span className="Current">Current</span>
            <h1 className="Current">{CurrentTloans.length}</h1>
          </div>
          <div>
            <span className="Drafts">Drafts</span>
            <h1 className="Current">{DraftTloans.length}</h1>
          </div>
          <div>
            <span className="Current">Pending</span>
            <h1 className="Current">{PendingTloans.length}</h1>
          </div>
          <div>
            <span className="Current">On-Extension</span>
            <h1 className="Current"></h1>
          </div>
        </div>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">RMA Overview</span>
        <div>
          <div>
            <span className="Current">Requested</span>
            <h1 className="Current">{RequestedRMAs.length}</h1>
          </div>
          <div>
            <span className="Drafts">Pending</span>
            <h1 className="Current">{PendingRMAs.length}</h1>
          </div>
          <div>
            <span className="Current">Closed</span>
            <h1 className="Current">{ClosedRMAs.length}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default cards;
