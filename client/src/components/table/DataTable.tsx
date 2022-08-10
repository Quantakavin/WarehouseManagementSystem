import React from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface CardTableProps {
  headers: GridColDef[];
  data: any;
}

const DataTable = ({ headers, data }: CardTableProps) => {
  return (
    <TableContainer component={Paper}>
      <DataGrid
        rows={data}
        columns={headers}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableColumnMenu
        disableSelectionOnClick
        sx={{ minWidth: 400, backgroundColor: "#E3E8EE", height: "370px" }}
      />
    </TableContainer>
  );
};

export default DataTable;
