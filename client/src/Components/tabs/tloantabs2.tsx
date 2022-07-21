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
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import TableNew from "../table/InfiniteTable";
import { useAppSelector } from "../../app/hooks";
import { selectRole, selectId } from "../../app/reducers/CurrentUserSlice";
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
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { DataGridPro } from "@mui/x-data-grid-pro";

const columns = [
  { field: "TLoanNumber", headerName: "Loan No.", flex: 4 },
  { field: "StartDate", headerName: "Start Date", flex: 1 },
  { field: "EndDate", headerName: "End Date", flex: 4 },
  { field: "CompanyName", headerName: "Company Name", flex: 3 },
  { field: "CustomerEmail", headerName: "Customer Email", flex: 3 },
];

const managerColumns = [
  { field: "TLoanNumber", headerName: "Loan No.", flex: 2.5 },
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
  //Get and set current tloans data
  useEffect(() => {
    fetch(`http://localhost:5000/api/tloan/current/${userid}`)
      .then((data) => data.json())
      .then((data) => setCurrentTable(data));
  }, []);
  //Get and set pending tloans data
  useEffect(() => {
    fetch(`http://localhost:5000/api/tloan/pending/${userid}`)
      .then((data) => data.json())
      .then((data) => setPendingTable(data));
  }, []);
  //Get and set draft data
  useEffect(() => {
    fetch(`http://localhost:5000/api/tloan/drafts/${userid}`)
      .then((data) => data.json())
      .then((data) => setDraftTable(data));
  }, []);
  //Get and set history data
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

  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [
      {
        columnField: "Company Name",
        operatorValue: "=",
        value: "SERVO_LIVE",
      },
    ],
  });

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{display: "flex", flexWrap: "wrap", maxWidth: 613, p: 1}}>
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
  }

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
          <TabContext value={value || "1"}>
            <Grid container>
              <Grid item xs={11}>
                <Box sx={{ paddingLeft: 3, marginTop: 3 }}>
                  <h2> TLoans </h2>
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
              </Grid>
              <Grid item xs={1}>
                <Box sx={{ paddingLeft: 10, marginTop: 8 }}>
                  <React.StrictMode>
                    <ThemeProvider theme={theme}>
                      <Fab
                        aria-label="add"
                        onClick={() => navigate("/newtloan")}
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
                  <div style={{ height: 600, width: "100%" }}>
                    <DataGrid
                      sx={{ background: "white", fontSize: 18 }}
                      rows={currentTable}
                      columns={columns}
                      getRowId={(row) => row.TLoanNumber}
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
                      getRowId={(row) => row.TLoanNumber}
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
                      getRowId={(row) => row.TLoanNumber}
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
                      getRowId={(row) => row.TLoanNumber}
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
        </>
      );
    }
    case "Technical Staff": {
      return (
        <>
          <TabContext value={value || "1"}>
            <Grid container>
              <Grid item xs={11}>
                <Box sx={{ paddingLeft: 3, marginTop: 3 }}>
                  <h2> TLoans </h2>
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
              </Grid>
              <Grid item xs={1}>
                <Box sx={{ paddingLeft: 10, marginTop: 8 }}>
                  <React.StrictMode>
                    <ThemeProvider theme={theme}>
                      <Fab
                        aria-label="add"
                        onClick={() => navigate("/newtloan")}
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
                  <div style={{ height: 600, width: "100%" }}>
                    <DataGrid
                      sx={{ background: "white", fontSize: 18 }}
                      rows={currentTable}
                      columns={columns}
                      getRowId={(row) => row.TLoanNumber}
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
                      getRowId={(row) => row.TLoanNumber}
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
                      getRowId={(row) => row.TLoanNumber}
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
                      getRowId={(row) => row.TLoanNumber}
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
        </>
      );
    }
    case "Sales Manager": {
      return (
        <>
          <TabContext value={value || "1"}>
            <Grid container>
              <Grid item xs={12}>
                <Box sx={{ paddingLeft: 3, marginTop: 3 }}>
                  <h2> TLoans </h2>
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
                      getRowId={(row) => row.TLoanNumber}
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
                        navigate(`/tloanManagerDisplay/${params.id}`);
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div style={{ height: 600, width: "100%" }}>
                    <DataGrid
                      sx={{ background: "white", fontSize: 18 }}
                      rows={extensionsTable}
                      columns={columns}
                      getRowId={(row) => row.TLoanNumber}
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
              </Grid>
            </Grid>
          </TabContext>
        </>
      );
    }
    case "Sales Admin": {
      return (
        <>
          <TabContext value={value || "1"}>
            <Grid container>
              <Grid item xs={11}>
                <Box sx={{ paddingLeft: 3, marginTop: 3 }}>
                  <h2> TLoans </h2>
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
              </Grid>
              <Grid item xs={1}>
                <Box sx={{ paddingLeft: 10, marginTop: 8 }}>
                  <React.StrictMode>
                    <ThemeProvider theme={theme}>
                      <Fab
                        aria-label="add"
                        onClick={() => navigate("/newtloan")}
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
                  <div style={{ height: 600, width: "100%" }}>
                    <DataGrid
                      sx={{ background: "white", fontSize: 18 }}
                      rows={currentTable}
                      columns={columns}
                      getRowId={(row) => row.TLoanNumber}
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
                      getRowId={(row) => row.TLoanNumber}
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
                      getRowId={(row) => row.TLoanNumber}
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
                      getRowId={(row) => row.TLoanNumber}
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
        </>
      );
    }
    case "Warehouse Worker": {
      return (
        <>
          <TabContext value={value || "1"}>
            <Grid container>
              <Grid item xs={12}>
                <Box sx={{ paddingLeft: 3, marginTop: 3 }}>
                  <h2> TLoans </h2>
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
                      getRowId={(row) => row.TLoanNumber}
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
        </>
      );
    }
    case "Admin": {
      return (
        <>
          <TabContext value={value || "1"}>
            <Grid container>
              <Grid item xs={11}>
                <Box sx={{ paddingLeft: 3, marginTop: 3 }}>
                  <h2> TLoans </h2>
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
              </Grid>
              <Grid item xs={1}>
                <Box sx={{ paddingLeft: 10, marginTop: 7.8 }}>
                  <React.StrictMode>
                    <ThemeProvider theme={theme}>
                      <Fab
                        aria-label="add"
                        onClick={() => navigate("/newtloan")}
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
                  <div style={{ height: 600, width: "100%" }}>
                    <DataGrid
                      sx={{ background: "white", fontSize: 18 }}
                      rows={currentTable}
                      columns={columns}
                      getRowId={(row) => row.TLoanNumber}
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
                      getRowId={(row) => row.TLoanNumber}
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
                      getRowId={(row) => row.TLoanNumber}
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
                      getRowId={(row) => row.TLoanNumber}
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
        </>
      );
    }
    default: {
      return (
        <>
          <TabContext value={value || "1"}>
            <Grid container>
              <Grid item xs={11}>
                <Box sx={{ paddingLeft: 3, marginTop: 3 }}>
                  <h2> TLoans </h2>
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
              </Grid>
              <Grid item xs={1}>
                <Box sx={{ paddingLeft: 10, marginTop: 8 }}>
                  <React.StrictMode>
                    <ThemeProvider theme={theme}>
                      <Fab
                        aria-label="add"
                        onClick={() => navigate("/newtloan")}
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
                  <div style={{ height: 600, width: "100%" }}>
                    <DataGrid
                      sx={{ background: "white", fontSize: 18 }}
                      rows={currentTable}
                      columns={columns}
                      getRowId={(row) => row.TLoanNumber}
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
                      getRowId={(row) => row.TLoanNumber}
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
                      getRowId={(row) => row.TLoanNumber}
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
                      getRowId={(row) => row.TLoanNumber}
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
        </>
      );
    }
  }
};

export default TLoanTabs2;
