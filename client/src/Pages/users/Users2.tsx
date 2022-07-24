import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Fab,
  Stack,
  Typography,
  unstable_createMuiStrictModeTheme,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridFilterModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../app/hooks";
import { selectRole } from "../../app/reducers/CurrentUserSlice";

const Users2: React.FC = () => {
  const navigate = useNavigate();
  const userrole = useAppSelector(selectRole);
  useEffect(() => {
    if (userrole !== "Admin") {
      navigate("/403");
    }
  }, []);
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
    fetch("http://localhost:5000/api/users?limit=100000&page=0", {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
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
    { field: "UserID", headerName: "ID", flex: 3 },
    { field: "Username", headerName: "Username", flex: 10 },
    { field: "Email", headerName: "Email Address", flex: 12 },
    { field: "CompanyName", headerName: "Company", flex: 12 },
    { field: "UserGroupName", headerName: "User Group", flex: 10 },
    { field: "MobileNo", headerName: "Phone Number", flex: 10 },
    {
      field: "actions",
      type: "actions",
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          label="View"
          onClick={() => navigate(`/user/${params.id}`)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => navigate(`/edituser/${params.id}`)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => navigate(`/dashboard`)}
          showInMenu
        />,
      ],
    },
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
                <h1>Users</h1>
              </Box>
            </Typography>
            <Box>
              <Fab
                variant="extended"
                aria-label="add"
                onClick={() => navigate("/adduser")}
                style={{ marginBottom: 10 }}
                sx={{
                  color: "white",
                  backgroundColor: "#063970",
                  ":hover": { backgroundColor: "#031c38" },
                }}
              >
                Create
                <PersonAddAlt1Icon sx={{ ml: 2 }} />
              </Fab>
            </Box>
          </Box>

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
  );
};
export default Users2;
