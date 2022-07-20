import "./cards.scss";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectRole, selectName } from "../../app/reducers/CurrentUserSlice";
import config from "../../config/config";
import GetLoansOverview from "../../api/dashboard/GetLoansOverview";
import GetRMAsOverview from "../../api/dashboard/GetRMAsOverview";
import GetTLoanRMAChart from "../../api/dashboard/GetTLoanRMAChart";
import { Box, Card, Grid, Typography } from "@mui/material";

function cards() {
  const userrole = useAppSelector(selectRole);
  // T-Loan Overview
  const [CurrentTloans, setCurrentTloans] = useState([]);
  const [PendingTloans, setPendingTloans] = useState([]);
  const [DraftTloans, setDraftTloans] = useState([]);
  const [ExtendedTloans, setExtenddedTloans] = useState([]);

  // RMA Overview
  const [PendingRMAs, setPendingRMAs] = useState([]);
  const [ApprovedRMAs, setApprovedRMAs] = useState([]);
  const [RejectedRMAs, setRejecteRMAs] = useState([]);
  const [ReceivedRMAs, setReceivedRMAs] = useState([]);
  const [VerifiedRMAs, setVerifiedRMAs] = useState([]);
  const [InprogressRMAs, setInprogressRMAs] = useState([]);
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

  // getpendingRMAs
  const getpendingdRMAs = async () => {
    const response = await axios.get(`${config.baseURL}/getpendingRMAs`);

    setPendingRMAs(response.data);
  };

  useEffect(() => {
    getpendingdRMAs();
  }, []);

  // getapprovedRMAs
  const getApprovedRMAs = async () => {
    const response = await axios.get(`${config.baseURL}/getapprovedRMAs`);

    setApprovedRMAs(response.data);
  };

  useEffect(() => {
    getApprovedRMAs();
  }, []);

  const getRejectedRMAs = async () => {
    const response = await axios.get(`${config.baseURL}/getrejectedRMAs`);

    setRejecteRMAs(response.data);
  };

  useEffect(() => {
    getRejectedRMAs();
  }, []);

  // getreceivedRMAs
  const getReceivedRMAs = async () => {
    const response = await axios.get(`${config.baseURL}/getreceivedRMAs`);

    setReceivedRMAs(response.data);
  };

  useEffect(() => {
    getReceivedRMAs();
  }, []);

  // getverifiedRMAs
  const getVerifiedRMAs = async () => {
    const response = await axios.get(`${config.baseURL}/getverifiedRMAs`);

    setVerifiedRMAs(response.data);
  };

  useEffect(() => {
    getVerifiedRMAs();
  }, []);

  // getIPRMAs
  const getIPRMAs = async () => {
    const response = await axios.get(`${config.baseURL}/getIPRMAs`);

    setInprogressRMAs(response.data);
  };

  useEffect(() => {
    getIPRMAs();
  }, []);

  // getclosedRMAs
  const getclosedRMAs = async () => {
    const response = await axios.get(`${config.baseURL}/getclosedRMAs`);

    setClosedRMAs(response.data);
  };

  useEffect(() => {
    getclosedRMAs();
  }, []);
  {
    CurrentTloans.length;
  }
  {
    DraftTloans.length;
  }

  {
    PendingRMAs.length;
  }
  {
    ApprovedRMAs.length;
  }
  {
    ReceivedRMAs.length;
  }
  {
    VerifiedRMAs.length;
  }
  {
    InprogressRMAs.length;
  }
  {
    ClosedRMAs.length;
  }

  // '-apple-system',
  // '',
  // '""',
  // 'Roboto',
  // '"Helvetica Neue"',
  // 'Arial',
  // 'sans-serif',
  // '"Apple Color Emoji"',
  // '"Segoe UI Emoji"',
  // '"Segoe UI Symbol"',
  if (userrole != "Sales Manager") {
    return (
      <Grid container sx={{ paddingLeft: 2, paddingRight: 2 }}>
        <Grid item xs={6}>
          <Card sx={{ height: "100%", width: "98%" }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="span"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                paddingTop: 5,
                paddingLeft: 5,
                paddingRight: 50,
                color: "#063970",
                fontWeight: "bold",
                fontSize: 38,
                fontFamily: "Roboto",
              }}
            >
              <Box>
                <Box>Current</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {CurrentTloans.length}
                </Box>
                <Box>Pending</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {PendingTloans.length}
                </Box>
              </Box>
              <Box>
                <Box sx={{}}>Drafts</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {DraftTloans.length}
                </Box>
                <Box sx={{}}>On Extension</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {PendingTloans.length}
                </Box>
              </Box>
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ height: "100%", width: "100%" }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="span"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                paddingTop: 5,
                paddingLeft: 5,
                paddingRight: 50,
                paddingBottom: 5,
                color: "#063970",
                fontWeight: "bold",
                fontSize: 38,
                fontFamily: "Roboto",
              }}
            >
              <Box>
                <Box>Pending</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {PendingRMAs.length}
                </Box>
                <Box>Approved</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {ApprovedRMAs.length}
                </Box>
                <Box sx={{}}>Rejected</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {RejectedRMAs.length}
                </Box>
                <Box sx={{}}>Received</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {ReceivedRMAs.length}
                </Box>
              </Box>
              <Box sx={{ marginTop: -8 }}>
                <Box sx={{}}>Verified</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {VerifiedRMAs.length}
                </Box>
                <Box sx={{}}>In Progress</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {InprogressRMAs.length}
                </Box>
                <Box sx={{}}>Closed</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {ClosedRMAs.length}
                </Box>
              </Box>
            </Typography>
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container sx={{ paddingLeft: 2, paddingRight: 2 }}>
        <Grid item xs={6}>
          <Card sx={{ height: "100%", width: "98%" }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="Box"
              sx={{
                paddingTop: 2,
                paddingLeft: 2,
                color: "#063970",
                fontWeight: "bold",
              }}
            >
              <Box>
                <Box>Approved</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {CurrentTloans.length}
                </Box>
                <Box sx={{}}>Rejected</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {DraftTloans.length}
                </Box>
              </Box>
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ height: "100%", width: "100%" }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="Box"
              sx={{
                paddingTop: 2,
                paddingLeft: 2,
                paddingBottom: 2,
                color: "#063970",
                fontWeight: "bold",
              }}
            >
              <Box>
                <Box>Approved</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {ApprovedRMAs.length}
                </Box>
                <Box sx={{}}>Rejected</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {RejectedRMAs.length}
                </Box>
              </Box>
            </Typography>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default cards;
