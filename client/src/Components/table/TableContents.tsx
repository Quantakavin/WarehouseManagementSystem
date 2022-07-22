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

const TableContents = ({ pages, menu }: TableContentProps) => {
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
                    <TableCell
                      key={key}
                      sx={{
                        maxWidth: "50px",
                        color: "#0A2540",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      align="left"
                    >
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

export default TableContents;
