import React, { useEffect, useState } from "react";
import { DataGrid, GridRowParams, GridToolbar } from "@mui/x-data-grid";
import {
  Card,
  CardContent,
  Stack,
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
    { field: "BinProductPK", headerName: "ID", minWidth: 100 },
    { field: "ItemName", headerName: "Item Name", minWidth: 800 },
    { field: "BatchNo", headerName: "Batch Number", minWidth: 250 },
    { field: "Brand", headerName: "Brand", minWidth: 400 },
    { field: "Quantity", headerName: "Available Quantity", minWidth: 250 },
  ];

  const navigate = useNavigate();
  const theme = unstable_createMuiStrictModeTheme();
  const [pageSize, setPageSize] = React.useState(25);
  const [inputName, setInputName] = useState<string>(null);

  const [value, setValue] = useState(0); // first tab

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };



  return (
    <Card sx={{}} >
      <CardContent>
        <div>
          <h2> Products </h2>
        </div>
        <div style={{ height: 1000, width: "100%" }}>
          <DataGrid
            sx={{ background: "white", fontSize: 18 }}
            rows={row}
            columns={columns}
            getRowId={(row) => row.BinProductPK}
            pageSize={pageSize}
            onPageSizeChange={(newPage) => setPageSize(newPage)}
            pagination
            headerHeight={30}
            // rowHeight={70}
            getRowHeight={()=>'auto'}
            components={{
              Toolbar: GridToolbar,
              NoRowsOverlay: () => (
                <Stack
                  height="100%"
                  alignItems="center"
                  justifyContent="center"
                >
                  No accepted RMA requests
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
        </div>
      </CardContent>
    </Card>
  );
};
export default Products2;
