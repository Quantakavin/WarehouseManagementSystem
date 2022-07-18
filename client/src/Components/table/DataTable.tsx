import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

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
}

export default DataTable;