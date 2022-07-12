import React from "react";
import axios from "axios";
import "../../styles/Table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableField = ({ data, column }) => {
  return (
    <table>
      <thead>
        <tr>
          {column.map((item, index) => (
            <TableHeadItem item={item} />
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <TableRows item={item} column={column} />
        ))}
      </tbody>
    </table>
  );
};

const TableHeadItem = ({ item }) => <th>{item.heading}</th>;
const TableRows = ({ item, column }) => (
  <tr>
    {column.map((columnItem, index) => {
      if (columnItem.value.includes(".")) {
        const itemSplit = columnItem.value.split(".");
        return <td>{item[itemSplit[0]][itemSplit[1]]}</td>;
      }

      return <td>{item[`${columnItem.value}`]}</td>;
    })}
  </tr>
);

export default TableField;
