import { TabContext, TabPanel } from "@mui/lab";
import {
  Box,
  Grid,
  LinearProgress,
  Stack,
  styled,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
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
import config from "../../config/config";
import { EditableContext } from "../context/IsEditableContext";
import axios from "axios";
import { useAppDispatch } from "../../app/hooks";
import { ChangeTab } from "../../app/reducers/SidebarSlice";

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
const TLoanTabs: React.FC = () => {
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
  const [tableLoading, setTableLoading] = useState(false);
  const context: any = useContext(EditableContext);
  const { isEditable } = context;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ChangeTab({ currenttab: "T-Loan" }));
  });
  useEffect(() => {
    setTableLoading(true);
    setTimeout(() => {
      const fetchCurrentData = async () => {
        // get the data from the api
        await axios
          .get(`${config.baseURL}/tloan/current/${userid}`)
          .then((currentTloanData) => setCurrentTable(currentTloanData.data));
        // setRma(Object.e)
      };
      const fetchPendingData = async () => {
        // get the data from the api
        await axios
          .get(`${config.baseURL}/tloan/pending/${userid}`)
          .then((pendingTloanData) => setPendingTable(pendingTloanData.data));
        // setRma(Object.e)
      };
      const fetchDraftData = async () => {
        // get the data from the api
        await axios
          .get(`${config.baseURL}/tloan/drafts/${userid}`)
          .then((draftData) => setDraftTable(draftData.data));
        // setRma(Object.e)
      };
      const fetchHistoryData = async () => {
        // get the data from the api
        await axios
          .get(`${config.baseURL}/tloan/history/${userid}`)
          .then((historyData) => setHistoryTable(historyData.data));
        // setRma(Object.e)
      };
      const fetchManagerData = async () => {
        // get the data from the api
        await axios
          .get(`${config.baseURL}/tloan/ManagerLoan`)
          .then((pendingTloanData) => setManagerLoan(pendingTloanData.data));
        // setRma(Object.e)
      };
      const fetchManagerExData = async () => {
        // get the data from the api
        await axios
          .get(`${config.baseURL}/tloan/ManagerExtension`)
          .then((draftData) => setExtensionTable(draftData.data));
        // setRma(Object.e)
      };
      const fetchApprovedData = async () => {
        // get the data from the api
        await axios
          .get(`${config.baseURL}/tloan/approvedLoans`)
          .then((approvedData) => setApprovedTable(approvedData.data));
        // setRma(Object.e)
      };
      const fetchAllCurrent = async () => {
        // get the data from the api
        await axios
          .get(`${config.baseURL}/tloan/allCurrent`)
          .then((allCurrentData) => setAllCurrent(allCurrentData.data));
        // setRma(Object.e)
      };
      const fetchAllHistory = async () => {
        // get the data from the api
        await axios
          .get(`${config.baseURL}/tloan/allHistory`)
          .then((allDraftsData) => setAllHistory(allDraftsData.data));
        // setRma(Object.e)
      };
      fetchCurrentData();
      fetchPendingData();
      fetchDraftData();
      fetchHistoryData();
      fetchManagerData();
      fetchManagerExData();
      fetchApprovedData();
      fetchAllCurrent();
      fetchAllHistory();
      setTableLoading(false);
    }, 500);
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
        <Box sx={{ mt: 1 }}>No T-Loan Requests Found</Box>
      </StyledGridOverlay>
    );
  }

  const navigate = useNavigate();
  const [pageSize, setPageSize] = React.useState(25);

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
                  {isEditable ? null : (
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
                  )}
                </Box>
              </Box>
              <Box sx={{ paddingLeft: 3 }} />
            </Grid>
            <Grid item xs={12}>
              <TabPanel value="1">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={currentTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
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
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={pendingTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
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
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={draftTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
                    pageSize={12}
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
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="4">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={historyTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
                    pageSize={12}
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
                  {isEditable ? null : (
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
                  )}
                </Box>
              </Box>
              <Box sx={{ paddingLeft: 3 }} />
            </Grid>
            <Grid item xs={12}>
              <TabPanel value="1">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={currentTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
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
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={pendingTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
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
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={draftTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
                    pageSize={12}
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
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="4">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={historyTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
                    pageSize={12}
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
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={managerLoan}
                    columns={managerColumns}
                    getRowId={(row) => row.TLoanID}
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
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={extensionsTable}
                    columns={managerColumns}
                    getRowId={(row) => row.TLoanID}
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
                  {isEditable ? null : (
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
                  )}
                </Box>
              </Box>
              <Box sx={{ paddingLeft: 3 }} />
            </Grid>
            <Grid item xs={12}>
              <TabPanel value="1">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={currentTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
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
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={pendingTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
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
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={draftTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
                    pageSize={12}
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
                      navigate(`/tloanDetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="4">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={historyTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
                    pageSize={12}
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
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={approvedTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
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
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={allCurrent}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
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
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>

              <TabPanel value="2">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={allHistory}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
                    pageSize={12}
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
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={currentTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
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
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={pendingTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
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
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={draftTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
                    pageSize={12}
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
                      navigate(`/tloandetails/${params.id}`);
                    }}
                  />
                </div>
              </TabPanel>
              <TabPanel value="4">
                <div style={{ height: 600, width: "100%" }}>
                  <DataGrid
                    loading={tableLoading}
                    sx={{ background: "white", fontSize: 18 }}
                    rows={historyTable}
                    columns={columns}
                    getRowId={(row) => row.TLoanID}
                    pageSize={12}
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

export default TLoanTabs;
