import { Box, Card, Chip, Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";
import config from "../../config/config";
import "../../styles/cards.scss";

function Cards() {
  const userrole = useAppSelector(selectRole);
  // T-Loan Overview
  const [CurrentTloans, setCurrentTloans] = useState([]);
  const [PendingTloans, setPendingTloans] = useState([]);
  const [DraftTloans, setDraftTloans] = useState([]);
  const [ExtendedTloans, setExtenddedTloans] = useState([]);

  // RMA Overview
  const [PendingRMAs, setPendingRMAs] = useState([]);
  const [ApprovedRMAs, setApprovedRMAs] = useState([]);
  const [ProcessingRMAs, setProcessingRMAs] = useState([]);
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

  // getprocessingRMAs
  const getProcessingRMAs = async () => {
    const response = await axios.get(`${config.baseURL}/getprocessingRMAs`);

    setProcessingRMAs(response.data);
  };

  useEffect(() => {
    getProcessingRMAs();
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

  if (userrole !== "Sales Manager") {
    return (
      <Grid container sx={{ marginTop: -2 }}>
        <Grid item xs={6}>
          <Card
            sx={{ height: "100%", width: "98%", pt: 2, pb: 2, pl: 6, pr: 6 }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: "#0A2540",
                // fontWeight: "bold",
                // fontSize: 28,
                // fontFamily: "Roboto",
              }}
            >
              <Grid container>
              <Grid item xs={12}>
                  <Box sx={{fontWeight: 500, fontSize: "22px" }}>
                    RMA Overview
                  </Box>
                  <Divider />
                  <Divider sx={{mt: "10px", flexDirection: "row", display: "flex", justifyContent: "space-between", alignItems: "center"}} textAlign="left">
                  <Chip sx={{flexGrow: 1}} label="Pending"/>
                  <Chip sx={{flexGrow: 1, ml: "auto"}} label="Approved"/>
                  </Divider>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ color: "black", fontWeight: "normal" }}>
                    {PendingRMAs.length}
                  </Box>
                </Grid>
                <Grid item xs={6} sx={{ paddingLeft: 5 }}>
                  <Box sx={{ color: "black", fontWeight: "normal" }}>
                    {ApprovedRMAs.length}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{color: "#d3d3d3", fontSize:"2px"}}/>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{}}>Processing</Box>
                  <Box sx={{ color: "black", fontWeight: "normal" }}>
                    {ProcessingRMAs.length}
                  </Box>
                </Grid>
                <Grid item xs={6} sx={{ paddingLeft: 5 }}>
                  <Box sx={{}}>Received</Box>
                  <Box sx={{ color: "black", fontWeight: "normal" }}>
                    {ReceivedRMAs.length}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>Verified</Box>
                  <Box sx={{ color: "black", fontWeight: "normal" }}>
                    {VerifiedRMAs.length}
                  </Box>
                </Grid>
                <Grid item xs={6} sx={{ paddingLeft: 5 }}>
                  <Box>In Progress</Box>
                  <Box sx={{ color: "black", fontWeight: "normal" }}>
                    {InprogressRMAs.length}
                  </Box>
                </Grid>
              </Grid>
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card
            sx={{ height: "100%", width: "100%", pt: 2, pb: 2, pl: 6, pr: 6 }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: "#063970",
                fontWeight: "bold",
                fontSize: 28,
                fontFamily: "Roboto",
              }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <Box>Draft</Box>
                  <Box sx={{ color: "black", fontWeight: "normal" }}>
                    {DraftTloans.length}
                  </Box>
                </Grid>
                <Grid item xs={6} sx={{ paddingLeft: 6 }}>
                  <Box>Pending</Box>
                  <Box sx={{ color: "black", fontWeight: "normal" }}>
                    {PendingTloans.length}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Divider>
                    <Chip label="TLoans" />
                  </Divider>
                </Grid>
                <Grid item xs={6}>
                  <Box>Current</Box>
                  <Box sx={{ color: "black", fontWeight: "normal" }}>
                    {CurrentTloans.length}
                  </Box>
                </Grid>
                <Grid item xs={6} sx={{ paddingLeft: 6 }}>
                  <Box>On Extension</Box>
                  <Box sx={{ color: "black", fontWeight: "normal" }}>
                    {ExtendedTloans.length}
                  </Box>
                </Grid>
              </Grid>
            </Typography>
          </Card>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container sx={{ marginTop: -2 }}>
      <Grid item xs={6}>
        <Card sx={{ height: "100%", width: "98%", pt: 2, pb: 2, pl: 6, pr: 6 }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: "#063970",
              fontWeight: "bold",
              fontSize: 28,
              fontFamily: "Roboto",
            }}
          >
            <Grid container>
              <Grid item xs={6}>
                <Box>Approved</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {ApprovedRMAs.length}
                </Box>
              </Grid>
              <Grid item xs={6} sx={{ paddingLeft: 5 }}>
                <Box sx={{}}>Rejected</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {RejectedRMAs.length}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  <Chip label="RMA" />
                </Divider>
              </Grid>
            </Grid>
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card
          sx={{ height: "100%", width: "100%", pt: 2, pb: 2, pl: 6, pr: 6 }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: "#063970",
              fontWeight: "bold",
              fontSize: 28,
              fontFamily: "Roboto",
            }}
          >
            <Grid container>
              <Grid item xs={6}>
                <Box>Draft</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {DraftTloans.length}
                </Box>
              </Grid>
              <Grid item xs={6} sx={{ paddingLeft: 6 }}>
                <Box>Current</Box>
                <Box sx={{ color: "black", fontWeight: "normal" }}>
                  {CurrentTloans.length}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider>
                  <Chip label="TLoans" />
                </Divider>
              </Grid>
            </Grid>
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Cards;
