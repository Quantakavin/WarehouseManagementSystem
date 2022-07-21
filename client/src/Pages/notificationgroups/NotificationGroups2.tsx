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
  Card,
  CardContent,
  Stack,
  Theme,
  Typography,
  unstable_createMuiStrictModeTheme,
  withStyles,
  IconButton,
  Fab
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import { useNavigate } from "react-router";

const NotificationGroups2: React.FC = () => {
  const [row, setRow] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/notificationgroups`, { 
      headers: new Headers({
          'Authorization': `Bearer ${localStorage.getItem("token")}`
      }), 
  })
      .then((data) => data.json())
      .then((data) => setRow(data));
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

  const columns = [
    { field: "NotiGroupID", headerName: "ID", flex: 2 },
    { field: "NotiGroupName", headerName: "Name", flex: 38 },
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
              <IconButton onClick={() => navigate(`/notificationgroup/${params.id}`)}>
                <VisibilityIcon />
              </IconButton>
              <IconButton onClick={() => navigate(`/editnotificationgroup/${params.id}`)}>
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

  const navigate = useNavigate();
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

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{display: "flex", flexWrap: "wrap", maxWidth: 380, p: 1}}>
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
    <Box sx={{ padding: 3, paddingBottom: 0, height: "100%", width: "100%" }}>
    <Box sx={{ display: "flex", height: "100%" }}>
      <Box sx={{ flexGrow: 1 }}>
      <Box
            component="span"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={{ color: "#063970", fontWeight: "bold" }}>
              <Box>
                <h1>Notification Groups</h1>
              </Box>
            </Typography>
            <Box>
              <Fab
                variant="extended"
                aria-label="add"
                onClick={() => navigate("/addnotificationgroup")}
                style={{ marginBottom: 10 }}
                sx={{
                  color: "white",
                  backgroundColor: "#063970",
                  ":hover": { backgroundColor: "#031c38" },
                }}
              >
                Create
                <NotificationAddIcon sx={{ ml: 2 }} />
              </Fab>
            </Box>
          </Box>
        <DataGrid
          sx={{ background: "white", fontSize: 18 }}
          rows={row}
          columns={columns}
          getRowId={(row) => row.NotiGroupID}
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
                No Notification Groups
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
          onRowClick={(params: GridRowParams) => {
            navigate(`/notificationgroup/${params.id}`);
          }}
        />
      </Box>
    </Box>
  </Box>
  );
};
export default NotificationGroups2;
