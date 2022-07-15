import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface CardTableProps {
    headers: string[];
    data: any;
}

const CardTable = ({headers, data}: CardTableProps) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, backgroundColor: "#E3E8EE" }} aria-label="simple table">
        <TableHead>
          <TableRow>
           {headers.map((header, key) => (
                <TableCell key={key}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
           <TableRow
           key={String(Object.values(row)[0])}
           sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
         >
           <>
             {Object.entries(row).map(([key, value]) => {
               return (
                 <TableCell key={key} sx={{ maxWidth: "50px", color: "#0A2540", overflow: "hidden", textOverflow: "ellipsis" }} align="left">
                   {String(value)}
                 </TableCell>
               );
             })}
           </>
         </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CardTable;