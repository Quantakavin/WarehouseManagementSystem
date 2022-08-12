import PostAddIcon from "@mui/icons-material/PostAdd";
import { TabContext, TabPanel } from "@mui/lab";
import {
  Box,
  LinearProgress,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
  styled,
} from "@mui/material";
import Fab from "@mui/material/Fab";
import {
  DataGrid,
  GridFilterModel,
  GridRowParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectId, selectRole } from "../../app/reducers/CurrentUserSlice";
import { ChangeTab } from "../../app/reducers/SidebarSlice";
import config from "../../config/config";

const Rmatabs: React.FC = () => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = React.useState(25);
  const userid = useAppSelector(selectId);
  const userrole = useAppSelector(selectRole);
  const [pendingTable, setPendingTable] = useState([]);
  const [approvedTable, setApprovedTable] = useState([]);
  const [checklistTable, setChecklistTable] = useState([]);
  const [receivedTable, setReceivedTable] = useState([]);
  const [verifiedTable, setVerifiedTable] = useState([]);
  const [inprogressTable, setInProgressTable] = useState([]);
  const [closedTable, setClosedTable] = useState([]);
  const [myPendingTable, setMPTable] = useState([]);
  const [myAcceptedTable, setMATable] = useState([]);
  const [myRejectedTable, setMRTable] = useState([]);
  const [myInProgressTable, setMIPTable] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [value, setValue] = useState(); // first tab
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ChangeTab({ currenttab: "RMA" }));
  });

  useEffect(() => {
    setTableLoading(true);
    fetch(`${config.baseURL}/pendingRMA`)
      .then((data) => data.json())
      .then((data) => setPendingTable(data));
    setTableLoading(false);
  }, []);

  useEffect(() => {
    setTableLoading(true);
    fetch(`${config.baseURL}/acceptedRMA`)
      .then((data) => data.json())
      .then((data) => setApprovedTable(data));
    setTableLoading(false);
  }, []);

  useEffect(() => {
    setTableLoading(true);
    fetch(`${config.baseURL}/checklistRMA`)
      .then((data) => data.json())
      .then((data) => setChecklistTable(data));
    setTableLoading(false);
  }, []);

  useEffect(() => {
    setTableLoading(true);
    fetch(`${config.baseURL}/receivedRMA`)
      .then((data) => data.json())
      .then((data) => setReceivedTable(data));
    setTableLoading(false);
  }, []);

  useEffect(() => {
    setTableLoading(true);
    fetch(`${config.baseURL}/verifiedRMA`)
      .then((data) => data.json())
      .then((data) => setVerifiedTable(data));
    setTableLoading(false);
  }, []);

  useEffect(() => {
    setTableLoading(true);
    fetch(`${config.baseURL}/inprogressRMA`)
      .then((data) => data.json())
      .then((data) => setInProgressTable(data));
    setTableLoading(false);
  }, []);

  useEffect(() => {
    setTableLoading(true);
    fetch(`${config.baseURL}/closedRMA`)
      .then((data) => data.json())
      .then((data) => setClosedTable(data));
    setTableLoading(false);
  }, []);

  useEffect(() => {
    setTableLoading(true);
    // declare the async data fetching function
    const fetchPendingData = async () => {
      // get the data from the api
      await axios
        .get(`${config.baseURL}/myPendingRMA/${userid}`)
        .then((pendingrmadata) => setMPTable(pendingrmadata.data));
      // setRma(Object.e)
    };
    // declare the async data fetching function
    const fetchAcceptedData = async () => {
      // get the data from the api
      await axios
        .get(`${config.baseURL}/myAcceptedRMA/${userid}`)
        .then((acceptedrmadata) => setMATable(acceptedrmadata.data));
      // setRma(Object.e)
    };
    const fetchRejectedData = async () => {
      // get the data from the api
      await axios
        .get(`${config.baseURL}/myRejectedRMA/${userid}`)
        .then((rejectedrmadata) => setMRTable(rejectedrmadata.data));
      // setRma(Object.e)
    };
    const fetchInProgressData = async () => {
      // get the data from the api
      await axios
        .get(`${config.baseURL}/myIPRMA/${userid}`)
        .then((inprogressrmadata) => setMIPTable(inprogressrmadata.data));
      // setRma(Object.e)
    };
    // call the function
    fetchPendingData();
    fetchAcceptedData();
    fetchRejectedData();
    fetchInProgressData();
    setTableLoading(false);
    // make sure to catch any error
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

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const columns = [
    { field: "RmaID", headerName: "ID", flex: 1 },
    { field: "Username", headerName: "Employee", flex: 8 },
    { field: "DateTime", headerName: "Date", flex: 8 },
    { field: "Company", headerName: "Company", flex: 8 },
    { field: "CustomerEmail", headerName: "Customer Email", flex: 8 },
  ];

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer
        sx={{ display: "flex", flexWrap: "wrap", maxWidth: 380, p: 1 }}
      >
        <Box>
          <GridToolbarQuickFilter sx={{ color: "#0A2540" }} debounceMs={1000} />
        </Box>
        <Box>
          <GridToolbarColumnsButton sx={{ color: "#0A2540" }} />
          <GridToolbarFilterButton sx={{ color: "#0A2540" }} />
          <GridToolbarDensitySelector sx={{ color: "#0A2540" }} />
          <GridToolbarExport sx={{ color: "#0A2540" }} />
        </Box>
      </GridToolbarContainer>
    );
  };

  const StyledGridOverlay = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "& .ant-empty-img-1": {
      fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
    },
    "& .ant-empty-img-2": {
      fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
    },
    "& .ant-empty-img-3": {
      fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
    },
    "& .ant-empty-img-4": {
      fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
    },
    "& .ant-empty-img-5": {
      fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
      fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
    },
  }));

  function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <svg
          width="120"
          height="100"
          viewBox="0 0 184 152"
          aria-hidden
          focusable="false"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse
                className="ant-empty-img-5"
                cx="67.797"
                cy="106.89"
                rx="67.797"
                ry="12.668"
              />
              <path
                className="ant-empty-img-1"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
              />
              <path
                className="ant-empty-img-2"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
              />
              <path
                className="ant-empty-img-3"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
              />
            </g>
            <path
              className="ant-empty-img-3"
              d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            />
            <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
            </g>
          </g>
        </svg>
        <Box sx={{ mt: 1 }}>No RMA Requests Found</Box>
      </StyledGridOverlay>
    );
  }

  console.log(pendingTable);

  switch (userrole) {
    case "Sales Engineer": {
      return (
        <TabContext value={value || "1"}>
          <Grid container>
            <Grid item xs={12} sx={{ paddingLeft: 3, paddingTop: 1 }}>
              <Typography
                sx={{ color: "#063970", fontWeight: "bold", fontSize: 36 }}
              >
                {" "}
                RMA Requests{" "}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  ml: 3,
                  mr: 3,
                }}
              >
                <Box sx={{ width: 1 }}>
                  <Tabs
                    onChange={handleChange}
                    TabIndicatorProps={{
                      style: { backgroundColor: "#D97D54" },
                    }}
                    sx={{
                      width: "100%",
                      "& button:focus": {
                        backgroundColor: "#063970",
                        color: "white",
                        width: "30%",
                        height: "100%",
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
                        height: "100%",
                        width: "15%",
                      }}
                    />
                    <Tab
                      label="Accepted"
                      value="2"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: "100%",
                        width: "15%",
                      }}
                    />
                    <Tab
                      label="Rejected"
                      value="3"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: "100%",
                        width: "15%",
                      }}
                    />
                    <Tab
                      label="In Progress"
                      value="4"
                      sx={{
                        color: "grey",
                        backgroundColor: "White",
                        borderRadius: 2,
                        marginRight: 2,
                        height: "100%",
                        width: "15%",
                      }}
                    />
                  </Tabs>
                </Box>
                <Box>
                  <motion.div
                    className="animatable"
                    whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Fab
                      variant="extended"
                      aria-label="add"
                      onClick={() => navigate("/createRMA")}
                      sx={{
                        color: "white",
                        backgroundColor: "#063970",
                        ":hover": { backgroundColor: "#031c38" },
                      }}
                    >
                      Create
                      <PostAddIcon sx={{ ml: 2 }} />
                    </Fab>
                  </motion.div>
                </Box>
              </Box>
              <Box sx={{ paddingLeft: 3 }} />
            </Grid>
            <Grid item xs={12}>
              <Box>
                <TabPanel value="1">
                  <Box sx={{ display: "flex", height: 600, width: "100%" }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <DataGrid
                        loading={tableLoading}
                        sx={{ background: "white", fontSize: 18 }}
                        rows={myPendingTable}
                        columns={columns}
                        editMode="row"
                        getRowId={(row) => row.RmaID}
                        pageSize={pageSize}
                        onPageSizeChange={(newPage) => setPageSize(newPage)}
                        pagination
                        components={{
                          LoadingOverlay: LinearProgress,
                          Toolbar: CustomToolbar,
                          NoRowsOverlay: CustomNoRowsOverlay,
                        }}
                        filterModel={filterModel}
                        onFilterModelChange={(newFilterModel) =>
                          setFilterModel(newFilterModel)
                        }
                        onRowClick={(params: GridRowParams) => {
                          navigate(`/rmaDetails/${params.id}`);
                        }}
                      />
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <Box sx={{ display: "flex", height: 600, width: "100%" }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <DataGrid
                        loading={tableLoading}
                        sx={{
                          background: "white",
                          fontSize: 18,
                        }}
                        rows={myAcceptedTable}
                        columns={columns}
                        getRowId={(row) => row.RmaID}
                        pageSize={pageSize}
                        onPageSizeChange={(newPage) => setPageSize(newPage)}
                        pagination
                        components={{
                          LoadingOverlay: LinearProgress,
                          NoRowsOverlay: CustomNoRowsOverlay,
                        }}
                        filterModel={filterModel}
                        onFilterModelChange={(newFilterModel) =>
                          setFilterModel(newFilterModel)
                        }
                        onRowClick={(params: GridRowParams) => {
                          navigate(`/rmaDetails/${params.id}`);
                        }}
                      />
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value="3">
                  <Box sx={{ display: "flex", height: 600, width: "100%" }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <DataGrid
                        loading={tableLoading}
                        sx={{
                          background: "white",
                          fontSize: 18,
                        }}
                        rows={myRejectedTable}
                        columns={columns}
                        getRowId={(row) => row.RmaID}
                        pageSize={pageSize}
                        onPageSizeChange={(newPage) => setPageSize(newPage)}
                        pagination
                        components={{
                          LoadingOverlay: LinearProgress,
                          Toolbar: CustomToolbar,
                          NoRowsOverlay: CustomNoRowsOverlay,
                        }}
                        filterModel={filterModel}
                        onFilterModelChange={(newFilterModel) =>
                          setFilterModel(newFilterModel)
                        }
                        onRowClick={(params: GridRowParams) => {
                          navigate(`/rmaDetails/${params.id}`);
                        }}
                      />
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value="4">
                  <Box sx={{ display: "flex", height: 600, width: "100%" }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <DataGrid
                        loading={tableLoading}
                        sx={{
                          background: "white",
                          fontSize: 18,
                        }}
                        rows={myInProgressTable}
                        columns={columns}
                        getRowId={(row) => row.RmaID}
                        pageSize={pageSize}
                        onPageSizeChange={(newPage) => setPageSize(newPage)}
                        pagination
                        components={{
                          LoadingOverlay: LinearProgress,
                          Toolbar: CustomToolbar,
                          NoRowsOverlay: CustomNoRowsOverlay,
                        }}
                        filterModel={filterModel}
                        onFilterModelChange={(newFilterModel) =>
                          setFilterModel(newFilterModel)
                        }
                        onRowClick={(params: GridRowParams) => {
                          navigate(`/rmaDetails/${params.id}`);
                        }}
                      />
                    </Box>
                  </Box>
                </TabPanel>
              </Box>
            </Grid>
          </Grid>
        </TabContext>
      );
    }
    case "Technical Staff": {
      return (
        <TabContext value={value || "3"}>
          <Grid
            container
            sx={{
              height: 800,
              width: "100%",
            }}
          >
            <Grid item xs={12}>
              <Box sx={{ paddingLeft: 3, paddingTop: 1 }}>
                <Typography
                  sx={{ color: "#063970", fontWeight: "bold", fontSize: 36 }}
                >
                  {" "}
                  RMA Requests{" "}
                </Typography>
                <Tabs
                  onChange={handleChange}
                  TabIndicatorProps={{
                    style: { backgroundColor: "#D97D54" },
                  }}
                  sx={{
                    "& button:focus": {
                      backgroundColor: "#063970",
                      color: "white",
                      width: "30%",
                      height: "100%",
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
                      height: "100%",
                      width: "15%",
                    }}
                  />
                </Tabs>
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ height: "inherit" }}>
              <TabPanel value="3" sx={{ height: "inherit", width: "inherit" }}>
                <Box sx={{ height: "inherit", width: "inherit" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={receivedTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={12}
                    components={{
                      LoadingOverlay: LinearProgress,
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    componentsProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                      },
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/rmaDetails/${params.id}`);
                    }}
                  />
                </Box>
              </TabPanel>
            </Grid>
          </Grid>
        </TabContext>
      );
    }
    case "Sales Manager": {
      return (
        <TabContext value={value || "1"}>
          <Grid
            container
            sx={{
              height: 800,
              width: "100%",
            }}
          >
            <Grid item xs={12}>
              <Box sx={{ pl: 3, pt: 1 }}>
                <Typography
                  sx={{ color: "#063970", fontWeight: "bold", fontSize: 36 }}
                >
                  {" "}
                  RMA Requests{" "}
                </Typography>
                <Tabs
                  onChange={handleChange}
                  TabIndicatorProps={{
                    style: { backgroundColor: "#D97D54" },
                  }}
                  sx={{
                    "& button:focus": {
                      backgroundColor: "#063970",
                      color: "white",
                      width: "30%",
                      height: "100%",
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
                      height: "100%",
                      width: "15%",
                    }}
                  />
                  <Tab
                    label="Accepted"
                    value="2"
                    sx={{
                      color: "grey",
                      backgroundColor: "White",
                      borderRadius: 2,
                      marginRight: 2,
                      height: "100%",
                      width: "15%",
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
                      height: "100%",
                      width: "15%",
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
                      height: "100%",
                      width: "15%",
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
                      height: "100%",
                      width: "15%",
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
                      height: "100%",
                      width: "15%",
                    }}
                  />
                </Tabs>
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ height: "inherit" }}>
              <TabPanel value="1" sx={{ height: "inherit", width: "inherit" }}>
                <Box sx={{ height: "inherit", width: "inherit" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{
                      background: "white",
                      fontSize: 18,
                      width: "inherit",
                      height: "inherit",
                    }}
                    rows={pendingTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={pageSize}
                    onPageSizeChange={(newPage) => setPageSize(newPage)}
                    pagination
                    components={{
                      LoadingOverlay: LinearProgress,
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/rmaDetails/${params.id}`);
                    }}
                  />
                </Box>
              </TabPanel>
              <TabPanel value="2" sx={{ height: "inherit", width: "inherit" }}>
                <Box sx={{ height: "inherit", width: "inherit" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={approvedTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={pageSize}
                    onPageSizeChange={(newPage) => setPageSize(newPage)}
                    pagination
                    components={{
                      LoadingOverlay: LinearProgress,
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    componentsProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                      },
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/rmaDetails/${params.id}`);
                    }}
                  />
                </Box>
              </TabPanel>
              <TabPanel value="3" sx={{ height: "inherit", width: "inherit" }}>
                <Box sx={{ height: "inherit", width: "inherit" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={receivedTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={12}
                    components={{
                      LoadingOverlay: LinearProgress,
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    componentsProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                      },
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/rmaDetails/${params.id}`);
                    }}
                  />
                </Box>
              </TabPanel>
              <TabPanel value="4" sx={{ height: "inherit", width: "inherit" }}>
                <Box sx={{ height: "inherit", width: "inherit" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={verifiedTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={12}
                    components={{
                      LoadingOverlay: LinearProgress,
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    componentsProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                      },
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/rmaDetails/${params.id}`);
                    }}
                  />
                </Box>
              </TabPanel>
              <TabPanel value="5" sx={{ height: "inherit", width: "inherit" }}>
                <Box sx={{ height: "inherit", width: "inherit" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={inprogressTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={12}
                    components={{
                      LoadingOverlay: LinearProgress,
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    componentsProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                      },
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/rmaDetails/${params.id}`);
                    }}
                  />
                </Box>
              </TabPanel>
              <TabPanel value="6" sx={{ height: "inherit", width: "inherit" }}>
                <Box sx={{ height: "inherit", width: "inherit" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={closedTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={12}
                    components={{
                      LoadingOverlay: LinearProgress,
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    componentsProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                      },
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/rmaDetails/${params.id}`);
                    }}
                  />
                </Box>
              </TabPanel>
            </Grid>
          </Grid>
        </TabContext>
      );
    }
    case "Sales Admin": {
      return (
        <Grid
          container
          sx={{
            height: 800,
            width: "100%",
          }}
        >
          <TabContext value={value || "4"}>
            <Grid item xs={12}>
              <Box sx={{ pl: 3, pt: 1 }}>
                <Typography
                  sx={{ color: "#063970", fontWeight: "bold", fontSize: 36 }}
                >
                  {" "}
                  RMA Requests{" "}
                </Typography>
                <Tabs
                  onChange={handleChange}
                  TabIndicatorProps={{
                    style: { backgroundColor: "#D97D54" },
                  }}
                  sx={{
                    "& button:focus": {
                      backgroundColor: "#063970",
                      color: "white",
                      width: "30%",
                      height: "100%",
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
                      height: "100%",
                      width: "15%",
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
                      height: "100%",
                      width: "15%",
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
                      height: "100%",
                      width: "15%",
                    }}
                  />
                </Tabs>
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ height: "inherit" }}>
              <TabPanel value="4" sx={{ height: "inherit", width: "inherit" }}>
                <Box sx={{ height: "inherit", width: "inherit" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={verifiedTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={12}
                    components={{
                      LoadingOverlay: LinearProgress,
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    componentsProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                      },
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/rmaDetails/${params.id}`);
                    }}
                  />
                </Box>
              </TabPanel>
              <TabPanel value="5" sx={{ height: "inherit", width: "inherit" }}>
                <Box sx={{ height: "inherit", width: "inherit" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={inprogressTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={12}
                    components={{
                      LoadingOverlay: LinearProgress,
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    componentsProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                      },
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/rmaDetails/${params.id}`);
                    }}
                  />
                </Box>
              </TabPanel>
              <TabPanel value="6" sx={{ height: "inherit", width: "inherit" }}>
                <Box sx={{ height: "inherit", width: "inherit" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={closedTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={12}
                    components={{
                      LoadingOverlay: LinearProgress,
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    componentsProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                      },
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/rmaDetails/${params.id}`);
                    }}
                  />
                </Box>
              </TabPanel>
            </Grid>
          </TabContext>
        </Grid>
      );
    }
    case "Warehouse Worker": {
      return (
        <Grid
          container
          sx={{
            height: 800,
            width: "100%",
          }}
        >
          <TabContext value={value || "2"}>
            <Grid item xs={12}>
              <Box sx={{ pl: 3, pt: 1 }}>
                <Typography
                  sx={{ color: "#063970", fontWeight: "bold", fontSize: 36 }}
                >
                  {" "}
                  RMA Requests{" "}
                </Typography>
                <Tabs
                  onChange={handleChange}
                  TabIndicatorProps={{
                    style: { backgroundColor: "#D97D54" },
                  }}
                  sx={{
                    "& button:focus": {
                      backgroundColor: "#063970",
                      color: "white",
                      width: "30%",
                      height: "100%",
                    },
                  }}
                >
                  <Tab
                    label="Inbound"
                    value="2"
                    sx={{
                      color: "grey",
                      backgroundColor: "White",
                      borderRadius: 2,
                      marginRight: 2,
                      height: "100%",
                      width: "15%",
                    }}
                  />
                  <Tab
                    label="Processing"
                    value="3"
                    sx={{
                      color: "grey",
                      backgroundColor: "White",
                      borderRadius: 2,
                      marginRight: 2,
                      height: "100%",
                      width: "15%",
                    }}
                  />
                </Tabs>
              </Box>
            </Grid>

            <Grid item xs={12} sx={{ height: "inherit" }}>
              <TabPanel value="2" sx={{ height: "inherit", width: "inherit" }}>
                <Box sx={{ height: "inherit", width: "inherit" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={approvedTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={pageSize}
                    onPageSizeChange={(newPage) => setPageSize(newPage)}
                    pagination
                    components={{
                      LoadingOverlay: LinearProgress,
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    componentsProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                      },
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/rmaDetails/${params.id}`);
                    }}
                  />
                </Box>
              </TabPanel>
              <TabPanel value="3" sx={{ height: "inherit", width: "inherit" }}>
                <Box sx={{ height: "inherit", width: "inherit" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={checklistTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={pageSize}
                    onPageSizeChange={(newPage) => setPageSize(newPage)}
                    pagination
                    components={{
                      LoadingOverlay: LinearProgress,
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    componentsProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                      },
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/rmaDetails/${params.id}`);
                    }}
                  />
                </Box>
              </TabPanel>
            </Grid>
          </TabContext>
        </Grid>
      );
    }
    case "Admin":
    default: {
      return (
        <TabContext value={value || "1"}>
          <Box sx={{ pl: 3, pt: 1 }}>
            <Typography
              sx={{ color: "#063970", fontWeight: "bold", fontSize: 36 }}
            >
              RMA Requests
            </Typography>
            <Tabs
              onChange={handleChange}
              TabIndicatorProps={{
                style: { backgroundColor: "#D97D54" },
              }}
              sx={{
                "& button:focus": {
                  backgroundColor: "#063970",
                  color: "white",
                  width: "30%",
                  height: "100%",
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
                  height: "100%",
                  width: "15%",
                }}
              />
              <Tab
                label="Accepted"
                value="2"
                sx={{
                  color: "grey",
                  backgroundColor: "White",
                  borderRadius: 2,
                  marginRight: 2,
                  height: "100%",
                  width: "15%",
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
                  height: "100%",
                  width: "15%",
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
                  height: "100%",
                  width: "15%",
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
                  height: "100%",
                  width: "15%",
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
                  height: "100%",
                  width: "15%",
                }}
              />
            </Tabs>
          </Box>
          <Box>
            <TabPanel value="1">
              <Box sx={{ display: "flex", height: 600, width: "100%" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={pendingTable}
                    columns={columns}
                    editMode="row"
                    getRowId={(row) => row.RmaID}
                    pageSize={pageSize}
                    onPageSizeChange={(newPage) => setPageSize(newPage)}
                    pagination
                    components={{
                      LoadingOverlay: LinearProgress,
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/rmaDetails/${params.id}`);
                    }}
                  />
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <Box sx={{ display: "flex", height: 600, width: "100%" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{
                      background: "white",
                      fontSize: 18,
                    }}
                    rows={approvedTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={pageSize}
                    onPageSizeChange={(newPage) => setPageSize(newPage)}
                    pagination
                    components={{
                      LoadingOverlay: LinearProgress,
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/rmaDetails/${params.id}`);
                    }}
                  />
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value="3">
              <Box sx={{ display: "flex", height: 600, width: "100%" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{
                      background: "white",
                      fontSize: 18,
                    }}
                    rows={receivedTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={pageSize}
                    onPageSizeChange={(newPage) => setPageSize(newPage)}
                    pagination
                    components={{
                      LoadingOverlay: LinearProgress,
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/rmaDetails/${params.id}`);
                    }}
                  />
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value="4">
              <Box sx={{ display: "flex", height: 600, width: "100%" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{
                      background: "white",
                      fontSize: 18,
                    }}
                    rows={verifiedTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={pageSize}
                    onPageSizeChange={(newPage) => setPageSize(newPage)}
                    pagination
                    components={{
                      LoadingOverlay: LinearProgress,
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/rmaDetails/${params.id}`);
                    }}
                  />
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value="5">
              <Box sx={{ display: "flex", height: 600, width: "100%" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{
                      background: "white",
                      fontSize: 18,
                    }}
                    rows={inprogressTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={pageSize}
                    onPageSizeChange={(newPage) => setPageSize(newPage)}
                    pagination
                    components={{
                      LoadingOverlay: LinearProgress,
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/rmaDetails/${params.id}`);
                    }}
                  />
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value="6">
              <Box sx={{ display: "flex", height: 600, width: "100%" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{
                      background: "white",
                      fontSize: 18,
                    }}
                    rows={closedTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={pageSize}
                    onPageSizeChange={(newPage) => setPageSize(newPage)}
                    pagination
                    components={{
                      LoadingOverlay: LinearProgress,
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/rmaDetails/${params.id}`);
                    }}
                  />
                </Box>
              </Box>
            </TabPanel>
          </Box>
        </TabContext>
      );
    }
  }
};

export default Rmatabs;
