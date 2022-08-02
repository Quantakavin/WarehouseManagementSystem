import { TabContext, TabPanel } from "@mui/lab";
import {
  Box,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
  unstable_createMuiStrictModeTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";

import PostAddIcon from "@mui/icons-material/PostAdd";
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
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectId, selectRole } from "../../app/reducers/CurrentUserSlice";

const columns = [
  { field: "TLoanID", headerName: "Loan No.", flex: 4 },
  { field: "StartDate", headerName: "Start Date", flex: 1 },
  { field: "EndDate", headerName: "End Date", flex: 4 },
  { field: "CompanyName", headerName: "Company Name", flex: 3 },
  { field: "CustomerEmail", headerName: "Customer Email", flex: 3 },
];

const managerColumns = [
  { field: "TLoanID", headerName: "Loan No.", flex: 2.5 },
  { field: "StartDate", headerName: "Start Date", flex: 1 },
  { field: "Requestor", headerName: "Employee Name", flex: 3 },
  { field: "TLoanType", headerName: "Loan Type", flex: 3 },
];
const TLoanTabs2: React.FC = () => {
  const userid = useAppSelector(selectId);
  const userrole = useAppSelector(selectRole);
  const [currentTable, setCurrentTable] = useState([]);
  const [pendingTable, setPendingTable] = useState([]);
  const [draftTable, setDraftTable] = useState([]);
  const [historyTable, setHistoryTable] = useState([]);
  const [managerLoan, setManagerLoan] = useState([]);
  const [extensionsTable, setExtensionTable] = useState([]);
  const [approvedTable, setApprovedTable] = useState([]);
  const [allCurrent, setAllCurrent] = useState([]);
  const [allHistory, setAllHistory] = useState([]);
  // Get and set current tloans data
  useEffect(() => {
    fetch(`http://localhost:5000/api/tloan/current/${userid}`)
      .then((data) => data.json())
      .then((data) => setCurrentTable(data));
  }, []);
  // Get and set pending tloans data
  useEffect(() => {
    fetch(`http://localhost:5000/api/tloan/pending/${userid}`)
      .then((data) => data.json())
      .then((data) => setPendingTable(data));
  }, []);
  // Get and set draft data
  useEffect(() => {
    fetch(`http://localhost:5000/api/tloan/drafts/${userid}`)
      .then((data) => data.json())
      .then((data) => setDraftTable(data));
  }, []);
  // Get and set history data
  useEffect(() => {
    fetch(`http://localhost:5000/api/tloan/history/${userid}`)
      .then((data) => data.json())
      .then((data) => setHistoryTable(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/api/tloan/ManagerLoan`)
      .then((data) => data.json())
      .then((data) => setManagerLoan(data));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/api/tloan/ManagerExtension`)
      .then((data) => data.json())
      .then((data) => setExtensionTable(data));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/api/tloan/approvedLoans`)
      .then((data) => data.json())
      .then((data) => setApprovedTable(data));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/api/tloan/allCurrent`)
      .then((data) => data.json())
      .then((data) => setAllCurrent(data));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/api/tloan/allHistory`)
      .then((data) => data.json())
      .then((data) => setAllHistory(data));
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

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer
        sx={{ display: "flex", flexWrap: "wrap", maxWidth: 613, p: 1 }}
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

  const navigate = useNavigate();
  const theme = unstable_createMuiStrictModeTheme();
  const [pageSize, setPageSize] = React.useState(25);
  const [inputName, setInputName] = useState<string>(null);

  const [value, setValue] = useState(); // first tab

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  switch (userrole) {
    case "Sales Engineer": {
      return (
        <TabContext value={value || "1"}>
          <Grid container>
            <Grid item xs={12} sx={{ pl: 3, pt: 1 }}>
              <Typography
                sx={{ color: "#063970", fontWeight: "bold", fontSize: 36 }}
              >
                TLoans
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
                      label="Current"
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
                      label="Pending"
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
                      label="Drafts"
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
                      label="History"
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
                      onClick={() => navigate("/products")}
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
              <TabPanel value="1">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={currentTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
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
                          No current TLoans
                        </Stack>
                      ),
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={pendingTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
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
                          No pending Tloans
                        </Stack>
                      ),
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={draftTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
                    pageSize={12}
                    components={{
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: () => (
                        <Stack
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          No drafted TLoans
                        </Stack>
                      ),
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="4">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={historyTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
                    pageSize={12}
                    components={{
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: () => (
                        <Stack
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          No History
                        </Stack>
                      ),
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
            </Grid>
          </Grid>
        </TabContext>
      );
    }
    case "Technical Staff": {
      return (
        <TabContext value={value || "1"}>
          <Grid container>
            <Grid item xs={12} sx={{ pl: 3, pt: 1 }}>
              <Typography
                sx={{ color: "#063970", fontWeight: "bold", fontSize: 36 }}
              >
                TLoans
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
                      label="Current"
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
                      label="Pending"
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
                      label="Drafts"
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
                      label="History"
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
                      onClick={() => navigate("/products")}
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
              <TabPanel value="1">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={currentTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
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
                          No current TLoans
                        </Stack>
                      ),
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={pendingTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
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
                          No pending Tloans
                        </Stack>
                      ),
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={draftTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
                    pageSize={12}
                    components={{
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: () => (
                        <Stack
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          No drafted TLoans
                        </Stack>
                      ),
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="4">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={historyTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
                    pageSize={12}
                    components={{
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: () => (
                        <Stack
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          No History
                        </Stack>
                      ),
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
            </Grid>
          </Grid>
        </TabContext>
      );
    }
    case "Sales Manager": {
      return (
        <TabContext value={value || "1"}>
          <Grid container>
            <Grid item xs={12}>
              <Box sx={{ pl: 3, pt: 1 }}>
                <Typography
                  sx={{ color: "#063970", fontWeight: "bold", fontSize: 36 }}
                >
                  TLoans
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
                      height: "100%",
                      width: "30%",
                    },
                  }}
                >
                  <Tab
                    label="Loans"
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
                    label="Extensions"
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
                </Tabs>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TabPanel value="1">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={managerLoan}
                    columns={managerColumns}
                    getRowId={(row) => row.TLoanID}
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
                          No current TLoans
                        </Stack>
                      ),
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={extensionsTable}
                    columns={managerColumns}
                    getRowId={(row) => row.TLoanID}
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
                          No pending Tloans
                        </Stack>
                      ),
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/tloanManagerExtension/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
            </Grid>
          </Grid>
        </TabContext>
      );
    }
    case "Sales Admin": {
      return (
        <TabContext value={value || "1"}>
          <Grid container>
            <Grid item xs={12} sx={{ pl: 3, pt: 1 }}>
              <Typography
                sx={{ color: "#063970", fontWeight: "bold", fontSize: 36 }}
              >
                TLoans
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
                      label="Current"
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
                      label="Pending"
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
                      label="Drafts"
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
                      label="History"
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
                      onClick={() => navigate("/products")}
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
              <TabPanel value="1">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={currentTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
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
                          No current TLoans
                        </Stack>
                      ),
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={pendingTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
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
                          No pending Tloans
                        </Stack>
                      ),
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={draftTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
                    pageSize={12}
                    components={{
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: () => (
                        <Stack
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          No drafts
                        </Stack>
                      ),
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/tloanDetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="4">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={historyTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
                    pageSize={12}
                    components={{
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: () => (
                        <Stack
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          No History
                        </Stack>
                      ),
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
            </Grid>
          </Grid>
        </TabContext>
      );
    }
    case "Warehouse Worker": {
      return (
        <TabContext value={value || "1"}>
          <Grid container>
            <Grid item xs={12}>
              <Box sx={{ pl: 3, pt: 1 }}>
                <Typography
                  sx={{ color: "#063970", fontWeight: "bold", fontSize: 36 }}
                >
                  TLoans
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
                      height: "15%",
                      width: "15%",
                    },
                  }}
                >
                  <Tab
                    label="Approved"
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
                </Tabs>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TabPanel value="1">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={approvedTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
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
                          No current TLoans
                        </Stack>
                      ),
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
            </Grid>
          </Grid>
        </TabContext>
      );
    }
    case "Admin": {
      return (
        <TabContext value={value || "1"}>
          <Grid container>
            <Grid item xs={12}>
              <Box sx={{ pl: 3, pt: 1 }}>
                <Typography
                  sx={{ color: "#063970", fontWeight: "bold", fontSize: 36 }}
                >
                  TLoans
                </Typography>
              </Box>
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
                      label="Current"
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
                      label="History"
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
                  </Tabs>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TabPanel value="1">
                <div style={{ display: "flex", height: 600, width: "100%" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={allCurrent}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
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
                          No current TLoans
                        </Stack>
                      ),
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>

              <TabPanel value="2">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={allHistory}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
                    pageSize={12}
                    components={{
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: () => (
                        <Stack
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          No History
                        </Stack>
                      ),
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
            </Grid>
          </Grid>
        </TabContext>
      );
    }
    default: {
      return (
        <TabContext value={value || "1"}>
          <Grid container>
            <Grid item xs={12} sx={{ pl: 3, pt: 1 }}>
              <Typography
                sx={{ color: "#063970", fontWeight: "bold", fontSize: 36 }}
              >
                TLoans
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
                      label="Current"
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
                      label="Pending"
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
                      label="Drafts"
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
                      label="History"
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
                      onClick={() => navigate("/products")}
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
              <TabPanel value="1">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={currentTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
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
                          No current TLoans
                        </Stack>
                      ),
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={pendingTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
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
                          No pending Tloans
                        </Stack>
                      ),
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={draftTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
                    pageSize={12}
                    components={{
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: () => (
                        <Stack
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          No drafts
                        </Stack>
                      ),
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="4">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    sx={{ background: "white", fontSize: 18 }}
                    rows={historyTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
                    pageSize={12}
                    components={{
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: () => (
                        <Stack
                          height="100%"
                          alignItems="center"
                          justifyContent="center"
                        >
                          No History
                        </Stack>
                      ),
                    }}
                    filterModel={filterModel}
                    onFilterModelChange={(newFilterModel) =>
                      setFilterModel(newFilterModel)
                    }
                    onRowClick={(params: GridRowParams) => {
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
            </Grid>
          </Grid>
        </TabContext>
      );
    }
  }
};

export default TLoanTabs2;
