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
  Card,
  CardContent,
  Stack,
  Theme,
  unstable_createMuiStrictModeTheme,
  withStyles,
} from "@mui/material";
import { useNavigate } from "react-router";

const NotificationGroups2: React.FC = () => {
  const [row, setRow] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/notificationgroups`)
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
    { field: "NotiGroupID", headerName: "ID", minWidth: 100 },
    { field: "NotiGroupName", headerName: "Name", minWidth: 1800 },
  ];

  const navigate = useNavigate();
  const theme = unstable_createMuiStrictModeTheme();
  const [pageSize, setPageSize] = React.useState(25);
  const [inputName, setInputName] = useState<string>(null);

  const [value, setValue] = useState(0); // first tab

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton sx={{ color: "#0A2540" }} />
        <GridToolbarFilterButton sx={{ color: "#0A2540" }} />
        <GridToolbarDensitySelector sx={{ color: "#0A2540" }} />
        <GridToolbarExport sx={{ color: "#0A2540" }} />
        <GridToolbarQuickFilter
          sx={{
            color: "#0A2540",
            marginLeft: 205,
            marginTop: -4,
            marginBottom: 3,
          }}
          debounceMs={1000}
        />
      </GridToolbarContainer>
    );
  }

  return (
    <>
    <Card
      sx={{
        width: 1950,
        height: 1100,
        marginTop: 5,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <CardContent>
        <div>
          <h2> User Groups </h2>
        </div>
        <div style={{ height: 1000, width: "100%" }}>
          <DataGrid
            sx={{ background: "white", fontSize: 18 }}
            rows={row}
            columns={columns}
            getRowId={(row) => row.NotiGroupID}
            pageSize={pageSize}
            onPageSizeChange={(newPage) => setPageSize(newPage)}
            pagination
            headerHeight={50}
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
            filterModel={filterModel}
            onFilterModelChange={(newFilterModel) =>
              setFilterModel(newFilterModel)
            }
            onRowClick={(params: GridRowParams) => {
              navigate(`/notificationgroup/${params.id}`);
            }}
          />
        </div>
      </CardContent>
    </Card>
    </>
  );
};
export default NotificationGroups2;
