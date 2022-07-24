import {
  Box,
  Stack,
  Typography,
  unstable_createMuiStrictModeTheme,
} from "@mui/material";
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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Products2: React.FC = () => {
  const [row, setRow] = useState([]);
  const navigate = useNavigate();
  const theme = unstable_createMuiStrictModeTheme();
  const [pageSize, setPageSize] = React.useState(25);
  const [inputName, setInputName] = useState<string>(null);
  const [value, setValue] = useState(0); // first tab

  useEffect(() => {
    fetch(`http://localhost:5000/api/products?limit=100000&page=0`)
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
    { field: "BinTag2", headerName: "Bin Tag", width: 200 },
    { field: "Brand", headerName: "Brand", width: 250 },
    { field: "ItemNo", headerName: "Item Code", width: 560 },
    { field: "ItemName", headerName: "Item Name", width: 950 },
    { field: "BatchNo", headerName: "Batch Number", width: 300 },
    { field: "BatchInDate", headerName: "Batch In Date", width: 250 },
    { field: "WarehouseCode", headerName: "Warehouse Code", width: 200 },
    {
      field: "Quantity",
      headerName: "Available Quantity",
      type: "number",
      width: 200,
    },
  ];

  function CustomToolbar() {
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
