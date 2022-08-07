import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { GetAllProducts } from "../../api/ProductDB";

export default function BasicTable() {
  function createData(
    ItemNumber: string,
    ItemName: string,
    BatchNumber: number,
    Brand: number,
    AvailableQuantity: number,
    Action: string
  ) {
    return {
      ItemNumber,
      ItemName,
      BatchNumber,
      Brand,
      AvailableQuantity,
      Action,
    };
  }

  function createList() {
    const rows = [];

    GetAllProducts().then((data) => {
      for (let i = 0; i < data.length; i++) {
        rows.push(
          createData(
            data[i].ItemNo,
            data[i].ItemName,
            data[i].BatchNo,
            data[i].Brand,
            data[i].Quantity,
            ":"
          )
        );
      }
    });
    return rows;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1050 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" hidden>
              Item Number
            </TableCell>
            <TableCell align="center">Item Name</TableCell>
            <TableCell align="center">Batch Number</TableCell>
            <TableCell align="center">Brand</TableCell>
            <TableCell align="center">Available Quantity</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {createList().map((row) => (
            <TableRow
              key={row.ItemName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center" hidden>
                {row.ItemNumber}
              </TableCell>
              <TableCell align="center">{row.ItemName}</TableCell>
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
