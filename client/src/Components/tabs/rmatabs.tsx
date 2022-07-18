import {
  Tab,
  Tabs,
  Box,
  unstable_createMuiStrictModeTheme,
  ThemeProvider,
  MenuItem,
  Stack,
  Grid,
} from "@mui/material";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import "react-tabs/style/react-tabs.css";
import React, { useEffect, useState } from "react";
import axios from 'axios';

import { Link, useNavigate } from "react-router-dom";
import TableNew from "../table/InfiniteTable";
import { useAppSelector } from "../../app/hooks";
import { selectRole, selectId } from "../../app/reducers/CurrentUserSlice";
import RmaSearch from "../search/RmaSearch";
import { Hidden } from "@mui/material";
import { motion } from "framer-motion";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchBarUpdated from "../../components/search/SearchBarUpdated";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import theme from "../../styles/muistyle";
import {
  DataGrid,
  GridFilterModel,
  GridToolbar,
  GridRowParams,
  GridRowId,
  MuiEvent,
} from "@mui/x-data-grid";
import { DataGridPro } from "@mui/x-data-grid-pro";

const columns = [
  { field: "RmaID", headerName: "ID", minWidth: 250 },
  { field: "Username", headerName: "Employee", minWidth: 500 },
  { field: "DateTime", headerName: "Date", minWidth: 250 },
  { field: "CompanyName", headerName: "Company", minWidth: 500 },
  { field: "CustomerEmail", headerName: "Customer Email", minWidth: 500 },
];

const Rmatabs: React.FC = () => {
  const userid = useAppSelector(selectId);
  const userrole = useAppSelector(selectRole);
  const [pendingTable, setPendingTable] = useState([]);
  const [approvedTable, setApprovedTable] = useState([]);
  const [receivedTable, setReceivedTable] = useState([]);
  const [verifiedTable, setVerifiedTable] = useState([]);
  const [inprogressTable, setInProgressTable] = useState([]);
  const [closedTable, setClosedTable] = useState([]);
  const [myAcceptedTable, setMATable] = useState([]);
  const [myRejectedTable, setMRTable] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/pendingRMA")
      .then((data) => data.json())
      .then((data) => setPendingTable(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/acceptedRMA")
      .then((data) => data.json())
      .then((data) => setApprovedTable(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/receivedRMA")
      .then((data) => data.json())
      .then((data) => setReceivedTable(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/verifiedRMA")
      .then((data) => data.json())
      .then((data) => setVerifiedTable(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/inprogressRMA")
      .then((data) => data.json())
      .then((data) => setInProgressTable(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/closedRMA")
      .then((data) => data.json())
      .then((data) => setClosedTable(data));
  }, []);

  useEffect(() => {
    // declare the async data fetching function
    const fetchAcceptedData = async () => {
      // get the data from the api
      const acceptedrma = await axios.get(
        `http://localhost:5000/api/myAcceptedRMA/${userid}`
      )
      .then((acceptedrma)=> setMATable(acceptedrma.data))
      // setRma(Object.e)
    };
    const fetchRejectedData = async () => {
      // get the data from the api
      const rejectedrma = await axios.get(
        `http://localhost:5000/api/myRejectedRMA/${userid}`
      )
      .then((rejectedrma)=> setMRTable(rejectedrma.data))
      // setRma(Object.e)
    };
    // call the function
    fetchAcceptedData()
    fetchRejectedData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [
      {
        columnField: "Company Name",
        operatorValue: "=",
        value: "SERVO_LIVE",
      },
    ],
  });

  const headers = [
    "RMA No.",
    "DateTime",
    "Company Name",
    "Customer Email",
    "Actions",
  ];

  const navigate = useNavigate();
  const theme = unstable_createMuiStrictModeTheme();
  const [pageSize, setPageSize] = React.useState(25);
  const [inputName, setInputName] = useState<string>(null);

  const [value, setValue] = useState(0); // first tab

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  switch (userrole) {
    case "Sales Engineer": {
      return (
        <>
          <h2 className="pagetitle"> RMA Requests </h2>
          <TabContext value={value || "1"}>
            <Grid container>
              <Grid item xs={11}>
                <Box sx={{ paddingLeft: 3, marginTop: 3 }}>
                  <Tabs
                    onChange={handleChange}
                    TabIndicatorProps={{
                      style: { backgroundColor: "#D97D54" },
                    }}
                    sx={{
                      "& button:focus": {
                        backgroundColor: "#063970",
                        color: "white",
                        width: 190,
                        height: 110,
                      },
                    }}
                  >
                    <Tab
                      label="Accepted"
                      value="1"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                    <Tab
                      label="Rejected"
                      value="2"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                  </Tabs>
                </Box>
              </Grid>
              <Grid item xs={1}>
                <Box sx={{ paddingLeft: 10, marginTop: 5.5 }}>
                  <React.StrictMode>
                    <ThemeProvider theme={theme}>
                      <Fab
                        aria-label="add"
                        onClick={() => navigate("/createRMA")}
                        style={{ marginTop: 0 }}
                      >
                        <AddIcon />
                      </Fab>
                    </ThemeProvider>
                  </React.StrictMode>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <TabPanel value="1">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGrid
                      sx={{ background: "white", fontSize: 18 }}
                      rows={myAcceptedTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={pageSize}
                      onPageSizeChange={(newPage) => setPageSize(newPage)}
                      pagination
                      components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            No accepted RMA requests
                          </Stack>
                        ),
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGridPro
                      sx={{ background: "white", fontSize: 18 }}
                      rows={myRejectedTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={12}
                      components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            No rejected RMA requests
                          </Stack>
                        ),
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
              </Grid>
            </Grid>
          </TabContext>
        </>
      );
    }
    case "Technical Staff": {
      return (
        <>
          <h2 className="pagetitle"> RMA Requests </h2>

          <TabContext value={value || "1"}>
            <Grid container>
              <Grid item xs={11}>
                <Box sx={{ paddingLeft: 3, marginTop: 3 }}>
                  <Tabs
                    onChange={handleChange}
                    TabIndicatorProps={{
                      style: { backgroundColor: "#D97D54" },
                    }}
                    sx={{
                      "& button:focus": {
                        backgroundColor: "#063970",
                        color: "white",
                        width: 190,
                        height: 110,
                      },
                    }}
                  >
                    <Tab
                      label="Received"
                      value="3"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                  </Tabs>
                </Box>
              </Grid>


              <Grid item xs={12}>
                <TabPanel value="3">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGridPro
                      sx={{ background: "white", fontSize: 18 }}
                      rows={receivedTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={12}
                      components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            No received RMA requessts
                          </Stack>
                        ),
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
              </Grid>
            </Grid>
          </TabContext>
        </>
      );
    }
    case "Sales Manager": {
      return (
        <>
          <h2 className="pagetitle"> RMA Requests </h2>

          <TabContext value={value || "1"}>
            <Grid container>
              <Grid item xs={11}>
                <Box sx={{ paddingLeft: 3, marginTop: 3 }}>
                  <Tabs
                    onChange={handleChange}
                    TabIndicatorProps={{
                      style: { backgroundColor: "#D97D54" },
                    }}
                    sx={{
                      "& button:focus": {
                        backgroundColor: "#063970",
                        color: "white",
                        width: 190,
                        height: 110,
                      },
                    }}
                  >
                    <Tab
                      label="Pending"
                      value="1"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                    <Tab
                      label="Approved"
                      value="2"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                    <Tab
                      label="Received"
                      value="3"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                    <Tab
                      label="Verified"
                      value="4"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                    <Tab
                      label="In Progress"
                      value="5"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                    <Tab
                      label="Closed"
                      value="6"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                  </Tabs>
                </Box>
              </Grid>


              <Grid item xs={12}>
                <TabPanel value="1">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGrid
                      sx={{ background: "white", fontSize: 18 }}
                      rows={pendingTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={pageSize}
                      onPageSizeChange={(newPage) => setPageSize(newPage)}
                      pagination
                      components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            No pending RMA requests
                          </Stack>
                        ),
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGridPro
                      sx={{ background: "white", fontSize: 18 }}
                      rows={approvedTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={12}
                      components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            No approved RMA requessts
                          </Stack>
                        ),
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="3">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGridPro
                      sx={{ background: "white", fontSize: 18 }}
                      rows={receivedTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={12}
                      components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            No received RMA requessts
                          </Stack>
                        ),
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="4">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGridPro
                      sx={{ background: "white", fontSize: 18 }}
                      rows={verifiedTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={12}
                      components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            No verified RMA requessts
                          </Stack>
                        ),
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="5">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGridPro
                      sx={{ background: "white", fontSize: 18 }}
                      rows={inprogressTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={12}
                      components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            No closed RMA requessts
                          </Stack>
                        ),
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="6">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGridPro
                      sx={{ background: "white", fontSize: 18 }}
                      rows={closedTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={12}
                      components={{
                        Toolbar: GridToolbar,
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
              </Grid>
            </Grid>
          </TabContext>
        </>
      );
    }
    case "Sales Admin": {
      return (
        <>
          <h2 className="pagetitle"> RMA Requests </h2>

          <TabContext value={value || "1"}>
            <Grid container>
              <Grid item xs={11}>
                <Box sx={{ paddingLeft: 3, marginTop: 3 }}>
                  <Tabs
                    onChange={handleChange}
                    TabIndicatorProps={{
                      style: { backgroundColor: "#D97D54" },
                    }}
                    sx={{
                      "& button:focus": {
                        backgroundColor: "#063970",
                        color: "white",
                        width: 190,
                        height: 110,
                      },
                    }}
                  >
                    <Tab
                      label="Verified"
                      value="4"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                    <Tab
                      label="In Progress"
                      value="5"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                    <Tab
                      label="Closed"
                      value="6"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                  </Tabs>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <TabPanel value="4">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGridPro
                      sx={{ background: "white", fontSize: 18 }}
                      rows={verifiedTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={12}
                      components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            No verified RMA requessts
                          </Stack>
                        ),
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="5">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGridPro
                      sx={{ background: "white", fontSize: 18 }}
                      rows={inprogressTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={12}
                      components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            No closed RMA requessts
                          </Stack>
                        ),
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="6">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGridPro
                      sx={{ background: "white", fontSize: 18 }}
                      rows={closedTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={12}
                      components={{
                        Toolbar: GridToolbar,
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
              </Grid>
            </Grid>
          </TabContext>
        </>
      );
    }
    case "Warehouse Worker": {
      return (
        <>
          <h2 className="pagetitle"> RMA Requests </h2>

          <TabContext value={value || "1"}>
            <Grid container>
              <Grid item xs={11}>
                <Box sx={{ paddingLeft: 3, marginTop: 3 }}>
                  <Tabs
                    onChange={handleChange}
                    TabIndicatorProps={{
                      style: { backgroundColor: "#D97D54" },
                    }}
                    sx={{
                      "& button:focus": {
                        backgroundColor: "#063970",
                        color: "white",
                        width: 190,
                        height: 110,
                      },
                    }}
                  >
                    <Tab
                      label="Received"
                      value="3"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                  </Tabs>
                </Box>
              </Grid>


              <Grid item xs={12}>
                <TabPanel value="3">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGridPro
                      sx={{ background: "white", fontSize: 18 }}
                      rows={receivedTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={12}
                      components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            No received RMA requessts
                          </Stack>
                        ),
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
              </Grid>
            </Grid>
          </TabContext>
        </>
      );
    }
    case "Admin": {
      return (
        <>
          <h2 className="pagetitle"> RMA Requests </h2>

          <TabContext value={value || "1"}>
            <Grid container>
              <Grid item xs={11}>
                <Box sx={{ paddingLeft: 3, marginTop: 3 }}>
                  <Tabs
                    onChange={handleChange}
                    TabIndicatorProps={{
                      style: { backgroundColor: "#D97D54" },
                    }}
                    sx={{
                      "& button:focus": {
                        backgroundColor: "#063970",
                        color: "white",
                        width: 190,
                        height: 110,
                      },
                    }}
                  >
                    <Tab
                      label="Pending"
                      value="1"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                    <Tab
                      label="Approved"
                      value="2"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                    <Tab
                      label="Received"
                      value="3"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                    <Tab
                      label="Verified"
                      value="4"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                    <Tab
                      label="In Progress"
                      value="5"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                    <Tab
                      label="Closed"
                      value="6"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                  </Tabs>
                </Box>
              </Grid>


              <Grid item xs={12}>
                <TabPanel value="1">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGrid
                      sx={{ background: "white", fontSize: 18 }}
                      rows={pendingTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={pageSize}
                      onPageSizeChange={(newPage) => setPageSize(newPage)}
                      pagination
                      components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            No pending RMA requests
                          </Stack>
                        ),
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGridPro
                      sx={{ background: "white", fontSize: 18 }}
                      rows={approvedTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={12}
                      components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            No approved RMA requessts
                          </Stack>
                        ),
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="3">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGridPro
                      sx={{ background: "white", fontSize: 18 }}
                      rows={receivedTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={12}
                      components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            No received RMA requessts
                          </Stack>
                        ),
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="4">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGridPro
                      sx={{ background: "white", fontSize: 18 }}
                      rows={verifiedTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={12}
                      components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            No verified RMA requessts
                          </Stack>
                        ),
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="5">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGridPro
                      sx={{ background: "white", fontSize: 18 }}
                      rows={inprogressTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={12}
                      components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            No closed RMA requessts
                          </Stack>
                        ),
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="6">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGridPro
                      sx={{ background: "white", fontSize: 18 }}
                      rows={closedTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={12}
                      components={{
                        Toolbar: GridToolbar,
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
              </Grid>
            </Grid>
          </TabContext>
        </>
      );
    }
    default: {
      return (
        <>
          <h2 className="pagetitle"> RMA Requests </h2>

          <TabContext value={value || "1"}>
            <Grid container>
              <Grid item xs={11}>
                <Box sx={{ paddingLeft: 3, marginTop: 3 }}>
                  <Tabs
                    onChange={handleChange}
                    TabIndicatorProps={{
                      style: { backgroundColor: "#D97D54" },
                    }}
                    sx={{
                      "& button:focus": {
                        backgroundColor: "#063970",
                        color: "white",
                        width: 190,
                        height: 110,
                      },
                    }}
                  >
                    <Tab
                      label="Pending"
                      value="1"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                    <Tab
                      label="Approved"
                      value="2"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                    <Tab
                      label="Received"
                      value="3"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                    <Tab
                      label="Verified"
                      value="4"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                    <Tab
                      label="In Progress"
                      value="5"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                    <Tab
                      label="Closed"
                      value="6"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: 100,
                        width: 180,
                      }}
                    />
                  </Tabs>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <TabPanel value="1">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGrid
                      sx={{ background: "white", fontSize: 18 }}
                      rows={pendingTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={pageSize}
                      onPageSizeChange={(newPage) => setPageSize(newPage)}
                      pagination
                      components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            No pending RMA requests
                          </Stack>
                        ),
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGridPro
                      sx={{ background: "white", fontSize: 18 }}
                      rows={approvedTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={12}
                      components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            No approved RMA requessts
                          </Stack>
                        ),
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="3">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGridPro
                      sx={{ background: "white", fontSize: 18 }}
                      rows={receivedTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={12}
                      components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            No received RMA requessts
                          </Stack>
                        ),
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="4">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGridPro
                      sx={{ background: "white", fontSize: 18 }}
                      rows={verifiedTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={12}
                      components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            No verified RMA requessts
                          </Stack>
                        ),
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="5">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGridPro
                      sx={{ background: "white", fontSize: 18 }}
                      rows={inprogressTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={12}
                      components={{
                        Toolbar: GridToolbar,
                        NoRowsOverlay: () => (
                          <Stack
                            height="100%"
                            alignItems="center"
                            justifyContent="center"
                          >
                            No closed RMA requessts
                          </Stack>
                        ),
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="6">
                  <div style={{ height: 700, width: "100%" }}>
                    <DataGridPro
                      sx={{ background: "white", fontSize: 18 }}
                      rows={closedTable}
                      columns={columns}
                      getRowId={(row) => row.RmaID}
                      pageSize={12}
                      components={{
                        Toolbar: GridToolbar,
                      }}
                      filterModel={filterModel}
                      onFilterModelChange={(newFilterModel) =>
                        setFilterModel(newFilterModel)
                      }
                      onRowClick={(params: GridRowParams) => {
                        navigate(`/rmaDetails/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
              </Grid>
            </Grid>
          </TabContext>
        </>
      );
    }
  }
};
export default Rmatabs;
