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
} from "@mui/material";
import { useNavigate } from "react-router";

const Products2: React.FC = () => {
  const [row, setRow] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products?limit=100000&page=0`)
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
    { field: "BinProductPK", headerName: "ID", flex: 2 },
    { field: "ItemName", headerName: "Item Name", flex: 30 },
    { field: "BatchNo", headerName: "Batch Number", flex: 10 },
    { field: "Brand", headerName: "Brand", flex: 10 },
    {
      field: "Quantity",
      headerName: "Available Quantity",
      type: "number",
      flex: 8,
    },
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

  return (
    <Box sx={{ padding: 3, paddingBottom: 0, height: "100%", width: "100%" }}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ color: "#063970", fontWeight: "bold" }}>
            <h2>Products</h2>
          </Typography>
          <DataGrid
            sx={{ background: "white", fontSize: 18 }}
            rows={row}
            columns={columns}
            getRowId={(row) => row.BinProductPK}
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
                  No Products
                </Stack>
              ),
            }}
            filterModel={filterModel}
            onFilterModelChange={(newFilterModel) =>
              setFilterModel(newFilterModel)
            }
            onRowClick={(params: GridRowParams) => {
              navigate(`/product/${params.id}`);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Products2;
