import React from "react";
import { TableHead, TableCell, TableRow } from "@mui/material";

interface TableHeaderProps {
  headers: string[];
}
const TableHeader = ({ headers }: TableHeaderProps) => {
  return (
    <TableHead>
      <TableRow>
        {headers.map((header, key) => (
          <TableCell
            key={key}
            sx={{ color: "#86898E", fontWeight: 500 }}
            className="tableheader"
          >
            {header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
