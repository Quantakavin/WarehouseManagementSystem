import { Box, Card, Chip, Divider, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";
import config from "../../config/config";
import "../../styles/cards.scss";
import useWindowSize from "../../hooks/useWindowSize";

const Cards = () => {
  const userrole = useAppSelector(selectRole);
  // T-Loan Overview
  const [CurrentTloans, setCurrentTloans] = useState([]);
  const [PendingTloans, setPendingTloans] = useState([]);
  const [DraftTloans, setDraftTloans] = useState([]);
  const [ExtendedTloans, setExtendedTloans] = useState([]);

  // RMA Overview
  const [PendingRMAs, setPendingRMAs] = useState([]);
  const [ApprovedRMAs, setApprovedRMAs] = useState([]);
  const [ProcessingRMAs, setProcessingRMAs] = useState([]);
  const [RejectedRMAs, setRejecteRMAs] = useState([]);
  const [ReceivedRMAs, setReceivedRMAs] = useState([]);
  const [VerifiedRMAs, setVerifiedRMAs] = useState([]);
  const [InprogressRMAs, setInprogressRMAs] = useState([]);
  const { viewportwidth } = useWindowSize();

  // getcurrentTloans
  const getcurrentTloans = async () => {
    const response = await axios.get(`${config.baseURL}/getcurentTloans`);

    setCurrentTloans(response.data);
  };

  useEffect(() => {
    getcurrentTloans();
  }, []);

  // getpendingTloans
  const getpendingTloans = async () => {
    const response = await axios.get(`${config.baseURL}/getpendingTloans`);

    setPendingTloans(response.data);
  };

  useEffect(() => {
    getpendingTloans();
  }, []);

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

    setExtendedTloans(response.data);
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

  if (userrole !== "Sales Manager") {
    return (
      <Grid container spacing={3} sx={{ marginTop: -2 }}>
        <Grid item xs={viewportwidth < 1000 ? 12 : 6}>
          <Card
            sx={{ height: "100%", width: "98%", pt: 2, pb: 2, pl: 5, pr: 5 }}
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
                  <Box sx={{ fontWeight: 500, fontSize: "22px" }}>
                    RMA Overview
                  </Box>
                  <Divider
                    sx={{
                      mt: "10px",
                      mb: "10px",
                      borderBottomWidth: 1,
                      backgroundColor: "#0A2540",
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Chip label="Pending" />
                  <Box
                    sx={{
                      color: "#0A2540",
                      fontWeight: "normal",
                      ml: "10px",
                      mt: "5px",
                      fontSize: "22px",
                    }}
                  >
                    {PendingRMAs.length}
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Chip label="Approved" />
                  <Box
                    sx={{
                      color: "#0A2540",
                      fontWeight: "normal",
                      ml: "10px",
                      mt: "5px",
                      fontSize: "22px",
                    }}
                  >
                    {ApprovedRMAs.length}
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Chip label="Processing" />
                  <Box
                    sx={{
                      color: "#0A2540",
                      fontWeight: "normal",
                      ml: "10px",
                      mt: "5px",
                      fontSize: "22px",
                    }}
                  >
                    {ProcessingRMAs.length}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Divider
                    sx={{
                      mt: "10px",
                      mb: "10px",
                      borderBottomWidth: 1,
                      backgroundColor: "#0A2540",
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Chip label="Received" />
                  <Box
                    sx={{
                      color: "#0A2540",
                      fontWeight: "normal",
                      ml: "10px",
                      mt: "5px",
                      fontSize: "22px",
                    }}
                  >
                    {ReceivedRMAs.length}
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Chip label="Verified" />
                  <Box
                    sx={{
                      color: "#0A2540",
                      fontWeight: "normal",
                      ml: "10px",
                      mt: "5px",
                      fontSize: "22px",
                    }}
                  >
                    {VerifiedRMAs.length}
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Chip label="In Progress" />
                  <Box
                    sx={{
                      color: "#0A2540",
                      fontWeight: "normal",
                      ml: "10px",
                      mt: "5px",
                      fontSize: "22px",
                    }}
                  >
                    {InprogressRMAs.length}
                  </Box>
                </Grid>
              </Grid>
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={viewportwidth < 1000 ? 12 : 6}>
          <Card
            sx={{ height: "100%", width: "100%", pt: 2, pb: 2, pl: 6, pr: 6 }}
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
                  <Box sx={{ fontWeight: 500, fontSize: "22px" }}>
                    T-Loan Overview
                  </Box>
                  <Divider
                    sx={{
                      mt: "10px",
                      mb: "10px",
                      borderBottomWidth: 1,
                      backgroundColor: "#0A2540",
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Chip label="Draft" />
                  <Box
                    sx={{
                      color: "#0A2540",
                      fontWeight: "normal",
                      ml: "10px",
                      mt: "5px",
                      fontSize: "22px",
                    }}
                  >
                    {DraftTloans.length}
                  </Box>
                </Grid>
                <Grid item xs={6} sx={{ paddingLeft: 6 }}>
                  <Chip label="Pending" />
                  <Box
                    sx={{
                      color: "#0A2540",
                      fontWeight: "normal",
                      ml: "10px",
                      mt: "5px",
                      fontSize: "22px",
                    }}
                  >
                    {PendingTloans.length}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Divider
                    sx={{
                      mt: "10px",
                      mb: "10px",
                      borderBottomWidth: 1,
                      backgroundColor: "#0A2540",
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Chip label="Current" />
                  <Box
                    sx={{
                      color: "#0A2540",
                      fontWeight: "normal",
                      ml: "10px",
                      mt: "5px",
                      fontSize: "22px",
                    }}
                  >
                    {CurrentTloans.length}
                  </Box>
                </Grid>
                <Grid item xs={6} sx={{ paddingLeft: 6 }}>
                  <Chip label="On Extension" />
                  <Box
                    sx={{
                      color: "#0A2540",
                      fontWeight: "normal",
                      ml: "10px",
                      mt: "5px",
                      fontSize: "22px",
                    }}
                  >
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
                <Box sx={{ color: "#0A2540", fontWeight: "normal" }}>
                  {ApprovedRMAs.length}
                </Box>
              </Grid>
              <Grid item xs={6} sx={{ paddingLeft: 5 }}>
                <Box sx={{}}>Rejected</Box>
                <Box sx={{ color: "#0A2540", fontWeight: "normal" }}>
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
                <Box sx={{ color: "#0A2540", fontWeight: "normal" }}>
                  {DraftTloans.length}
                </Box>
              </Grid>
              <Grid item xs={6} sx={{ paddingLeft: 6 }}>
                <Box>Current</Box>
                <Box sx={{ color: "#0A2540", fontWeight: "normal" }}>
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
};

export default Cards;
