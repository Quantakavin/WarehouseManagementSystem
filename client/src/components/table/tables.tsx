import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function createData(
  ItemName: string,
  BatchNumber: number,
  Brand: number,
  AvailableQuantity: number,
  Action: number,
) {
  return { ItemName, BatchNumber, Brand, AvailableQuantity, Action };
}

//ROWS
const rows = [
  createData('Test', 159, 6.0, 24, 4.0),
  createData('Test', 237, 9.0, 37, 4.3),
  createData('Test', 262, 16.0, 24, 6.0),
  createData('Test', 305, 3.7, 67, 4.3),
  createData('Test', 356, 16.0, 49, 3.9),
  createData('Test', 356, 16.0, 49, 3.9),
  createData('Test', 356, 16.0, 49, 3.9),
  createData('Test', 356, 16.0, 49, 3.9),
  createData('Test', 356, 16.0, 49, 3.9),
  createData('Test', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  return (
  
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1050 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item Name</TableCell>
            <TableCell align="center">Batch Number</TableCell>
            <TableCell align="center">Brand</TableCell>
            <TableCell align="center">Available Quantity</TableCell>
            <TableCell align="center">Action</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.ItemName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ItemName}
              </TableCell>
              <TableCell align="center">{row.BatchNumber}</TableCell>
              <TableCell align="center">{row.Brand}</TableCell>
              <TableCell align="center">{row.AvailableQuantity}</TableCell>
              <TableCell align="center">{row.Action}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
