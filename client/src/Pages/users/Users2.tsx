import React, { useEffect, useState } from "react";
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
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Theme,
  Typography,
  unstable_createMuiStrictModeTheme,
  withStyles,
  IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router";

const Users2: React.FC = () => {
  const navigate = useNavigate();
  const [row, setRow] = useState([]);
  const theme = unstable_createMuiStrictModeTheme();
  const [pageSize, setPageSize] = React.useState(25);
  const [inputName, setInputName] = useState<string>(null);
  const [value, setValue] = useState(0); // first tab
  const [hoveredRow, setHoveredRow] = React.useState(null);

  const onMouseEnterRow = (event) => {
    const id = Number(event.currentTarget.getAttribute("data-id"));
    setHoveredRow(id);
  };

  const onMouseLeaveRow = (event) => {
    setHoveredRow(null);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/users?limit=100000&page=0`)
      .then((data) => data.json())
      .then((data) => setRow(data));
  }, []);

  const headers = [
    "ID",
    "Item Name",
    "Batch Number",
    "Brand",
    "Avalible Quantity",
    "Action",
  ];

  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [
      {
        columnField: "Company Name",
        operatorValue: "=",
        value: "SERVO_LIVE",
      },
    ],
  });

  const columns = [
    { field: "UserID", headerName: "ID", flex: 2 },
    { field: "Username", headerName: "Username", flex: 5 },
    { field: "Email", headerName: "Email Address", flex: 7 },
    { field: "CompanyName", headerName: "Company", flex: 7 },
    { field: "UserGroupName", headerName: "User Group", flex: 5 },
    { field: "MobileNo", headerName: "Phone Number", flex: 5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 3,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        if (hoveredRow === params.id) {
          return (
            <Box
              sx={{
                backgroundColor: "whitesmoke",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton onClick={() => navigate(`/user/${params.id}`)}>
                <VisibilityIcon />
              </IconButton>
              <IconButton onClick={() => navigate(`/edituser/${params.id}`)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => navigate(`/dashboard`)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          );
        } else return null;
      },
    },
  ];

  function CustomToolbar() {
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
  }

  return (
    <>
      <Box sx={{ padding: 3, paddingBottom: 0, height: "100%", width: "100%" }}>
        <Box sx={{ display: "flex", height: "100%" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ color: "#063970", fontWeight: "bold" }}>
              <h2>Users</h2>
            </Typography>
            <DataGrid
              sx={{ background: "white", fontSize: 18 }}
              rows={row}
              columns={columns}
              getRowId={(row) => row.UserID}
              pageSize={pageSize}
              onPageSizeChange={(newPage) => setPageSize(newPage)}
              pagination
              headerHeight={50}
              // rowHeight={70}
              // getRowHeight={() => "auto"}
              components={{
                Toolbar: CustomToolbar,
                NoRowsOverlay: () => (
                  <Stack
                    height="100%"
                    alignItems="center"
                    justifyContent="center"
                  >
                    No Users
                  </Stack>
                ),
              }}
              componentsProps={{
                row: {
                  onMouseEnter: onMouseEnterRow,
                  onMouseLeave: onMouseLeaveRow,
                },
              }}
              filterModel={filterModel}
              onFilterModelChange={(newFilterModel) =>
                setFilterModel(newFilterModel)
              }
              // onRowClick={(params: GridRowParams) => {
              //   navigate(`/user/${params.id}`);
              // }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Users2;
