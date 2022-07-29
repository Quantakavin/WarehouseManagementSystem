import PostAddIcon from "@mui/icons-material/PostAdd";
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
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
    GridToolbarQuickFilter
} from "@mui/x-data-grid";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import { useAppSelector } from "../../app/hooks";
import { selectId, selectRole } from "../../app/reducers/CurrentUserSlice";

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
  const [value, setValue] = useState(0); // first tab

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
    fetch("http://localhost:5000/api/checklistRMA")
      .then((data) => data.json())
      .then((data) => setChecklistTable(data));
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
    const fetchPendingData = async () => {
      // get the data from the api
      const pendingrmadata = await axios
        .get(`http://localhost:5000/api/myPendingRMA/${userid}`)
        .then((pendingrmadata) => setMPTable(pendingrmadata.data));
      // setRma(Object.e)
    };
    // declare the async data fetching function
    const fetchAcceptedData = async () => {
      // get the data from the api
      const acceptedrmadata = await axios
        .get(`http://localhost:5000/api/myAcceptedRMA/${userid}`)
        .then((acceptedrmadata) => setMATable(acceptedrmadata.data));
      // setRma(Object.e)
    };
    const fetchRejectedData = async () => {
      // get the data from the api
      const rejectedrmadata = await axios
        .get(`http://localhost:5000/api/myRejectedRMA/${userid}`)
        .then((rejectedrmadata) => setMRTable(rejectedrmadata.data));
      // setRma(Object.e)
    };
    const fetchInProgressData = async () => {
      // get the data from the api
      const inprogressrmadata = await axios
        .get(`http://localhost:5000/api/myIPRMA/${userid}`)
        .then((inprogressrmadata) => setMIPTable(inprogressrmadata.data));
      // setRma(Object.e)
    };
    // call the function
    fetchPendingData();
    fetchAcceptedData();
    fetchRejectedData();
    fetchInProgressData();
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
                        sx={{ background: "white", fontSize: 18 }}
                        rows={myPendingTable}
                        columns={columns}
                        editMode="row"
                        getRowId={(row) => row.RmaID}
                        pageSize={pageSize}
                        onPageSizeChange={(newPage) => setPageSize(newPage)}
                        pagination
                        components={{
                          Toolbar: CustomToolbar,
                          NoRowsOverlay: () => (
                            <Stack
                              height="100%"
                              alignItems="center"
                              justifyContent="center"
                            >
                              No approved RMA requests
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
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <Box sx={{ display: "flex", height: 600, width: "100%" }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <DataGrid
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
                          Toolbar: CustomToolbar,
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
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value="3">
                  <Box sx={{ display: "flex", height: 600, width: "100%" }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <DataGrid
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
                          Toolbar: CustomToolbar,
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
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value="4">
                  <Box sx={{ display: "flex", height: 600, width: "100%" }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <DataGrid
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
                          Toolbar: CustomToolbar,
                          NoRowsOverlay: () => (
                            <Stack
                              height="100%"
                              alignItems="center"
                              justifyContent="center"
                            >
                              No RMA requests in progress
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
                    sx={{ background: "white", fontSize: 18 }}
                    rows={receivedTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={12}
                    components={{
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: () => (
                        <Stack
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          No received RMA requests
                        </Stack>
                      ),
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
                      Toolbar: CustomToolbar,
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
                </Box>
              </TabPanel>
              <TabPanel value="2" sx={{ height: "inherit", width: "inherit" }}>
                <Box sx={{ height: "inherit", width: "inherit" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={approvedTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={pageSize}
                    onPageSizeChange={(newPage) => setPageSize(newPage)}
                    pagination
                    components={{
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: () => (
                        <Stack
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          No approved RMA requests
                        </Stack>
                      ),
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
                    sx={{ background: "white", fontSize: 18 }}
                    rows={receivedTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={12}
                    components={{
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: () => (
                        <Stack
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          No received RMA requests
                        </Stack>
                      ),
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
                    sx={{ background: "white", fontSize: 18 }}
                    rows={verifiedTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={12}
                    components={{
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: () => (
                        <Stack
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          No verified RMA requests
                        </Stack>
                      ),
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
                    sx={{ background: "white", fontSize: 18 }}
                    rows={inprogressTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={12}
                    components={{
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: () => (
                        <Stack
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          No RMA requests in progress
                        </Stack>
                      ),
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
                    sx={{ background: "white", fontSize: 18 }}
                    rows={closedTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={12}
                    components={{
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: () => (
                        <Stack
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          No closed RMA requests
                        </Stack>
                      ),
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
                    sx={{ background: "white", fontSize: 18 }}
                    rows={verifiedTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={12}
                    components={{
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: () => (
                        <Stack
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          No verified RMA requests
                        </Stack>
                      ),
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
                    sx={{ background: "white", fontSize: 18 }}
                    rows={inprogressTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={12}
                    components={{
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: () => (
                        <Stack
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          No RMA requests in progress
                        </Stack>
                      ),
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
                    sx={{ background: "white", fontSize: 18 }}
                    rows={closedTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={12}
                    components={{
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: () => (
                        <Stack
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          No closed RMA requests
                        </Stack>
                      ),
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
                    sx={{ background: "white", fontSize: 18 }}
                    rows={approvedTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={pageSize}
                    onPageSizeChange={(newPage) => setPageSize(newPage)}
                    pagination
                    components={{
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: () => (
                        <Stack
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          No approved RMA requests
                        </Stack>
                      ),
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
                    sx={{ background: "white", fontSize: 18 }}
                    rows={checklistTable}
                    columns={columns}
                    getRowId={(row) => row.RmaID}
                    pageSize={pageSize}
                    onPageSizeChange={(newPage) => setPageSize(newPage)}
                    pagination
                    components={{
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: () => (
                        <Stack
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          No RMA product checklists in progress
                        </Stack>
                      ),
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
                    sx={{ background: "white", fontSize: 18 }}
                    rows={pendingTable}
                    columns={columns}
                    editMode="row"
                    getRowId={(row) => row.RmaID}
                    pageSize={pageSize}
                    onPageSizeChange={(newPage) => setPageSize(newPage)}
                    pagination
                    components={{
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: () => (
                        <Stack
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          No approved RMA requests
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
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <Box sx={{ display: "flex", height: 600, width: "100%" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <DataGrid
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
                      Toolbar: CustomToolbar,
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
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value="3">
              <Box sx={{ display: "flex", height: 600, width: "100%" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <DataGrid
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
                      Toolbar: CustomToolbar,
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
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value="4">
              <Box sx={{ display: "flex", height: 600, width: "100%" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <DataGrid
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
                      Toolbar: CustomToolbar,
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
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value="5">
              <Box sx={{ display: "flex", height: 600, width: "100%" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <DataGrid
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
                      Toolbar: CustomToolbar,
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
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value="6">
              <Box sx={{ display: "flex", height: 600, width: "100%" }}>
                <Box sx={{ flexGrow: 1 }}>
                  <DataGrid
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
                      Toolbar: CustomToolbar,
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
