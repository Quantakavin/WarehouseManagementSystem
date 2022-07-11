import { TableCell, TableRow, TableBody } from "@mui/material";
import { AxiosResponse } from "axios";
import React from "react";
import { ActionMenuItem } from "../../utils/CommonTypes";
import ActionMenu from "./ActionMenu";

interface TableContentProps {
  menu: (id?: string) => ActionMenuItem[];
  pages: {
    response: AxiosResponse<any, any>;
    nextPage: number;
    totalPages: number;
  }[];
}

const TableNew = ({ pages, menu }: TableContentProps) => {
  return (
    <TableBody>
      {pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.response.data.map((row) => (
            <TableRow
              key={String(Object.values(row)[0])}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <>
                {Object.entries(row).map(([key, value]) => {
                  if (key === "full_count") {
                    return null;
                  }
                  return (
                    <TableCell key={key} sx={{ color: "#0A2540" }} align="left">
                      {String(value)}
                    </TableCell>
                  );
                })}
                <ActionMenu items={menu(String(Object.values(row)[0]))} />
              </>
            </TableRow>
          ))}
        </React.Fragment>
      ))}
    </TableBody>
  );
};

export default TableNew;
